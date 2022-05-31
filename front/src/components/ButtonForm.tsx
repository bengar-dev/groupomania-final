import React from 'react'
import { useNavigate } from 'react-router-dom'

type ButtonProps = {
    value: string,
    type: string,
    action: string
}

export default function ButtonForm({value, type, action}: ButtonProps) {

    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(action === 'signIn') console.log('LOGIN')
        else if(action === 'signUp') console.log('REGISTER')
        else if(action === 'newRegister') return navigate('/register')
        else if(action === 'goHome') return navigate('/')
    }

    let classButton: string = "transition-all p-2 rounded font-medium "

    if(type === "submit") classButton += "text-xs bg-white hover:bg-emerald-500"
    else if(type === "classic") classButton += "text-xs bg-white hover:bg-black hover:text-white"

  return (
    <button 
    onClick={(e) => handleClick(e)}
    className={classButton}>
        {value}
    </button>
  )
}
