import axios from 'axios'
import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from './../context/authContext'
// DONE
function AddFlight() {
  let {userdata} = useContext(AuthContext)
  userdata = JSON.parse(userdata)
    const [name, setName] = useState("")
    const [flight_no, setflightNo] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [date, setDate] = useState()
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        await axios.post('http://localhost:5000/flight/add',{name, flight_no, from, to,date},{
            headers: {
                'x-access-token': userdata.token
    }
        })
        navigate(0)
    }

  return (
    <div>
    <div className="addflight"></div>
        <div className="container">
        <h1>Add Flight</h1>
          <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <div class="col-xs-6">
          <input type="text" className="form-control" name="name" placeholder='Flight Name' value={name} onChange={e => setName(e.target.value)} required={true}/>
  </div>
    <div class="col-xs-6">
        <input type="text" className="form-control" name="flight_no" placeholder='Flight Number' value={flight_no} onChange={e => setflightNo(e.target.value)} required={true}/>
  </div>
        </div>
        <div className="form-group row"><div class="col-xs-4">
 
          <input type="text" className="form-control" name="from" placeholder='From' value={from} onChange={e => setFrom(e.target.value)} required={true}/>
  </div>
  <div class="col-xs-4">
        <input type="text" className="form-control" name="to" placeholder='Destination' value={to} onChange={e => setTo(e.target.value)} required={true}/>
  </div>
    <div class="col-xs-4">
        <input type="date" className="form-control" name="date" placeholder='Date' value={date} onChange={e => setDate(e.target.value)} required={true}/>
  </div>
        </div>
        <input type="submit" className='btn btn-primary' value="Add Flight" />
        </form>
        </div>
    </div>
  )
}

export default AddFlight