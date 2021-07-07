import React, {Fragment, useState, useEffect } from 'react';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

// Components

import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Header from "./components/layouts/Header";
import Chatroom from "./components/chatroom/Chatroom";
import ViewBag from './components/viewbag/ViewBag';


toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth(){
    try {
      
      const response = await fetch("/auth/is-verify", {
      method: "GET",
      headers: {token : localStorage.token}
    }
      );

      const parseRes = await response.json()
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <Fragment>
      <Header />
      <Router>
        <div className="container">
          <Switch>
          <Route 
            exact 
            path="/" 
            render={props => 
              !isAuthenticated ? (
                <Landing {...props}  />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
            />

            <Route 
            exact 
            path="/chatroom" 
            render={props => 

              <Chatroom {...props} setAuth={setAuth} />

            }
            />
            
            <Route 
            exact 
            path="/login" 
            render={props => 
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
            />


            <Route 
            exact 
            path="/register" 
            render={props => 
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
            />

            <Route 
            exact 
            path="/dashboard" 
            render={props => 
            isAuthenticated ? (
              <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to ="/login" />
              )
            }
            />
            
            <Route 
            exact 
            path="/viewbag/:user_username" 
            render={props => 
              <ViewBag {...props} setAuth={setAuth} />
            }
            />


          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
