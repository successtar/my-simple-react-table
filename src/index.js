// import React, { useState } from "react";
// import { Row, Col, Table, Pagination } from "react-bootstrap";

/* Generate Column structure from data if not passed */ 
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

const SimpleTable = ({data, columns, rowPerPage}) => {

  const tableData = Array.isArray(data) ? data : [];

  /* Set React Component State */
  const [table, setTable] = useState({
    pg: 1,
    col: Array.isArray(columns) ? columns : getCol(tableData)

  });
  
  /* default number of rows in a page is 10 if not passed */
  rowPerPage = rowPerPage > 0 ? Math.round(Number(rowPerPage)) : 10; 

  /* Generate Columns Titles */
  let colTitle = [];
  table.col.forEach(({title}, i) => {
      colTitle.push( <th key={`th-${i}`} className="border-top-0">{title}</th>)
  })


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
                          table.col.forEach(({key, format}, j) => {
                              /* Table Columns */
                              if (format){
                                  row.push(<td key={`td-${i}${j}`}>{format(tableData[i])}</td>);
                              }
                              else if (typeof(tableData[i][key]) != "object"){
                                  row.push( <td key={`td-${i}${j}`}>{tableData[i][key]}</td>);
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

  items.push(
      <Pagination.Item
          key="pg-0"
          style={{ marginRight: "0.5rem"}}
          onClick={() =>
          setTable({ ...table, pg: table.pg === 1 ? 1 : table.pg - 1 })
          }
      >
        &lt;
      </Pagination.Item>
  );
  
  /* pagination Links and spacing */
  for (let j = 1; j <= maxPage; j++) {

    if (j === table.pg || j === 1 || j === maxPage || (j >= table.pg - 3 && j <= table.pg + 3)){
      items.push(
          <Pagination.Item
          key={`pg-${j}`}
          active={j === table.pg}
          onClick={() => setTable({ ...table, pg: j })}
          style={{ marginRight: "0.5rem"}}
          >
          {j}
          </Pagination.Item>
      );
    }
    else if (j < table.pg -3 && addSpaceBefore){
      items.push(
        <Pagination.Item
        disabled="disabled"
        key={`pg-${j}`}
        style={{ marginRight: "0.5rem"}}
        >
        ...
        </Pagination.Item>  
      );
      addSpaceBefore = false;
    }
    else if (j > table.pg + 3 && addSpaceAfter){
      items.push(
        <Pagination.Item
        disabled="disabled"
        key={`pg-${j}`}
        style={{ marginRight: "0.5rem"}}
        >
        ...
        </Pagination.Item>
      );
      addSpaceAfter = false;
    }
  }

  items.push(
      <Pagination.Item
          key={`pg-${maxPage + 1}`}
          onClick={() =>
          setTable({ ...table, pg: maxPage > table.pg ? table.pg + 1 : table.pg })
          }
      >
          &gt;
      </Pagination.Item>
  );

  return <>
      <Table responsive className="custom-table">
        <thead className="text-muted">
          <tr>
              {colTitle}
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td className="text-center p-4" colspan="9">
                No Record Found
              </td>
            </tr>
          ) : (
            records
          )}
        </tbody>
      </Table>

      <Row className="px-3">
        <Col sm="8">
          <Pagination size="sm">{items}</Pagination>
        </Col>
        <Col className="text-right">
          Showing {showing} of {total}
        </Col>
      </Row>
  </>

}

export default SimpleTable;