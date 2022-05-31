import React from "react";

//components
import ButtonForm from "../components/ButtonForm";
//images
import GroupoLogoWhite from "../assets/icon-left-font-monochrome-white.svg";

export default function Signup() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border bg-zinc-900 w-3/4 lg:w-1/3 rounded-lg shadow-xl p-10 flex flex-col items-center">
        <img 
        className="h-10"
        src={GroupoLogoWhite} alt="Logo Groupomania" />
        <div className="mt-4 w-4/12 h-px bg-rose-500"></div>
        <p className="mt-2 text-xs text-white text-center">Start now and share your thought with your workmate !</p>
        <form className="mt-4 w-full flex flex-col space-y-4">
          <input
            className="text-xs p-3 rounded outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="email"
          />
          <input
            className="text-xs p-3 rounded outline-none"
            type="text"
            id="firstname"
            name="firstname"
            placeholder="firstname"
          />
          <input
            className="text-xs p-3 rounded outline-none"
            type="text"
            id="lastname"
            name="lastname"
            placeholder="lastname"
          />
          <input
            className="text-xs p-3 rounded outline-none"
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
          <ButtonForm value="Register" type="submit" action="signUp"/>
          <ButtonForm value="Sign-In" type="classic" action="goHome"/>
        </form>
      </div>
    </div>
  );
}
