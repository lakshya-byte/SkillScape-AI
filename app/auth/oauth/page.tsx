'use client'
import React from 'react'

const page = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:8000/github/oauth";
    };    
    return (
        <div>
            <button
                onClick={handleLogin}
                className='cursor-pointer text-white no-underline border-2 m-10 border-white px-4 py-2'>
                Connect to Github
            </button>
        </div>
    )
}

export default page
