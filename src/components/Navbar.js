import React from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import firebaseLogout from '../api/firebaseLogout';

import '../App.css'; 

const Navbar = ({ setSearch }) => {
  
  const logout = () => {
    firebaseLogout();
  }
  const searchHandler = (e) => {
    setSearch(e.target.value);
  }
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" className="logo-navbar"/>
            Flash Deals
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <input 
                  className="form-control mr-sm-2" 
                  type="search" 
                  placeholder="Search" 
                  onChange={searchHandler}
                />
              </li>
            </ul>
            <ul className="navbar-nav">
              
              <li className="nav-item">
                <button className="btn btn-sm add-deal-btn">
                  <Link to="/deals/new" className="link ">Add Deal</Link>
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="btn btn-sm btn-danger" 
                  onClick={() => logout()}>
                    Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  ); 
}

export default Navbar; 