import axios from 'axios'
import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Card.css'
import AuthContext from './../context/authContext'

// Done
function AdminFlightCard({flight_no, to, from, id, passenger_list, date ,name}) {
    const navigate = useNavigate()
      let {userdata} = useContext(AuthContext)
  userdata = JSON.parse(userdata)
                                        
    async function handleClick() {
        const res = await axios.delete(`http://localhost:5000/flight/remove/${id}`,{
            headers: {
                'x-access-token': userdata.token
    }
        })
        console.log(res);
        navigate(0)
    }
    async function handleDetails() {
        navigate(`/details/${id}`)
    }
  return (
    <div className='cardcontainer'>
        <div className='datacontainer'>
          <div>
            <h2>flight. No:{flight_no}</h2>
            <h3> Flight Name:{name}</h3>
          </div>
          <p>from: {from} &nbsp;&nbsp;&nbsp;to: {to}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;On {date.toString().substring(0,10)}</p>
        </div>
        <div>
          <button className='btn btn-danger' onClick={()=>handleClick()}>Remove</button>
          <button className='btn btn-primary' onClick={()=>handleDetails()}>Details</button>
        </div>
    </div>
  )
}

export default AdminFlightCard