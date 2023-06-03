import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
        const navigate= useNavigate();
    
        const[name, setName]= useState('');
        const[email, setEmail]= useState('');
        const[password, setPassword]= useState('');
        const[error, setError]= useState('');
    
        const handleSubmit = async(e) => {
            e.preventDefault();
            const userData= {name, email, password};
            const url= "http://localhost:4000/api/signUp";
            const response= await fetch(url ,{
                method: 'POST',
                body: JSON.stringify(userData),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const json= await response.json();
    
            if(!response.ok){
                setError(json.error);
            }
            else{
                setName('');
                setEmail('');
                setPassword('');
                navigate('/logIn');
                alert('Signed Up Successfully');
            }
        }
  return (
    <>
    <div className="container">
        <h1> SignUp Form</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label><br/>
            <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} /><br/>
            <label>Email</label><br/>
            <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} /><br/>
            <label>Password</label><br/>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} /><br/>
            <button className="btn btn-success my-3">SignUp</button>
        </form>
        
    </div>
    {error && <div> {error} </div>}
    </>
  )
}

export default SignUp;
