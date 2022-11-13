import React, { useState } from 'react'
import axios from 'axios'
import './../styles/login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    function handleSubmit(e){
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

        axios.post('http://localhost:5000/register',{
          name,email,password
        },config).then((res)=>{
          navigate('/login')
        })

    }

  return (
    <div>
      <div className="container mybooks">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Name</label>
            <input className="form-control" type="text" name="name" value={name} onChange={e=> setName(e.target.value)} />
            </div>
            <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" name="email" value={email} onChange={e => setemail(e.target.value)}/>
            </div>
            <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
            <input type="submit" className='btn btn-primary' value="SignUp" />
            </div>
            {/* <div id="message">
                <h3>Password must contain the following:</h3>
                <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
                <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
                <p id="number" class="invalid">A <b>number</b></p>
                <p id="length" class="invalid">Minimum <b>8 characters</b></p>
            </div> */}
        </form>
        <span>Already have account</span> <Link to='/login'>Login account</Link>
    <div className="form-group">
    </div></div>
    </div>
  )
}
export default SignUp