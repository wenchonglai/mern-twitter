import React from 'react';
import {Link} from "react-router-dom";

export default function NavBar({loggedIn, logout}){
  function logoutUser(e){
    e.preventDefault();
    logout();
  }

  function getLinks(){
    return loggedIn ?
    ( <div>
        <Link to='/tweets'>All Tweets</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/new_tweet'>Write a Tweet</Link>
        <button onClick={logoutUser}>Logout</button>
      </div>
    ) : (
      <div>
        <Link to ="/signup">Signup</Link>
        &nbsp;
        <Link to ="/login">Login</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Chirper</h1>
      {getLinks()}
    </div>
  )
}