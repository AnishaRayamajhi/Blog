import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const navigate= useNavigate();

    const[title, setTitle]= useState('');
    const[slugData, setSlugData]= useState('');
    const[image, setImage]= useState('');
    const[description, setDescription]= useState('');
    const[categoryData, setCategory]= useState('');
    const[error, setError]= useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(image);
        const token= localStorage.getItem('token');
                
        const formData= new FormData();
        const slug=slugData.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/-+/g, '-');

        formData.append('image', image);
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('description', description);
        formData.append('categoryData', categoryData);
        formData.append('user', token);

        const url= "http://localhost:4000/api/createBlog";
        const response= await fetch(url ,{
            method: 'POST',
            body: formData            
        });

        const json= await response.json();

        if(!response.ok){
            setError(json.error);
        }
        else{
            setTitle('');
            setSlugData('');
            setImage('');
            setDescription('');
            setCategory('');
            navigate('/');
            alert('Blog Added Successfully.');
        }
    }

  return (
    <>
    <div className="container">
        <h1>Add Blog</h1>
        <form onSubmit={handleSubmit}>
            <label>Title</label><br/>
            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} /><br/>
            <label>Slug</label><br/>
            <input type="text" value={slugData} onChange={(e) => {setSlugData(e.target.value)}} /><br/>
            <label>Image</label><br/>
            <input type="file"  onChange={(e) => {setImage(e.target.files[0])}} /><br/>
            <label>Description</label><br/>
            <textarea rows={"10"} cols={"50"} value={description} onChange={(e) => {setDescription(e.target.value)}} /><br/>
                        
            <label>Category</label><br/>
            <select value={categoryData} onChange={(e) => setCategory(e.target.value)} >
            <option value="">Select a category</option>
            <option value="Action">Action</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Science">Science</option>
            <option value="Food">Food</option>
            </select>
<br/>
            <button className="btn btn-success my-3">Submit</button>
        </form>
        
    </div>
    {error && <div> {error} </div>}
    </>
  )
}

export default AddBlog;
