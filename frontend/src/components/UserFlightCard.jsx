import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Card.css'
import AuthContext from './../context/authContext'

function AdminFlightCard({flight_no, to, from, id, passenger_list, name, date}) {
    let {userdata} = useContext(AuthContext)
    userdata = JSON.parse(userdata)
    const navigate = useNavigate()
    async function handleClick() {
        const res = fetch(`http://localhost:5000/bookflight`,{
          method: 'POST',
          headers:{
            'x-access-token': userdata.token,
            'Content-Type':'application/json'
          },
          body: JSON.stringify({id:id, email:userdata.email})
        })
        console.log(res);
        navigate(0)
    }
  return (
    
    <div className="cardcontainer">
        <div className='datacontainer'>
          <div>
            <h2>flight. No:{flight_no}</h2>
            <h3> Flight Name:{name}</h3>
          </div>
          <div className='row'>
          <p className='col-sm-3'>from: {from} </p>
          <p className='col-sm-3'>to: {to}</p>
          <p className='col-sm-3'>Date: {date.substr(0,10)}</p>
          </div>
        </div>
        <button className='btn btn-primary' onClick={()=>handleClick()} disabled={passenger_list.length<=60?false:true}>Book Now</button>
    </div>
  )
}

export default AdminFlightCard
