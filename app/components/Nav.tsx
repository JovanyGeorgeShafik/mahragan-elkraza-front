"use client";
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Nav() {
            const [jwt,setJWT]=useState<string>("")
         useEffect(()=>{
          axios.get("https://mahragan.leapcell.app/back/jwt").then(res=>setJWT(res.data.jwt))
    },[])
  return (
   <nav className='bg-gradient-to-bl from-teal-400 text-white to-blue-500 flex justify-between items-center p-3'>
    <h1>مهرجان الكرازة</h1>
    <ul className='flex gap-2'>
      
        <li>
            <Link href={"/"} className='bg-blue-400 text-white p-2 rounded-2xl'>الرئيسية</Link>
        </li>
      { !jwt&&( <>
      <li>
            <Link href={"/signup"} className='bg-blue-400 text-white p-2 rounded-2xl'>إنشاء حساب</Link>
        </li>
        <li>
            <Link href={"/login"} className='bg-blue-400 text-white p-2 rounded-2xl'>تسجيل دخول</Link>
        </li></>)}
       
      { jwt&&( 
      <li>
            <button onClick={(e)=>{e.preventDefault();axios.post("https://mahragan.leapcell.app/back/logout");window.location.reload()}}  className='bg-blue-400 text-white p-2 my-[-10px] rounded-2xl'>تسجيل خروج</button>
        </li>
      )}
    </ul>
   </nav>
  )
}

export default Nav