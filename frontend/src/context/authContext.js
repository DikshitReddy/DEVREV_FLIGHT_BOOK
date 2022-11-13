import React,{ createContext, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [userdata, setUserdata] = useState(()=> localStorage.getItem('userData'))
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const navigate = useNavigate()

    let loginUser = async (e )=> {
        e.preventDefault();
        let response = await fetch('http://localhost:5000/login', {
            method:'POST',
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type':'application/json',
                "mode" : "no-cors",
            },
            body:JSON.stringify({email:e.target.username.value, password:e.target.password.value})
        })
        let data = await response.json();
        if(response.status === 200){
            setUserdata(data);
            setUser(jwt_decode(data.token));
            localStorage.setItem('authTokens', JSON.stringify(data.token));
            localStorage.setItem('userData', JSON.stringify(data));
            navigate('/');
        }else{
            alert('Something went wrong!');
        }
    };


    let logoutUser = () => {
        setUser(null)
        setUserdata(null)
        localStorage.clear()
        navigate('/login')
    }
    let contextData = {
        userdata:userdata,
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;