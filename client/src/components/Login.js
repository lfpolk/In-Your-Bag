import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import InnerHeader from "./layouts/InnerHeader";

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const { username, password } = inputs;

    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

    const body = { username, password };

            const response = await fetch("/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            
            const parseRes = await response.json();

            if (parseRes.token) {
                toast.success("Logged in as " + username)
            }
            else {
                setAuth(false);
                toast.error(parseRes);
            }

            localStorage.setItem("token", parseRes.token);

            setAuth(true);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        
        <Fragment>
        <InnerHeader/> 
            <h1 className="text-center my-5">
                Login
            </h1>
            <form onSubmit={onSubmitForm}>
            <input
                    className="form-control my-3" 
                    type="text" 
                    name="username" 
                    placeholder="username" 
                    value={username} 
                    onChange={e => onChange(e)}
                />
            <input 
                    className="form-control my-3" 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={password}
                    onChange={e => onChange(e)}
                />

            <button className="btn-success btn-block">Submit</button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
    );
};

export default Login;