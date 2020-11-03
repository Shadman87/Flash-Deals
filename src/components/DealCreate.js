import React from 'react'; 
import "../App.css"; 
import Navbar from './Navbar';

import validationAlert from '../helperFunctions/validationAlert';
import firestoreSetData from '../api/firestoreSetData';
import authListener from '../api/authListener';


class DealCreate extends React.Component {
  state = {
    file: null, 
    display: 'none',
    titleError: "", 
    messageError: '',
    subMessageError: '', 
    imageFileError: '',
    categoryError: '',
    dateError: '', 
    timeError: '',
  };
  componentDidMount () {
    authListener(); 
  }
  handleChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      display: 'block'
    }); 
  }
  validate = (title, message, subMessage, imageFile, category, date, time) =>{
    if(title.length < 4) {
      this.setState({
        titleError: "Title's length must be more than 3",
      }); 
      validationAlert("Title's length must be more than 3"); 
      return false;
    } 
    if(message.length < 4) {
      this.setState({
        messageError: "Message's length must be more than 3",
      }); 
      validationAlert("Message's length must be more than 3")
      return false;
    }
    if(!imageFile) {
      this.setState({
        imageFileError: "Image Field is empty",
      }); 
      validationAlert("Image Field is empty")
      return false;
    }
    if(category === '') {
      this.setState({
        categoryError: "Category needs to be selected",
      });
      validationAlert("Category needs to be selected") 
      return false;
    }
    if(date === '') {
      this.setState({
        dateError: "Date can't be empty",
      }); 
      validationAlert("Date can't be empty"); 
      return false;
    }
    if(time === '') {
      this.setState({
        timeError: "Time can't be empty",
      }); 
      validationAlert("Time can't be empty"); 
      return false;
    }
    return true; 
  }

  addDeal = (e) => {
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

    //Generating ID;
    var d = new Date(); 
    var id = Date.parse(d).toString();
    const isValid = this.validate(title, message, subMessage, imageFile, category, date, time); 

    if(isValid) {
      firestoreSetData(id, title, message, subMessage, imageFile, category, date, time, dateInMilli)
      this.formReset(); 
    } else {
      //validationAlert(); 
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
            <div style={{ fontSize: 14, color: 'red'}}>{this.state.titleError}</div>
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
            <div style={{ fontSize: 14, color: 'red'}}>{this.state.messageError}</div>
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
            <div style={{ fontSize: 14, color: 'red'}}>{this.state.subMessageError}</div>
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
            <div style={{ fontSize: 14, color: 'red'}}>{this.state.imageFileError}</div>
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
            <div style={{ fontSize: 14, color: 'red'}}>{this.state.categoryError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input 
              type="date"
              name="date"
              className="form-control"
              ref={input => this.date = input}
            />
            <div style={{ fontSize: 14, color: 'red'}}>{this.state.dateError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input 
              type="time"
              name="time"
              className="form-control"
              ref={input => this.time = input}
            />
            <div style={{ fontSize: 14, color: 'red'}}>{this.state.timeError}</div>
          </div>
          <button type="submit" className="btn add-deal-btn-lg">Add Deal</button>
        </form>
      </div>
      </div>
    ); 
  }
}; 
export default DealCreate; 