import React from 'react'
import Link from 'next/link'

import { createUserWithEmailAndPassword,signInWithPhoneNumber } from 'firebase/auth'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {auth,provider} from '../firebase'
import { signInWithPopup } from 'firebase/auth'



function Signup() {
  const [value,setValue]=useState('')
  const[email,setEmail]=useState("")
  const[uid,setUid]=useState("")
  const[register,setRegister]=useState(false)

  const handleClick=()=>{
    signInWithPopup(auth,provider).then((data)=>{
      setEmail(data.user.email)
     setUid(data.user.uid)
      localStorage.setItem("email",data.user.email)
      console.log(email)
      writeToDb()
      console.log("success")
      setRegister(true)

    })
  }

  useEffect(() => {
    setValue(localStorage.getItem("email"))
    console.log(email,uid)
    
  })

  const writeToDb=async()=>{
    let obj={
      uid:uid,
      phone:email
    }
    const result=await axios.post('http://127.0.0.1:5000/',obj)
    

  }


  
    


 







  return (
    <div className="h-screen bg-black">
  <header className="flex items-row">
    <Link href="/">
      <div className="flex items-row">
        <h1 className="text-blue-700 font-bold text-2xl">Basket</h1>
        <h2 className="text-white font-bold text-2xl">Bet</h2>
      </div>
    </Link>
  </header>
  <div className="flex flex-col items-center h-full">
    <div className="flex items-row">
      <h1 className="font-bold text-2xl text-blue-700">Let's</h1>
      <h2 className="font-bold text-2xl text-white pl-2">Get</h2>
      <h3 className="font-bold text-2xl text-blue-700 pl-2">Started</h3>
      <h3></h3>
    </div>

    <div className="pt-32 flex flex-col items-center">
      <p className="text-gray-500 font-bold pt-3">No need to enter any information</p>
      <p className="text-gray-500 font-bold pt-3">Just hit the sign in with Google</p>
      <p className="text-gray-500 font-bold pt-3 pb-11">We'll email you when your bet hits</p>

      <button className="bg-blue-700 text-white font-bold text-xl rounded-md p-2" onClick={handleClick}>
        Sign Up With Google
      </button>

      {register === false ? (
        <div className="pt-3 flex flex-col items-center">
          <button className="bg-blue-700 text-white font-bold text-xl rounded-md p-2">Next</button>
        </div>
      ) : (
        <Link href="/dash">
          <div className="pt-3">
            <button className="bg-blue-700 text-white font-bold text-xl rounded-md p-2">Next</button>
          </div>
        </Link>
      )}
    </div>

    <section>{/* Your additional section content */}</section>
  </div>
</div>

   
  )
}

export default Signup