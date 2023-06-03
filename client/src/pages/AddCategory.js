import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const navigate= useNavigate();
    const[name, setName]= useState('');
    const[error, setError]= useState('');
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const userData= {name};
        const url= "http://localhost:4000/api/addCategory";
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
            navigate('/displayAllCategory');
            alert('Category Added Successfully.');
        }
    }

  return (
    <>
    <div className="container">
        <h1>Add Category</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label><br/>
            <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} /><br/>
            <button className="btn btn-success my-3">Add</button>
        </form>
        
    </div>
    {error && <div> {error} </div>}
    </>
  )
}

export default AddCategory;