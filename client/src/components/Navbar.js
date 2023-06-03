import React from 'react';
import { NavLink, Outlet} from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
    <div className="nav">
        <div className="container">
            <div className="row">
                <div className="col-md-4" id='logo'>
                    <h1> Blog </h1>
                </div>
                <div className="col-md-8">
                    <ul id="list">
                        <li><NavLink to="/"> Home</NavLink></li>
                        <li><NavLink to="/signUp"> SignUp</NavLink></li>
                        <li><NavLink to="/logIn"> LogIn</NavLink></li>
                        <li><NavLink to="/addCategory"> Add Category</NavLink></li>
                        <li><NavLink to="/displayAllCategory"> Display Category</NavLink></li>
                        <li><NavLink to="/addBlog"> Add Blog</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <main>
        <Outlet />
    </main>
    {/* {error && <div> {error} </div>} */}
    </>
  )
}
