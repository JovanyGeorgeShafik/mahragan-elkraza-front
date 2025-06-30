"use client";
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Design({design}:{design:DesignSchema}) {
       const [jwt,setJWT]=useState<string>("")
       const [role,setRole]=useState<string>("")
       const [message,setMessage]=useState<string>("")
         useEffect(()=>{
          axios.get("https://mahragan-elkraza-jovanygeorgeshafik5590-ldb3030b.leapcell.dev/api/jwt").then(res=>{setJWT(res.data.jwt)
            ;
            if(res.data.jwt){
               axios.get("http://localhost:3000/role",{
              headers:{
                "Authorization":`Bearer ${res.data.jwt}`
              }
             }).then(res=>  {setRole(res.data.role)})
            }
          })
                   
    },[])
  return (
    <article className="bg-gradient-to-bl from-teal-400 p-2 rounded-2xl to-blue-500 shadow">
        {
    message&&
  <h3 className="text-center font-bold text-2xl text-white">{message}</h3>
  }
 <Image width={100000} height={100000} className='w-full' src={`http://localhost:3000/${design['image_name']}`} alt={design['name']}>
 </Image> 
 <h3 className="text-white font-bold text-2xl">{design['name']}</h3>
  <p className="text-gray-200">{design['description']}</p>
  <p className="text-gray-200">الرسام: {design['author']}</p>
 {
  jwt
&&
 <>
 {
  role=="admin"
  &&
  <><button onClick={(e)=>{e.preventDefault(),axios.delete(`http://localhost:3000/${design.id}`,{
  headers:{
    
                "Authorization":`Bearer ${jwt}`
              }
            }).then(()=>window.location.reload())}} className='bg-red-500 text-white font-bold p-2 rounded-2xl'>حذف</button>
    <Link className='bg-blue-300 m-2 text-white font-bold p-2 rounded-2xl'  href={`${design.id}/edit`}>عدل</Link>
    </>
 } 
 <button onClick={(e)=>{e.preventDefault(); axios.put(`http://localhost:3000/vote/${design.id}`,null,{
     headers:{
        
        "Authorization":`Bearer ${jwt}`
      }
 }).then(()=>setMessage("تم التصويت")).catch(()=>setMessage("في مشكلة عند عمل تصويت"))}} className='bg-blue-300 m-2 text-white font-bold p-2 rounded-2xl' >صوت</button>
<p className='text-white font-bold '>التصويتات: {design.votes}</p>
</>
 }
</article>

  )
}

export default Design