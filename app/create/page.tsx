"use client";
import axios from 'axios'
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react'

function Create() {
  const [message, setMessage] = useState("");
  const [jwt, setJWT] = useState<string>("")
  useEffect(() => {
    axios.get("https://mahragan.leapcell.app/back/jwt").then(res => {
      if (!res.data.jwt) {
        window.location.href = "/login"
      } setJWT(res.data.jwt)
        axios.get((process.env.API??"https://mahragan-elkraza-jovanygeorgeshafik5590-ldb3030b.leapcell.dev/")+"role",{
              headers:{
                "Authorization":`Bearer ${res.data.jwt}`
              }
             }).then(res => {
        if (!res.data.role || res.data.role != "admin") {
          window.location.href = "/"
        }
      })
    })
  }, [])

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    axios.post(process.env.API??"https://mahragan-elkraza-jovanygeorgeshafik5590-ldb3030b.leapcell.dev/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${jwt}`
      }
    }).then(() => setMessage("تمام!")).catch(() => setMessage("في مشكلة"));

  }
  return (
    <form className="flex flex-col gap-2" onSubmit={submit} encType="multipart/form-data">
      <h2 className="text-center font-bold text-3xl bg-gradient-to-bl from-teal-400 to-blue-500 bg-clip-text fill-transparent text-transparent">أضف عمل</h2>
      {
        message &&
        <h3 className="text-center font-bold text-2xl bg-gradient-to-bl from-teal-400 to-blue-500 bg-clip-text fill-transparent text-transparent">{message}</h3>
      }

      <div className="flex justify-between mx-2 items-center">
        <label htmlFor="name">اسم العمل</label>
        <input type="text" name="name" className="rounded-2xl p-2 outline-0 border border-black" />
      </div>
      <div className="flex justify-between mx-2 items-center">
        <label htmlFor="author">اسم الفنان</label>
        <input type="text" name="author" className="rounded-2xl p-2 outline-0 border border-black" />
      </div>
      <div className="flex justify-between mx-2 items-center">
        <label htmlFor="description">وصف العمل</label>
        <textarea name="description" className="rounded-2xl p-2 outline-0 border border-black" ></textarea>
      </div>
      <div className="flex justify-between mx-2 items-center">
        <label htmlFor="image">الصورة</label>
        <input accept="image/*" type="file" name="image" className="rounded-2xl p-2 outline-0 bg-gradient-to-bl from-teal-400 text-white to-blue-500  " />
      </div>
      <button type="submit" className=" bg-gradient-to-bl from-teal-400 text-white font-bold to-blue-500 p-2 rounded-2xl w-fit mx-auto">أضف</button>

      <Link className='bg-gradient-to-bl from-teal-400  to-blue-500 m-2 mx-auto text-white font-bold p-2 rounded-2xl' href={`/`}>الرئيسية</Link>
    </form>

  )
}

export default Create