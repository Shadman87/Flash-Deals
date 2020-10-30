import React from 'react'; 
import "./../App.css";

import Navbar from './Navbar';

import firestoreUpdateData from '../api/firestoreUpdateData';
import firestoreGetDoc from '../api/firestoreGetDoc';
import authListener from '../api/authListener';

class DealEdit extends React.Component {
  state = {
    file: null, 
    display: 'none'
  };
  
  componentDidMount () {
    authListener(); 
    this.getData(); 
  }
  handleChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      display: 'block'
    }); 
  }
  getData() {
    //const id = localStorage.getItem("id"); 
    const id = this.props.match.params.id; 
    console.log(id); 
    
    const promise = firestoreGetDoc(id); 
    promise.then((doc) => {
        this.title.value = doc.data().title; 
        this.message.value = doc.data().message;
        this.subMessage.value = doc.data().subMessage;
        this.category.value = doc.data().category; 
        this.date.value = doc.data().date; 
        this.time.value = doc.data().time;
        this.setState({
          file: doc.data().imageUrl,
          display: 'block'
        });
      })
      .catch((error) => {
        console.log(error);
      });  
  }
  updateDeal = (e) => {
    e.preventDefault(); 

    const title = this.title.value; 
    const message = this.message.value; 
    const subMessage = this.subMessage.value; 
    const imageFile = this.imageFile.files[0];
    const category = this.category.value; 
    const date = this.date.value; 
    const time = this.time.value;  
    const dateTime = date + " " + time; 
    const dateInMilli = Date.parse(dateTime);
    //Id from the URL 
    const id = this.props.match.params.id; 
    
    if(title === '' || message === '' || category === '' || date === '' || time === '' || dateInMilli === '') {
      alert("Form can't be empty"); 
    } else {
      firestoreUpdateData(id, title, message, subMessage, imageFile, category, date, time, dateInMilli)
      this.formReset(); 
    }
  }
  formReset() {
    this.title.value = ''; 
    this.message.value = ''; 
    this.imageFile.value = '';
    this.category.value = ''; 
    this.date.value = ''; 
    this.time.value = '';
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className="add-form container">
        <form onSubmit={this.addDeal}>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              ref={input => this.title = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message: </label>
            <textarea 
              type="text"
              name="message"
              className="form-control"
              placeholder="Message"
              rows="3"
              ref={input => this.message = input} 
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="subMessage">Sub Message (Optional): </label>
            <textarea 
              type="text"
              name="subMessage"
              className="form-control"
              placeholder="Sub Message"
              rows="3"
              ref={input => this.subMessage = input} 
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image: </label>
            <input 
              type="file"
              name="imageFile"
              className="form-control-file"
              placeholder="Image URL"
              onChange={this.handleChange}
              ref={input => this.imageFile = input }
            />
            <img 
              src={this.state.file} 
              alt=""
              className="img-preview mt-3 mb-3"
              style={{display: `${this.state.display}`}}  
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category: </label>
            <select 
              className="custom-select" 
              name="category" 
              ref={input => this.category = input}>
              <option value="regular">Regular</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input 
              type="date"
              name="date"
              className="form-control"
              ref={input => this.date = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Date:</label>
            <input 
              type="time"
              name="time"
              className="form-control"
              ref={input => this.time = input}
            />
          </div>
          <button type="submit" className="btn update-deal-btn-lg" onClick={this.updateDeal}>Update Deal</button>
        </form>
      </div>
      </div>
    );
  }
}

export default DealEdit; 