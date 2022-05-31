import React from 'react'
import {Link} from 'react-router-dom'

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="border bg-zinc-900 w-2/3 rounded-lg shadow-xl p-10 flex flex-col items-center">
            <h1 className="text-rose-500 text-6xl font-bold">404</h1>
            <p className="mt-4 text-xs text-zinc-200">Page not found...</p>
            <p className="mt-8 text-sm text-zinc-300 font-medium">The page you are looking for doesn't exist.</p>
            <Link to="/">
            <button className="mt-4 p-2 transition-all bg-zinc-100 hover:bg-zinc-400 rounded-full text-xs">Go back Home</button>
            </Link>
        </div>
    </div>
  )
}
