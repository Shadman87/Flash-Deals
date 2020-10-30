import React, {useState, useEffect} from "react"; 
import { Link } from 'react-router-dom';

import { BounceLoader } from 'react-spinners';

//Importing Components
import Navbar from './Navbar';
import Countdown from './Countdown';

import "../App.css"; 

//Importing functions with api
import firestoreGetData from "../api/firestoreGetData";
import firestoreDeleteData from "../api/firestoreDeleteData";
import authListener from "../api/authListener"; 

const Home = () => {
  //States 
  const [deals, setDeals] = useState([]); 
  const [loading, setLoading] = useState(true); 
  //Use Effect
  useEffect (() => {    
    const fetchDeals = async () =>{
      //Getting data from firestore. 
      const data = await firestoreGetData(); 
      setDeals(data.docs);
      setLoading(false);
    };
    fetchDeals(); 
    authListener(); 
  }, []);

  const deleteBtnClick = (id) => {
    console.log("deleteButton clicked!", id);
    firestoreDeleteData(id);
  }
  if(loading) {
    return (
      <div>
        <Navbar />
        <div className="loader">
          <BounceLoader size={100} />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row mb-5">
            {deals.map(doc => (
              <div key={doc.id} className="col-md-4 mt-5">
                <Link to={`/deals/edit/${doc.id}`}>
                  <div className="card">  
                    <div className="content">
                      <img src={doc.data().imageUrl} className="card-img-top" alt=""/>
                      <div className="title-block">
                        <h6>{doc.data().title}</h6>
                      </div>
                      <div className="category-block">
                        <h6>{doc.data().category}</h6>
                      </div>
                      <div className="deleteBtn-block" onClick={() => deleteBtnClick(doc.id)}>
                        <i className="fa fa-trash"/>
                      </div>
                      <div className="timer-block">
                        <Countdown date={doc.data().date} time={doc.data().time} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home; 