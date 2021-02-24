import React, {Fragment, useState, useEffect} from "react";

import AddDisc from "./bag/AddDisc";
import ShowDiscs from "./bag/ShowDiscs";
import InnerHeader from "./../layouts/InnerHeader";

const Dashboard = ({setAuth}) => {


    const [allDiscs, setAllDiscs] = useState([]);
    const [name, setName] = useState("");
    const [discsChange, setDiscsChange] = useState(false);

    const getProfile = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard/", {
            method: "GET",
            headers: { token: localStorage.token }
        }
            );

        const parseRes = await response.json();
        
        setAllDiscs(parseRes);
        console.log(parseRes);
        setName(parseRes[0].user_name);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getProfile();
        setDiscsChange(false);
    },[discsChange]);

    return (
        <Fragment>
            <InnerHeader setAuth={setAuth}/> 

            <div id="bagOwner" className="d-flex mt-5 justify-content-around">
            <h1>
                {name}'s bag
            </h1>

            </div>

            <div>

             <ShowDiscs allDiscs={allDiscs} setDiscsChange={setDiscsChange}/>
             <AddDisc setDiscsChange={setDiscsChange}/>
           
            </div>


        </Fragment>
    );
};

export default Dashboard;