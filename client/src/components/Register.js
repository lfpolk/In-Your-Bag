import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        name: ""
    })

    const {username, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {username, password, name};

            const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            }
        );
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Registered successfully");
            }
            else {
                setAuth(false);
                toast.error(parseRes);
            }
            
            

           


        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">
                Register
            </h1>
            <p>Fill in the following to create an account</p>
            <form onSubmit={onSubmitForm}>
                <input 
                    className="form-control my-3" 
                    type="username" 
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
                <input 
                    className="form-control my-3" 
                    type="text" 
                    name="name" 
                    placeholder="name" 
                    value={name} 
                    onChange={e => onChange(e)}
                />
                <button className="btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Login</Link>



        </Fragment>
    );
};

export default Register;