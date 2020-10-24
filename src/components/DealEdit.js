import React from 'react'; 
import "./../App.css";
import firestoreUpdateData from '../api/firestoreUpdateData';
import firestoreGetDoc from '../api/firestoreGetDoc';

class DealEdit extends React.Component {
  componentDidMount () {
    this.getData(); 
  }
  getData() {
    //const id = localStorage.getItem("id"); 
    const id = this.props.match.params.id; 
    console.log(id); 
    
    const promise = firestoreGetDoc(id); 
    promise.then((doc) => {
        this.title.value = doc.data().title; 
        this.message.value = doc.data().message;
        this.category.value = doc.data().category; 
        this.date.value = doc.data().date; 
        this.time.value = doc.data().time;
      })
      .catch((error) => {
        console.log(error);
      });  
  }
  updateDeal = (e) => {
    e.preventDefault(); 

    const title = this.title.value; 
    const message = this.message.value; 
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
      firestoreUpdateData(id, title, message, imageFile, category, date, time, dateInMilli)
      this.formReset(); 
    }
    //Resetting the form 
    this.title.value = ''; 
    this.message.value = ''; 
    this.imageFile.value = '';
    this.category.value = ''; 
    this.date.value = ''; 
    this.time.value = '';

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
            <input 
              type="text"
              name="message"
              className="form-control"
              placeholder="Message"
              ref={input => this.message = input} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image: </label>
            <input 
              type="file"
              name="imageFile"
              className="form-control-file"
              placeholder="Image URL"
              ref={input => this.imageFile = input }
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
          <button type="submit" className="btn btn-info" onClick={this.updateDeal}>Update Deal</button>
        </form>
      </div>
      
    );
  }
}

export default DealEdit; 