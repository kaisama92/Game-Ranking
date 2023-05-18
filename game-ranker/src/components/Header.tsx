import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"

function Header(){

  return (
    <div>
      <h1 className="header">GG Rankings</h1>
    </div>
  )
}

export default Header;
