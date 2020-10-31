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
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState("all"); 
  const [filteredDeals, setFilteredDeals] = useState([])
  //Use Effect
  useEffect(() => {
    const fetchDeals = async () =>{
      //Getting data from firestore. 
      const data = await firestoreGetData(); 
      setDeals(data.docs);
      setLoading(false);
    };
    fetchDeals(); 
    console.log("data fetched")
    authListener(); 
    filterHandler(); 
    console.log(category);
	}, [])
  useEffect (() => {    
    filterHandler();
  }, [category]);

  const searchFilteredDeals = filteredDeals.filter(deal => {
    return (deal.data().title.toLowerCase().includes(search.toLowerCase()) ||
            deal.data().category.toLowerCase().includes(search.toLowerCase()) );
    });
  const searchedDeals = deals.filter(deal => {
    return (deal.data().title.toLowerCase().includes(search.toLowerCase()) ||
            deal.data().category.toLowerCase().includes(search.toLowerCase()) );
    });
  const filterHandler = () => {
    const currentDate = new Date();
    
    const currentMilli = Date.now();
    console.log(deals.map(deal => deal.data().dateInMilli));
    console.log(currentMilli);
    switch(category) {
      case "all": 
        setFilteredDeals(deals.filter(deal => deal.data().category.toLowerCase() === "upcoming" || deal.data().category.toLowerCase() === "regular" )); 
        break;
      case "upcoming": 
        setFilteredDeals(deals.filter(deal => deal.data().category.toLowerCase() === category)); // && deal.data().dateInMilli > currentMilli
        break;
      case "current": 
        setFilteredDeals(deals.filter(deal => deal.data().category.toLowerCase() === "regular" && deal.data().dateInMilli > currentMilli));
        break;
      case "missed": 
        setFilteredDeals(deals.filter(deal => deal.data().category.toLowerCase() === "regular"  && deal.data().dateInMilli <= currentMilli));
        break;
      
    }
  }
  

  const deleteBtnClick = (id) => {
    console.log("deleteButton clicked!", id);
    firestoreDeleteData(id);
  }
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  }
  
  
  
  
   
  if(loading) {
    return (
      <div>
        <Navbar setSearch={setSearch} />
        <div className="loader">
          <BounceLoader size={100} />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Navbar setSearch={setSearch}/>
        <div className="container">
          <div className="category-div mt-3 ml-auto">
            <div className="form-group">
              <select 
                onChange={categoryHandler}
                className="custom-select" 
                name="category" 
                id="category"
                defaultValue= { {label: "all", value: "all" }}
              >
                  <option value="all">All</option>
                  <option value="current">Current</option>
                  <option value="missed">Missed</option>
                  <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
          {searchFilteredDeals.length ? 
            (
              <div className="row mb-5">
                {searchFilteredDeals.map(doc => (
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
            ) : 
            (
              <div className="row mb-5">
                {searchedDeals.map(doc => (
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
            )
          }
          
        </div>
      </div>
    );
  }
}

export default Home; 