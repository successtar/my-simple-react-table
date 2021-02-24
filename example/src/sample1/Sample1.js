import React from "react";
import {testData} from '../testData';
import SimpleTable from "my-simple-react-table";
import "my-simple-react-table/dist/style.scss";


const Sample1 = _ => {
  return (
    <div className="App">
        <h2>
          1. My Simple React Table Basic Usage 
          <small>
            <a href="https://github.com/successtar/my-simple-react-table/blob/master/example/src/sample1/Sample1.js" target="_blank" rel="noreferrer" style={{float: "right", fontWeight: "bold"}}>
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
