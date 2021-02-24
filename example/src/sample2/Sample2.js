import React from "react";
import {testData} from '../testData';
import SimpleTable from "my-simple-react-table";
import "my-simple-react-table/dist/style.scss";

const Sample2 = _ => {
  return (
    <div className="App">
        <h2>
          2. My Simple React Table With Column Specification
          <small>
            <a href="https://github.com/successtar/my-simple-react-table/blob/master/example/src/sample2/Sample2.js" rel="noreferrer" target="_blank" style={{float: "right", fontWeight: "bold"}}>
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
