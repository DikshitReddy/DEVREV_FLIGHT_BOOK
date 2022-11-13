import React from 'react'
import AddFlight from '../components/AddFlight'
import AdminFlight from '../components/AdminFlight'
function Admin() {
  return (
    <>
    <div className='adminHero'></div>
    <div>
    
    <h1>Admin</h1>
        <AddFlight/>
        <hr/>
        <AdminFlight/>
    </div>
    </>
  )
}

export default Admin