import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import AdminFlightCard from './AdminFlightCard'
import AuthContext from './../context/authContext'
// Done
function AdminFlight() {
    const [flights, setFlights] = useState([])
    let {userdata} = useContext(AuthContext)
    
  userdata = JSON.parse(userdata)
  const dataFetch =async ()=> {
          const data = await axios.get('http://localhost:5000/flight/all',{
            headers: {
                'x-access-token': userdata.token
    }
        })
        console.log(data.data)
        setFlights(data.data)
        return () => {
    console.log('This will be logged on unmount');
  };
  }
    useEffect(() => {
      dataFetch()
    },[])
    
  return (
    <div>
    {
        flights.map(flight => <AdminFlightCard key={flight._id} flight_no={flight.flight_no} from={flight.from} to={flight.to} name={flight.name} id={flight.id} passenger_list={flight.passenger_list} date={flight.date}/>)
    }
    </div>
  )
}

export default AdminFlight