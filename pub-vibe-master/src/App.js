import React, { Component } from "react";
import Greet from "./components/Greet";
import "./App.css";
var Alert = require('react-bootstrap/lib/Alert');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Greet />
        Helloo
        <Alert bsStyle="warning">
          <strong>Holy guacamole!</strong> Best check yo self, you're not
          looking too good.
        </Alert>
        ;
      </div>
    );
  }
}

export default App;
