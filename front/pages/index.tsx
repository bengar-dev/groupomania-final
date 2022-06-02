import type { NextPage } from 'next'
import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
//assets
import GroupoLogoBlack from '../public/assets/icon-left-font-monochrome-black.svg'
//components
import { ButtonForm } from '../components/Button'
//services
import { getSignIn } from '../services/formServices'


const Home: NextPage = () => {

  const router = useRouter()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const SignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    async function awaitSignIn(){
      const response = await getSignIn(form.email, form.password)
      if(response.status === 401) console.log(response.data)
      else {
        localStorage.setItem('token', JSON.stringify(response))
        router.push('/forum')
      }     
    }

    if(form.email && form.password) awaitSignIn()
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.id === "email") setForm({...form, email: e.target.value})
    else if (e.target.id === "password") setForm({...form, password: e.target.value})
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
        <Image
        src={GroupoLogoBlack}
        width="250"
        alt="Groupomania logo"
        />
        <p>
          Want to share your thought with your workmate ? Try <span className='highlight'>Groupomania</span> network social !
        </p>
        <form>
          <input 
          value={form.email}
          onChange={(e) => handleInput(e)}
          type="email" id="email" name="email" placeholder="email" />
          <input 
          value={form.password}
          onChange={(e) => handleInput(e)}
          type="password" id="password" name="password" placeholder="password" />
          <ButtonForm
          type="submit" 
          value="Sign-In"
          func={SignIn}/>
        </form>
        <p>
          Not register yet ? <Link href="/register"><a>Create an account now</a></Link> !
        </p>
      </div>
    </div>
  )
}

export default Home
