import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { ButtonForm } from '../components/Button'

import GroupoLogoBlack from '../public/assets/icon-left-font-monochrome-black.svg'

const Home: NextPage = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <Image
        src={GroupoLogoBlack}
        width="250"
        />
        <p>
          Want to share your thought with your workmate ? Try <span className='highlight'>Groupomania</span> network social !
        </p>
        <form>
          <input type="email" id="email" name="email" placeholder="email" />
          <input type="password" id="password" name="password" placeholder="password" />
          <ButtonForm 
          value="Sign-In"/>
        </form>
        <p>
          Not register yet ? Create an <span className="highlight">account</span> now !
        </p>
      </div>
    </div>
  )
}

export default Home
