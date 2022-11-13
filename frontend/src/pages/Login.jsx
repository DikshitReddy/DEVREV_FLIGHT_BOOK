import React, {useContext} from 'react'
import AuthContext from './../context/authContext'
import './../styles/login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div>
        <div className='container mybooks'>
        <h1>Login</h1>
                        <form onSubmit={loginUser}>
  <div className="form-group">
    <label htmlFor="email">Email address:</label>
    <input type="email" name="username" className="form-control"/>
  </div>
  <div className="form-group">
    <label htmlFor="pwd">Password:</label>
    <input type="password" name="password" className="form-control"/>
  </div>

  <button type="submit" className="btn btn-default">Submit</button>
</form>
<span>Don't Have account</span> <Link to='/signup'>Create account</Link>
        </div>
        </div>
    )
}

export default Login