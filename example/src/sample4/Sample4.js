import React from "react";
import SimpleTable from "../simple-react-table"
import {testData} from '../testData';
import "../simple-react-table.scss"

const Sample4 = _ => {

  const formatDate = date => {
    const event = new Date(date);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
    return date ? event.toLocaleDateString('en-US', options) : "None";  
  }

  return (
    <div className="App">
        <h2>
          4. Simple React Table With Column Specification, Data Format, and No Search Box
          <small>
            <a href="https://github.com/successtar/simple-react-table/blob/master/example/src/sample4/Sample4.js" target="_blank" style={{float: "right", fontWeight: "bold"}}>
              View Source
            </a>
          </small>
          <br/><br/>
        </h2>
        <SimpleTable
          data={testData}
          columns={[
                    {title:"S/N", format: row => (row._index + 1)},
                    {title:"NAME", key: "name"},
                    {title:"POSITION", key: "position"},
                    {title:"OFFICE", key: "office"},
                    {title:"SALARY", key: "salary"},
                    {title:"DATE", format: row => formatDate(row.start_date)},
                  ]} 
          searchBox={false}
        />
    </div>
  );
}

export default Sample4;
