import React from 'react'; 


import "../App.css"; 
import logo from '../assets/images/logo.png';

import firebaseLogin from '../api/firebaseLogin';

class Login extends React.Component {
  login = (e) => {
    e.preventDefault(); 
    console.log("Login button clicked");
    const email = this.email.value; 
    const password = this.password.value; 

    if(email === '' || password === '') {
      alert("Email or Password can't be empty"); 
    } else {
      firebaseLogin(email, password);
      console.log(email);
      this.formReset(); 
    }
  }
  formReset() {
    this.email.value = ''; 
    this.password.value = '';
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-3">
          <img src={logo} alt="Logo" className="logo"/>
        </h1>
        <div className="form-div">
          <form onSubmit={this.login}>
            <div className="form-group">
              <label htmlFor="email">Email Address: </label>
              <input 
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                ref={input => this.email = input} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input 
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                ref={input => this.password = input }
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-login">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    ); 
  }
}; 

export default Login;