import React from 'react';

//Importing CSS File
import './App.css';

//Importing Components
import Home from './components/Home';
import Navbar from './components/Navbar';
import DealCreate from './components/DealCreate';

//Importing from React Router Dom
import {BrowserRouter as Router, Route} from "react-router-dom"; 

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/deals/new" exact component={DealCreate} />
        </div>
      </Router>
    </div>
  );
}

export default App;
