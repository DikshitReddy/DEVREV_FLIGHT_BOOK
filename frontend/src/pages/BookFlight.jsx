import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import UserFlightCard from '../components/UserFlightCard'
import AuthContext from './../context/authContext'


function BookFlight() {
  let {userdata} = useContext(AuthContext)
  userdata = JSON.parse(userdata)
    const [flights, setFlights] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState([])
    useEffect(async () => {
      const data = await axios.get('http://localhost:5000/flight/all',{
            headers: {
                'x-access-token': userdata.token
    }
        })
        setFlights(data.data)
        setSearchResult(data.data)
        return () => {
    console.log('This will be logged on unmount');
  };
    },[])
  const handleSearch = (event) => {
    if(search===""){
        setSearchResult(flights);
    }
    else{
      let newData = flights.filter(flight =>{
        if(flight.date.includes(search)) return true;
        return false;
      })
      setSearchResult(newData)
    }

  };
    useEffect(() => {
        handleSearch();
    }, [search]);
    
  return (<>
    <div className="userBookFlight"></div>
    <div className="mybooks">
    <center><h1 style={{color:'white'}}>Book Your Flight</h1></center>
    <center><form>
        <input type="date" placeholder='Search Date' onChange={e=>setSearch(e.target.value)}/>
    </form></center>
    <br></br>
    {
        searchResult.map(flight => <UserFlightCard key={flight._id} flight_no={flight.flight_no} from={flight.from} to={flight.to} name={flight.name} id={flight.id} passenger_list={flight.passenger_list} date={flight.date}/>)
    }
    </div>
    </>
  )
}

export default BookFlight