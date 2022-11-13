import React, {useEffect, useContext, useState} from 'react'
import {useParams} from 'react-router-dom'
import AuthContext from '../context/authContext'
import axios from 'axios'

function FlightDetails() {
    const [passengerdetails, setPassengerdetails] = useState([])
    const [data, setData] = useState({})
      let {userdata} = useContext(AuthContext)
  userdata = JSON.parse(userdata)
    const params = useParams()
    const id = params.id;
    useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/flight/details/${id}`,{
            headers: {
                'x-access-token': userdata.token
    }
        })
        setData(res.data)
        console.log(res.data)
        console.log(res.data.passenger_list);
        setPassengerdetails(res.data.passenger_list)
    }, [])
    
  return (
    <div >
    <div className='grad'></div>
    <div className="container mybooks">
    <h1>Details of {data.name}</h1>
    <div className='container row'>
    <div className='col-sm-3'><p>Flight No</p><h3>{data.flight_no}</h3></div>
    <div className='col-sm-3'><p>From</p><h3>{data.from}</h3></div>
    <div className='col-sm-3'><p>To</p><h3>{data.to}</h3></div>
    <div className='col-sm-3'><p>Passengers</p><h3>{passengerdetails.length}</h3></div>
    </div>
        {
            passengerdetails.map(p => {
                return(
                    <div key={p._id}>
                        <h4>Name: {p.name}</h4>
                        <hr/>
                    </div>
                
                )
            })
        }

    </div>
    </div>
  )
}

export default FlightDetails