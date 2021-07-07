import React, {Fragment, useState, useEffect} from "react";
import { toast } from "react-toastify";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import AddDisc from "./bag/AddDisc";
import ShowDiscs from "./bag/ShowDiscs";
import InnerHeader from "./../layouts/InnerHeader";

const Dashboard = ({setAuth}) => {

    var configLink = process.env.NODE_ENV === "production" ? "https://in-your-bag.herokuapp.com/viewbag/" : "http://localhost:5000/viewbag/"

    const [allDiscs, setAllDiscs] = useState([]);
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [discsChange, setDiscsChange] = useState(false);

    const getProfile = async () => {
        try {
            const response = await fetch("/dashboard/", {
            method: "GET",
            headers: { token: localStorage.token }
        }
            );

        const parseRes = await response.json();
        
        setAllDiscs(parseRes);
        console.log(parseRes);
        setName(parseRes[0].user_name);
        setUserName(parseRes[0].user_username);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getProfile();
        setDiscsChange(false);
    },[discsChange]);

    function copyLink() {
        toast.success("Link to bag copied to clipboard");
    }

    return (
        <Fragment>
            <InnerHeader setAuth={setAuth}/> 

            <div id="bagOwner" className="d-flex mt-5 justify-content-around">
            <h1>
                {name}'s bag
            </h1>

            <CopyToClipboard text={configLink + username}>
                <button onClick={copyLink} id="shareButton" className="btn btn-success">Share Bag</button>
            </CopyToClipboard>

            </div>

            <div>

             <ShowDiscs allDiscs={allDiscs} setDiscsChange={setDiscsChange}/>
             <AddDisc setDiscsChange={setDiscsChange}/>
           
            </div>


        </Fragment>
    );
};

export default Dashboard;