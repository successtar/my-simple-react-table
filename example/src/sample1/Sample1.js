import React from "react";
import SimpleTable from "../simple-react-table"
import {testData} from '../testData';
import "../simple-react-table.scss"

const Sample1 = _ => {
  return (
    <div className="App">
        <h2>
          1. Simple React Table Basic Usage 
          <small>
            <a href="https://github.com/successtar/simple-react-table/blob/master/example/src/sample1/Sample1.js" target="_blank" style={{float: "right", fontWeight: "bold"}}>
              View Source
            </a>
          </small>
          <br/><br/>
        </h2>
        <SimpleTable
          data={testData}
        />
    </div>
  );
}

export default Sample1;
