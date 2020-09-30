import React from "react";
import { Link } from "react-router-dom"


const Landing = () => {
    return (
        <div className="jumbotron mt-5">
            <h1>Welcome to your bag</h1>
            <p>Sign in to create your Disc Golf Bag</p>
            <Link className="btn btn-primary" to="/login">Login</Link>
            <Link className="btn btn-primary ml-5" to="/register">Register</Link>

        </div>
    );
};

export default Landing;