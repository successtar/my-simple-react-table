import React, { useState, useEffect, createRef, useRef } from "react";
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types'


/**
 * Generate Column structure from data if not passed 
 * @param {*} data table data
 */
const getCol = data => {
  let firstObj = data.length > 0 ? data[0] : {};
  let columns = []
  for (let key in firstObj) {
      if (firstObj.hasOwnProperty(key) && typeof(firstObj[key]) != "object") {
          columns.push({key, title: key.replace( /([A-Z])/g, " $1" ).replace(/_/g, " ").toUpperCase()})
      }
  }
  return columns
}

/**
 * Table data search
 * @param query search input
 * @param col Columns
 * @param data Table data
 */
const queryCheck = (query, col, data) => {
    if (!query){
        return data
    }
     
    let colVal;
    const queryRegex = new RegExp(query,"i");
    
    return data.filter(row => {
        for (let val of col){
            colVal = val.format ? ReactDOMServer.renderToStaticMarkup(val.format(row))?.replace(/<[^>]*>?/gm, '') : row[val.key]?.toString();
            if (colVal?.match(queryRegex)){
                return true
            }
        }

        return false;
    });
}

const SimpleTable = ({data, columns, rowPerPage, searchBox}) => {

  /* Set React Component State */
  const [table, setTable] = useState({
    pg: 1,
    query: ""

  });

    const tableRef = createRef();
    const tableCol = columns ?? getCol(data);
    const tableData = queryCheck(table.query, tableCol, [...data]);

    let firstRun = useRef({status: true, pg: table.pg});

    /* Auto scroll to top on new page */
    useEffect(() => {
        if (firstRun.current.status){
            firstRun.current.status = !firstRun.current.status;
        }
        else if (firstRun.current.pg !== table.pg){
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
            firstRun.current.pg = table.pg
        }
    }, [table.pg, tableRef])


    /* Generate Columns Titles */
    let colTitle = [];
    tableCol.forEach(({title}, i) => {
        colTitle.push( <th key={`th-${i}`} className="border-top-0">{title}</th>)
    });


  let records = [];
  let start = 0;
  let total = 0;
  let showing = 0;
  

  /* Generate Rows */
  start = (table.pg - 1) * rowPerPage;
  total = tableData.length;
  let max = start + rowPerPage;

  for (let i = start; i < total && i < max; i++) {
  
      records[i] = (function() {
                          let row = []
                          tableCol.forEach(({key, format}, j) => {
                              /* Table Columns */
                              if (format && typeof(format) === "function"){
                                  tableData[i]['_index'] = i;
                                  row.push(<td key={`td-${i}${j}`} style={{verticalAlign: "middle"}}>{format(tableData[i])}</td>);
                              }
                              else if (typeof(tableData[i][key]) != "object"){
                                  row.push( <td key={`td-${i}${j}`} style={{verticalAlign: "middle"}}>{tableData[i][key]}</td>);
                              }
                          })

                      return <tr key={`tr-${i}`}>{row}</tr>
                  })();
          
      showing = i + 1;
  }

  /* Pagination */
  let items = [];
  let addSpaceBefore = true
  let addSpaceAfter = true
  let maxPage = tableData.length > 0 ? Math.ceil(tableData.length / rowPerPage) : 1;

  /* Prevent Showing non existing page */
  if (table.pg > maxPage){
      setTable({...table, pg: maxPage});
  }

  const goToPage = pgNumb => e => {
      e.preventDefault();
      setTable({ ...table, pg: pgNumb });
  }

  items.push(
        <li 
            className="page-item" 
            key="pg-0"
            style={{ marginRight: "0.5rem"}}
        >
            <span 
                className="page-link" 
                style={{cursor: "pointer"}}
                onClick={goToPage(table.pg === 1 ? 1 : table.pg - 1)} 
            >
                &lt; 
            </span>
        </li>
  );
  
  /* pagination Links and spacing */
  for (let j = 1; j <= maxPage; j++) {

    if (j === table.pg ){
        items.push(
            <li 
                className="page-item active" 
                key={`pg-${j}`} 
                style={{ marginRight: "0.5rem"}}
            >
                <span
                    className="page-link"
                >
                    {j}    
                </span>
            </li>
        );
    }
    else if (j === 1 || j === maxPage || (j >= table.pg - 3 && j <= table.pg + 3)){
        items.push(
            <li 
                className="page-item" 
                key={`pg-${j}`} 
                style={{ marginRight: "0.5rem"}}
            >
                <span 
                    className="page-link" 
                    style={{cursor: "pointer"}}
                    onClick={goToPage(j)} 
                >
                    {j}    
                </span>
            </li>
        );
    }
    else if (j < table.pg -3 && addSpaceBefore){
        items.push(
            <li 
                className="page-item disabled" 
                key={`pg-${j}`} 
                style={{ marginRight: "0.5rem"}}
            >
                <span
                    className="page-link disabled"
                >
                    ...    
                </span>
            </li>
        );
        addSpaceBefore = false;
    }
    else if (j > table.pg + 3 && addSpaceAfter){
      items.push(
        <li 
            className="page-item disabled" 
            key={`pg-${j}`} 
            style={{ marginRight: "0.5rem"}}
        >
            <span
                className="page-link disabled"
            >
                ...    
            </span>
        </li>
      );
      addSpaceAfter = false;
    }
  }

  items.push(
        <li 
            className="page-item" 
            key={`pg-${maxPage + 1}`}
            style={{ marginRight: "0.5rem"}}
        >
            <span 
                className="page-link" 
                style={{cursor: "pointer"}}
                onClick={goToPage(maxPage > table.pg ? table.pg + 1 : table.pg)} 
            >
                &gt;
            </span>
        </li>
  );

  return <div className="simple-react-table">
            <div className="table-responsive py-5" ref ={tableRef}>
                {
                    searchBox ? 
                        <div>
                            <input
                                type="search"
                                placeholder="Search"
                                className="form-control" 
                                style={{maxWidth:"220px", float: "right", marginBottom: "0.5rem"}}
                                onInput={e => setTable({...table, query: e.currentTarget.value?.trim()})}
                            />
                        </div>
                    :
                        ""
                }
                <table className="table">
                    <thead className="text-muted">
                    <tr>
                        {colTitle}
                    </tr>
                    </thead>
                    <tbody>
                    {records.length === 0 ? (
                        <tr>
                            <td className="text-center p-4" colSpan="9">
                                No {table.query === "" ? "Record" : "Match"} Found
                            </td>
                        </tr>
                    ) : (
                        records
                    )}
                    </tbody>
                </table>
            </div>

            <div className="px-3 row">
                <div className="col-sm-8">
                    <ul className="pagination pagination-sm">{items}</ul>
                </div>
                <div className="text-right col">
                    Showing {showing} of {total} {data && data.length > total ? `(filtered from ${data.length} total)` : "" }
                </div>
            </div>
        </div>

}


SimpleTable.defaultProps = {
    data: [],
    rowPerPage: 10,
    searchBox: true
};

SimpleTable.propTypes = {
    data: PropTypes.array,
    rowPerPage: PropTypes.number,
    columns: PropTypes.array,
    searchBox: PropTypes.bool
}

export default SimpleTable;