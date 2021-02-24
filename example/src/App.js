import React from 'react'
import { Redirect, Switch, Route, BrowserRouter, NavLink } from 'react-router-dom'
import Sample1 from './sample1/Sample1'
import Sample2 from './sample2/Sample2'
import Sample3 from './sample3/Sample3'
import Sample4 from './sample4/Sample4'
import Sample5 from './sample5/Sample5'

function App ({ basename }) {
  return (
    <BrowserRouter basename={basename}>
      <div className='App'>
        <h4 className='navb'>
          <code style={{ float: 'left', fontWeight: 'normal', color: '#777' }}>
            &gt; npm install my-simple-react-table
          </code>
          <NavLink to='/sample1'>
            Sample 1
          </NavLink>
          <NavLink to='/sample2'>
            Sample 2
          </NavLink>
          <NavLink to='/sample3'>
            Sample 3
          </NavLink>
          <NavLink to='/sample4'>
            Sample 4
          </NavLink>
          <NavLink to='/sample5'>
            Sample 5
          </NavLink>
          <a href='https://github.com/successtar/my-simple-react-table' target='_blank' rel='noreferrer' style={{ color: 'green', fontWeight: 'bold' }}>
            GitHub
          </a>
        </h4>
        <Switch>
          <Route path='/sample1' component={Sample1} />
          <Route path='/sample2' component={Sample2} />
          <Route path='/sample3' component={Sample3} />
          <Route path='/sample4' component={Sample4} />
          <Route path='/sample5' component={Sample5} />

          <Redirect to='/sample1' />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
