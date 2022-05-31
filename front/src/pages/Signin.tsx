import React from "react";
import {Link} from 'react-router-dom'

//components
import ButtonForm from "../components/ButtonForm";
//images
import GroupoLogoWhite from "../assets/icon-left-font-monochrome-white.svg";

export default function Signin() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border bg-zinc-900 w-3/4 lg:w-1/3 rounded-lg shadow-xl p-10 flex flex-col items-center">
        <img 
        className="h-10"
        src={GroupoLogoWhite} alt="Logo Groupomania" />
        <div className="mt-4 w-4/12 h-px bg-rose-500"></div>
        <p className="mt-2 text-xs text-white text-center"><span className="text-rose-500 font-medium">Groupomania</span> is the most famous and easiest social network for enterprise. Try it <Link to='/register'><span className="text-rose-500 hover:text-rose-300 font-medium">now</span></Link></p>
        <form className="mt-4 w-full flex flex-col space-y-4">
          <input
            className="text-xs p-3 rounded outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="your email"
          />
          <input
            className="text-xs p-3 rounded outline-none"
            type="password"
            id="password"
            name="password"
            placeholder="your password"
          />
          <ButtonForm value="Sign-In" type="submit" action="signIn"/>
          <ButtonForm value="Register here" type="classic" action="newRegister"/>
        </form>
      </div>
    </div>
  );
}
