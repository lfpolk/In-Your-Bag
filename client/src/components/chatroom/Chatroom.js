import React, { Fragment } from "react";


import InnerHeader from "./../layouts/InnerHeader";

const Chatroom = ( {setAuth} ) => {
return (
    <Fragment>
        <InnerHeader setAuth={setAuth}/>

<div id="chatMessage"> The Chat room is still to be implemented. Check back soon and be able to chat with other disc golfers and view their bags</div>


    </Fragment>
    );
};

export default Chatroom;