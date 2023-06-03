import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const navigate= useNavigate();

    const[email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const[error, setError]= useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const userData={email, password};
        const url= "http://localhost:4000/api/logIn";
        const response= await fetch(url ,{
            method: 'POST',
            body: JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json= await response.json();
        if(!response.ok)
        {
            setError(json.msg);
        }
        else{
            localStorage.setItem('token', json.accessToken);
            setEmail('');
            setPassword('');
            navigate('/');
            alert('Logged In');
        }
    }
  return (
    <>
    <div className="container">
        <h2>Log In Form</h2>
        <form onSubmit={handleSubmit}>
            <label>Email</label><br />
            <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} /><br/>
            <label>Password</label><br/>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} /><br/>
            <button className="btn btn-primary my-3">Log In</button>
        </form>
    </div>
    {error && <div> {error}</div>}
    </>
  )
}

export default LogIn;
