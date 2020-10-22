import React from 'react'; 


class DealCreate extends React.Component {

  addDeal = (e) => {
    e.preventDefault(); 

    const title = this.title.value; 
    const message = this.message.value; 
    const imageFile = this.imageFile.files[0]; 

    var d =  new Date(); 
    var id = Date.parse(d).toString(); 
    console.log(id); 

    console.log(title + " " + message + " " + imageFile);
  }
  
  render() {
    return (
      //Form for input of deals;
      <div className="container">
        <h3 className="text-center mt-5">Deals Form</h3>
        <form onSubmit={this.addDeal}>
          <div className="form-grop">
            <label htmlFor="title">Title: </label>
            <input 
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              ref={input=> this.title = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <input 
              type="text"
              name="message"
              className="form-control"
              placeholder="Message"
              ref={input => this.message = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageFile">Image</label>
            <input 
              type="file"
              className="form-control-file"
              name="imageFile"
              ref={input => this.imageFile = input}
            />
          </div>
          <button type="submit" className="btn btn-outline-info">Add Deal</button>
        </form>
      </div>
    ); 
  }
}; 

export default DealCreate; 