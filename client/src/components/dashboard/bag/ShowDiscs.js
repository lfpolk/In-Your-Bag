import React, { Fragment, useState, useEffect } from "react";

const ShowDiscs = ({ allDiscs, setDiscsChange }) => {

    //console.log(allDiscs);
    const [bag, setBag] = useState([]);


    // remove a disc
    async function removeDisc(id, plastic) {
        try {
            if (plastic === ''){
                plastic = 'empty';
            }
            var link = ('http://localhost:3000/dashboard/bag/' + id + '/' + plastic);

            const res = await fetch(link, {
                method: "DELETE",
                headers: {token : localStorage.token}
            });

            setDiscsChange(true);


        } catch (err) {
            console.error.apply(err.message);
        }
    }

    useEffect(() => {
        setBag(allDiscs);
    }, [allDiscs]);

    console.log("bag:" + bag)


    return <Fragment>
        
       
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
                <td>
                    <button className="btn btn-danger" onClick={() => removeDisc(disc.disc_id, disc.plastic)}>Remove from bag</button>
                </td> 
            </tr>  
              ))
          }   
    </tbody>
  </table>
  </Fragment>;
};

export default ShowDiscs;