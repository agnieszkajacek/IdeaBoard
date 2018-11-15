import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import './App.css';
import IdeasContainer from './components/IdeasContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid fluid={true}> 
          <div className="App-header">
            <h1>Idea Board</h1>
          </div>
          <div>
            <IdeasContainer />
          </div>
        </Grid>
      </div>
    );
  }
}

export default App;
