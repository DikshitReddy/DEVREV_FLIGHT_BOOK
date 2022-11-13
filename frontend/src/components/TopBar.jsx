import React, {useContext} from 'react'
import { Link} from 'react-router-dom'
import AuthContext from '../context/authContext'
import './../styles/topbar.css'

const TopBar = () => {
    let {userdata, user, logoutUser} = useContext(AuthContext)
    userdata = JSON.parse(userdata)
    return (
        <div className='topbar'>
            {
                userdata && <div>{userdata.roles == "User" ? <div>
                    <Link className='btn btn-link' to="/">Home</Link>
                <Link className='btn btn-link' to="/mybookings" >My Bookings</Link>
                <Link className='btn btn-link' to="/bookmyflight" >Book a flight</Link>
                </div> : <Link className='btn btn-link' to="/admin" >Admin Panel</Link>}</div>
            }
            {user ? (
                 <button className='btn btn-default' onClick={logoutUser}>Logout</button>
            ): (
                <Link className='btn btn-link' to="/login" >Login</Link>
            )}  
        </div>
    )
}

export default TopBar