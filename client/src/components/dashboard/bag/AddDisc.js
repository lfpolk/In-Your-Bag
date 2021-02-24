import React, { Fragment, useState, useEffect } from "react";
import Select from 'react-select';

const AddDisc = ({ setDiscsChange }) => {

    const [discList, setDiscList] = useState ("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            var plastic = document.getElementById("plasticInput").value.trim();
            var disc_id = selectedValue;


            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);
            
            const body = { disc_id, plastic }
            const response = await fetch("http://localhost:3000/dashboard/bag", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            setDiscsChange(true);
            

        } catch (err) {
            console.error(err.message);
        }
    };

    async function getDiscs() {
        const res = await fetch("http://localhost:3000/dashboard/discs")
    
        const discArray = await res.json();
        setDiscList(discArray);
    }

    useEffect(() => {
        getDiscs();
    }, []);

    var i;
    var options = [];
    var option;
    for (i = 0; i < discList.length; i++){
        option = {
            value: discList[i].disc_id,
            label: discList[i].manufacturer + ' ' + discList[i].mold
        }
        options.push(option);
    }

    const styles = {
        container: base => ({
          ...base,
          flex: 1
        })
    };


    const [selectedValue, setSelectedValue] = useState();
    const handleChange = e => {
        setSelectedValue(e.value);
      }

    return (
    <Fragment>


<p><strong>Add Disc</strong></p>
        <form className="d-flex" onSubmit={onSubmitForm}>
     
        <Select
         id="discInput"
         placeholder={<div>Type to search</div>}
         options={options}
         styles={styles}
         value={options.find(obj => obj.value === selectedValue)}
         onChange={handleChange}
         />
         

        <input 
            type= "text"
            id = "plasticInput"
            placeholder="Plastic (Optional)"
            ></input>
            <button id="addButton" className="btn btn-success">Add Disc</button>
        </form>
        <div class="footer"></div>
    </Fragment>
    );
};

export default AddDisc;