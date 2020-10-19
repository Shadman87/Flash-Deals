import React from 'react';

//Importing CSS File
import './App.css';

//Importing Components
import Home from './components/Home';

//Importing from React Router Dom
import {BrowserRouter as Router, Route} from "react-router-dom"; 

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
    </Router>
  );
}

export default App;
