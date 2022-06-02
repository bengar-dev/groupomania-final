import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//assets
import GroupoLogoBlack from "../public/assets/icon-left-font-monochrome-black.svg";
//components
import { ButtonForm } from "../components/Button";
//services
import { getRegister } from "../services/formServices";

const Register: NextPage = () => {

  const router = useRouter()
    
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const getSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    async function awaitRegister() {
        const result = await getRegister(form.email, form.password, form.firstname, form.lastname)
        if(!result) return console.log('erreur')
        else {
            setTimeout(() => {
              router.push('/')
            }, 1000)
            setForm({
                firstname: "",
                lastname: "",
                email: "",
                password: ""
            })
        }
    }

    if(form.firstname && form.lastname && form.email && form.password) awaitRegister()
    else console.log('Erreur formulaire')

  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.id === "firstname") setForm({...form, firstname: e.target.value})
      else if(e.target.id === "lastname") setForm({...form, lastname: e.target.value})
      else if(e.target.id === "email") setForm({...form, email: e.target.value})
      else if(e.target.id === "password") setForm({...form, password: e.target.value})
  }

  return (
    <div className="home-page">
      <Head>
        <title>Groupomania - Get in touch with your workmate</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Groupomania - Social network for enterprise - Sign-In now!"
        />
      </Head>
      <div className="home-container">
        <Image src={GroupoLogoBlack} width="250" alt="Groupomania logo" />
        <p>
          Start the <span className="highlight">Groupomania</span>'s experience
          now ! Enter your informations and share your tought
        </p>
        <form>
          <input
            value={form.firstname}
            onChange={(e) => handleInput(e)}
            type="text"
            id="firstname"
            name="firstname"
            placeholder="firstname"
          />
          <input
            value={form.lastname}
            onChange={(e) => handleInput(e)}
            type="text"
            id="lastname"
            name="lastname"
            placeholder="lastname"
          />
          <input 
            value={form.email}
            onChange={(e) => handleInput(e)}
            type="email" id="email" name="email" placeholder="email" />
          <input
            value={form.password}
            onChange={(e) => handleInput(e)}
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
          <ButtonForm type="submit" value="Sign-Up" func={getSignUp} />
        </form>
        <p>
          Already register ?{" "}
          <Link href="/">
            <a>Sign-In</a>
          </Link>{" "}
          now !
        </p>
      </div>
    </div>
  );
};

export default Register;
