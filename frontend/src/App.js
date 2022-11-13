import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import BookFlight from './pages/BookFlight'
import Admin from './pages/Admin'
import { AuthProvider } from './context/authContext'
import MyBookings from './pages/MyBookings';
import TopBar from './components/TopBar';
import FlightDetails from './pages/FlightDetails';

function App() {
  return (
    <div className="App">
    <AuthProvider>
    <TopBar/>
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/signup' element={<SignUp></SignUp>}/>
      <Route path='/details/:id' element={<FlightDetails/>}/>
      <Route path='/admin' element={<Admin></Admin>}/>
      <Route path='/mybookings' element={<MyBookings></MyBookings>}/>
      <Route path='/bookmyflight' element={<BookFlight></BookFlight>}/>
    </Routes>
    
    </AuthProvider>
    </div>
  );
}

export default App;
