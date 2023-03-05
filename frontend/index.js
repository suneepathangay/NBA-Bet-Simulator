import React, { useState } from 'react'

import Link from 'next/link'
import Menu from '../component/Menu'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'



function Index() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState(false)

  const changeEmail=()=>{
    setEmail(event.target.value)
    console.log(email)
  }
  const changePassword=()=>{
    setPassword(event.target.value)
    console.log(password)
  }

  const login= async()=>{
    try{
   const result=await  signInWithEmailAndPassword(auth,email,password)
    }catch(error){
      console.log("eerro")
      setError(true)
      
    }
  }

  






  return (
  <div className='h-screen bg-black'>
    <div>
      <div className='flex flex-row place-content-between'>
      <h1 className='text-orange-500 font-bold'>Mills BasketBet</h1>
      <Link href='/pay'>
      <h2 className='text-orange-500 font-bold '>My Balance</h2>
      </Link>
      </div>
      <center className='justify-center mt-48'>
        <div className='text-orange-500 font-bold text-xl' >MillsBasketBet</div>
        
        
        <div className='flex flex-col items-center'>
          <input name="email address" className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" id="username"   type="text" placeholder='@northeastern.edu' onChange={changeEmail} />
          <input name="email address" className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" id="username"   type="text" placeholder='password' onChange={changePassword} />
          <div className='mt-5'>
          
          <button onClick={login} className=" py-2 px-4 rounded-md bg-orange-500 text-white w-24 hover:bg-orange-200 ">Submit</button>
          
          </div>
          {error===true?<div className='text-orange-500 font-bold'>Incorrect username or password</div>:<div></div>}

          <div className='text-orange-500 mt-5 font-bold'>Not a user?</div>
          <Link href='/signup'>
          <button className="mt-5 py-2 px-4 rounded-md bg-orange-500 text-white w-24 hover:bg-orange-200 ">Sign Up</button>
          </Link>
        </div>

      </center>
    </div>
  </div>
  )
}

export default Index