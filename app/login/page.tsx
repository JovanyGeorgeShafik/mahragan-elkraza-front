"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react'

function Login() {
    const [message,setMessage]=useState("");
    
  useEffect(()=>{
          axios.get("https://mahragan.leapcell.app/back/jwt").then(res=>  {  if(res.data.jwt){
          window.location.href="/"
        }})
          
        },[])
    function submit(e:FormEvent<HTMLFormElement>){
      e.preventDefault()
        
        const formData=new FormData(e.currentTarget)
      axios.post((process.env.API??"https://mahragan-elkraza-jovanygeorgeshafik5590-ldb3030b.leapcell.dev/")+"login",formData).then(resp=>{setMessage("تمام!");axios.post("https://mahragan.leapcell.app/back/jwt",{jwt:resp.data.jwt}).then(res=>res)}).catch(()=>setMessage("في مشكلة"));
       
   
    }
  return (
   <form className="flex flex-col gap-2" onSubmit={submit}>
  <h2 className="text-center font-bold text-3xl bg-gradient-to-bl from-teal-400 to-blue-500 bg-clip-text fill-transparent text-transparent">تسجيل دخول</h2>
  {
    message&&
  <h3 className="text-center font-bold text-2xl bg-gradient-to-bl from-teal-400 to-blue-500 bg-clip-text fill-transparent text-transparent">{message}</h3>
  }

  <div className="flex justify-between mx-2 items-center">
    <label htmlFor="email">البريد الإلكتروني</label>
    <input type="email"  name="email" className="rounded-2xl p-2 outline-0 border border-black" />
  </div>
  
  <div className="flex justify-between mx-2 items-center">
    <label htmlFor="password">كلمة المرور</label>
    <input type="password"  name="password" className="rounded-2xl p-2 outline-0 border border-black" />
  </div>
  

  <button type="submit" className=" bg-gradient-to-bl from-teal-400 text-white font-bold to-blue-500 p-2 rounded-2xl w-fit mx-auto">تسجيل دخول</button>

 <Link className='bg-gradient-to-bl from-teal-400  to-blue-500 m-2 mx-auto text-white font-bold p-2 rounded-2xl'  href={`/`}>الرئيسية</Link>
</form>
  )
}

export default Login