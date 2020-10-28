import React from 'react'; 
import { Link } from 'react-router-dom';
import firebaseLogout from '../api/firebaseLogout';

import '../App.css'; 

const Navbar = () => {
  
  const logout = () => {
    firebaseLogout();
  }
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        <Link to="/" className="navbar-brand">Flash Deals</Link>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <button className="btn btn-sm btn-primary">
                  <Link to="/deals/new" className="link">Add Deal</Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-danger" onClick={() => logout()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  ); 
}

export default Navbar; 