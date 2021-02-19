import React from "react";
import SimpleTable from "../simple-react-table"
import {testData} from '../testData';
import "../simple-react-table.scss"

const Sample2 = _ => {
  return (
    <div className="App">
        <h2>
          2. Simple React Table With Column Specification
          <small>
            <a href="/" target="_blank" style={{float: "right", fontWeight: "bold"}}>
              View Source
            </a>
          </small>
          <br/><br/>
        </h2>
        <SimpleTable
          data={testData}
          columns={[
                    {title:"NAME", key: "name"},
                    {title:"POSITION", key: "position"},
                    {title:"OFFICE", key: "office"},
                    {title:"SALARY", key: "salary"},
                    {title:"DATE", key: "start_date"},
                  ]} 
        />
    </div>
  );
}

export default Sample2;
