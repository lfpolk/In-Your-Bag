import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import '../../App.css';

const InnerHeader = ( { setAuth }) => {

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);

        toast.success("Logged out");
    }

return (
    <Fragment>
        <div class="inner-header">
            <a href="/login">
            <img id="logo"></img>
            <div class="logoText">
                <h1>IN<span>YOURBAG</span></h1>
            </div>
            </a>
{setAuth && 
            <button onClick={e => logout(e)} href="" class="navigation_icons">
                <i class="fa fa-sign-out"></i>
                </button>
}
            <div class="navigation">
                <a href="/login" class="navigation_icons">
                <i class="fa fa-user"></i>
                </a>
                <a href="/chatroom" class="navigation_icons">
                <i class="fa fa-commenting"></i>
                </a>
                

            </div>
        </div>
        </Fragment>
    );
};

export default InnerHeader;