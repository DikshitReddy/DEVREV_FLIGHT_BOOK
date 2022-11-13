import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
      const navigate = useNavigate()
  return (
    <div className='HomeSection '>
    <div className='container row'>
    <div className='col-sm-6'>
    <div className="datahero">
          <div >
                    <h1>
      Start Your Journey...
    </h1>
    <p>
    Flight booking in your mind? <br></br>
    Looking for cheap airfares?  <br></br>
    Dev FlightBooking is your one-stop <br></br>
    destination for Domestic and International flight bookings.<br></br>
    </p>
    </div>
    <button className='btn btn-primary' onClick={()=> navigate('/mybookings')}>View Booking</button>&nbsp;&nbsp;&nbsp;
    <button className='btn btn-success' onClick={()=> navigate('/bookmyflight')}>Book Now</button>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Home