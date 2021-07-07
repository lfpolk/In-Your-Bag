import React, { Fragment, useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import InnerHeader from "./../layouts/InnerHeader";

const ViewBag = () => {

    let { user_username } = useParams();
    const [bag, setBag] = useState([]);
    const [allDiscs, setAllDiscs] = useState([]);
    const [name, setName] = useState("");
    const [bagFound, setBagFound] = useState(false);

    const getProfile = async () => {
        var link = ('/dashboard/viewbag/' + user_username);
        try {
            const response = await fetch(link, {
            method: "GET",
        }
            );

        const parseRes = await response.json();
        setBagFound(true)
        setAllDiscs(parseRes);
        if(parseRes.length > 0){
        console.log(setName(parseRes[0].user_name));
        }
        setName(parseRes[0].user_name);

        } catch (error) {
            console.error('error.message');
        }
    }

    if(!bagFound)
    {
       getProfile()
    }


    useEffect(() => {
        setBag(allDiscs);
    }, [allDiscs]);



    return <Fragment>
        <InnerHeader/> 

    <div id="bagOwner" className="d-flex mt-5 justify-content-around">
    {allDiscs.length !== 0 &&
        <h1>
        {name}'s bag
        </h1>}
    </div>
    {allDiscs.length !== 0 &&
        <table class="table mb-5 mt-5">
    <thead>
      <tr>
        <th>Manufacturer</th>
        <th>Disc</th>
        <th>Plastic</th>
        <th>Type</th>
        <th>Distance</th>
        <th>Stability</th>
      </tr>
    </thead>
    <tbody>
          {bag.length !== 0 && bag[0].disc_id !== null &&
        bag.map(disc => (
            <tr key={disc.disc_id}>
               <td>{disc.manufacturer}</td>
                <td>{disc.mold}</td>
                <td>{disc.plastic}</td>
                <td>{disc.type}</td>
                <td>{disc.distance}'</td>
                <td>{disc.turn + disc.fade}</td>
            </tr>  
              ))
          }   
    </tbody>
  </table>}
  {allDiscs.length === 0 &&
  <h1>No Discs found in this bag</h1>}
  </Fragment>;
};

export default ViewBag;