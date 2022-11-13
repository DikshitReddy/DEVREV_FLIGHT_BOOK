import { useEffect, useContext, useState } from "react"
import React from 'react'
import axios from 'axios'
import AuthContext from './../context/authContext'
// DONE
function MyBookings() {

  const [flights, setFlights] = useState([])
    let {userdata} = useContext(AuthContext)
    userdata = JSON.parse(userdata)
    useEffect(() => {
        const dataHandle = async () => {
          const res = await axios.get('http://localhost:5000/mybookings', {
            headers: {
                'x-access-token': userdata.token
          }
        })
        setFlights(res.data.flights)
        console.log(res.data.flights)
        }
        dataHandle()
    }, [])
    
  return (
    <div>
    <div className="mybooks">
        <center> <h1>Booked Flights</h1></center> 
    {
      flights.map(flight => {
        return(<div key={flight._id}>
          <div className='container'>
          <div className='container'>

<div class="card">
  <h2 class="card-header">flight. No:{flight.flight_no}</h2>
  <div class="card-body">
    <h3 class="card-title">Flight Name:{flight.name}</h3>
    <div className='row'>
            <p className='col-sm-4'>from: {flight.from} </p>
          <p className='col-sm-4'>to: {flight.to}</p>
          </div>
  </div>
</div>
</div>
        </div>
        </div>
        )
      })
    }
    </div>
    </div>
  )
}

export default MyBookings