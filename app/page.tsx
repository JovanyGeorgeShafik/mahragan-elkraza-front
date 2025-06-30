"use client";

import {useEffect, useState} from "react";
import Design from "./components/Design";
import axios from "axios";
import Link from "next/link";
export default function Home() {
  const [data,setData]=useState<DesignSchema[]>([])
  const [jwt,setJWT]=useState<string>("")
  const [role,setRole]=useState<string>("")
  useEffect(()=>{
    axios.get(process.env.API??"https://mahragan-elkraza-jovanygeorgeshafik5590-ldb3030b.leapcell.dev/").then(res=>setData(res.data.designs)).catch(err=>err)
    axios.get("https://mahragan.leapcell.app/back/jwt").then(res=>{setJWT(res.data.jwt);if(res.data.jwt){
      
                    axios.get((process.env.API??"https://mahragan-elkraza-jovanygeorgeshafik5590-ldb3030b.leapcell.dev/")+"role",{
              headers:{
                "Authorization":`Bearer ${res.data.jwt}`
              }
             }).then(res=>  {setRole(res.data.role)})
    }}
    
  )
  },[])
  return (
    <>
        {
          (!data||data.length===0)&&(
            <h3 className="text-center font-bold text-2xl bg-gradient-to-bl mx-auto w-fit from-teal-400 to-blue-500 bg-clip-text fill-transparent text-transparent">لا يوجد</h3>
          )
        }
     {
   
         jwt&&role=="admin"&&<Link className='bg-gradient-to-bl from-teal-400 to-blue-500  mx-auto text-white font-bold p-2 rounded-2xl'  href={`create`}>أضف</Link>
  
     }
       <main  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
       {
         data?.map((design:DesignSchema)=><Design key={design.id} design={design}></Design>)
        }
        
        </main>
    </>
 );
}
