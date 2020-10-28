import React from 'react';

//Importing CSS File
import './App.css';

//Importing Components
import Home from './components/Home';
import Navbar from './components/Navbar';
import DealCreate from './components/DealCreate';
import DealEdit from './components/DealEdit'; 
import DealDelete from './components/DealDelete'; 
import Login from './components/Login';

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
          <Route path="/deals/edit/:id" exact component={DealEdit} />
          <Route path="/deals/delete/:id" exact component={DealDelete} />
          <Route path="/login" exact component={Login} />
        </div>
      </Router>
    </div>
  );
}

export default App;
