import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] md:text-[70px] text-[30px] flex items-center justify-center text-white flex-col gap-[20px]'>
            <span>404 Page Not Found</span>
            <button
                className='bg-white px-[20px] py-[10px] rounded-xl text-[18px] text-black cursor-pointer'
                onClick={() => navigate("/login")}
            >
                Go to Login
            </button>
        </div>
    )
}

export default NotFound
