import React, {useState, useEffect} from "react"; 
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import "../App.css"; 

import firestoreGetData from "../api/firestoreGetData";
import firestoreDeleteData from "../api/firestoreDeleteData";
import authListener from "../api/authListener"; 

const Home = () => {
  //States 
  const [deals, setDeals] = useState([]); 
  //Use Effect
  useEffect (() => {    
    const fetchDeals = async () =>{
      //Getting data from firestore. 
      const data = await firestoreGetData(); 
      setDeals(data.docs);
    };
    fetchDeals(); 
    authListener(); 
  }, []);

  const deleteBtnClick = (id) => {
    console.log("deleteButton clicked!", id);
    firestoreDeleteData(id);
  }
  
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row ">
        {deals.map(doc => (
          <div key={doc.id} className="col mt-5">
            <div className="card">  
              <div className="content">
                <img src={doc.data().imageUrl} className="card-img-top" alt=""/>
                <div className="text-block">
                  <h5>{doc.data().title}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  ); 
}

export default Home; 