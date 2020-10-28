import React from 'react';

//Importing CSS File
import './App.css';

//Importing Components
import Home from './components/Home';
import DealCreate from './components/DealCreate';
import DealEdit from './components/DealEdit'; 
import Login from './components/Login';

//Importing from React Router Dom
import {BrowserRouter as Router, Route} from "react-router-dom"; 

function App() {
  return (
    <div>
      <Router>
        <div>
         
          <Route path="/" exact component={Home} />
          <Route path="/deals/new" exact component={DealCreate} />
          <Route path="/deals/edit/:id" exact component={DealEdit} />
          <Route path="/login" exact component={Login} />
        </div>
        
      </Router>
    </div>
  );
}

export default App;
