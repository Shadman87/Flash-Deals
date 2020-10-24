import React, {useState, useEffect} from "react"; 
import { Link } from 'react-router-dom';

import "../App.css"; 

import firestoreGetData from "../api/firestoreGetData";


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
  }, []);
  
  return (
    
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {deals.map(doc => (
          <div key={doc.id} className="col mt-5 mb-4">
            <div className="card">
              <img src={doc.data().imageUrl} className="card-img-top" alt=""/>
              <div className="card-body">
                <h5 className="card-title">{doc.data().title}</h5>
                <p className="card-text">{doc.data().message}</p>
                <div className="btn-div"> 
                  <Link to={`/deals/edit/${doc.data().id}`} className="btn-link">
                    <i className="fa fa-edit"></i>
                  </Link>
                  <Link to={`/deals/delete/${doc.data().id}`} className="btn-link">
                    <i className="fa fa-trash"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); 
}

export default Home; 