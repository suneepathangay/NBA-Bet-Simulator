import React, { useState } from 'react'

import Link from 'next/link'
import Menu from '../component/Menu'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import logo from './logo/nba-logo.jpeg'




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

  function Footer(){

    return(
      <footer className="bg-gray-800 py-4 px-4 sm:px-6 lg:px-8 mt-auto mb-0">
    <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="#" className="text-gray-400 hover:text-gray-100 mr-4">
            About
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-100 mr-4">
            NBA
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-100 mr-4">
            Contact
          </a>
          <a hred="#" className="text-gray-400 hover:text-gray-100 mr-4">
          Developed By Suneet Pathangay and Shoumik Majumdar
          </a>
        </div>
        
      </div>
    </div>
  </footer>
    )
    
  }

  






  return (
  <div className='h-screen bg-black'>
    <div>
      <div className='flex flex-row place-content-between'>
      <header className="flex items-row">
        <h1 className='text-blue-700 font-bold text-2xl'>Basket</h1>
        <h2 className='text-white font-bold text-2xl'>Bet</h2>
      
      </header>
      </div>
      <center className='justify-center mt-48'>

        
        <body>
          <section>
          <h1 className="flex flex-col items-center">
            <div className='flex items-row'>
              <p className='text-blue-700 font-bold text-2xl'>Basket</p>
              <p className="text-white font-bold text-2xl">Bet</p>
            </div>
          </h1>
          <header className="flex flex-col items-center">
            <div className="flex items-row">
            <p className='text-white pt-3 font-bold text-xl mr-2'>Gamble</p>
            <p className='text-blue-700 pt-3 font-bold text-xl mr-2'> On Basketball</p>
            
            <p className='text-white pt-3 font-bold text-xl mr-2'>Without</p>
            <p className='text-blue-700 pt-3 font-bold text-xl mr-2'>The Losses</p>
            
            </div>
            <p className="text-gray-500 pt-2 font-bold">BasketBet allows you to bet on real time NBA games without real money. </p>
            <p className="text-gray-500 pt-2 font-bold ">By allowing you to do this you can avoid an devloping a gambling addiction or possible treat a current one </p>
          </header>
          
          
        

            <div className='flex flex-col items-center'>
              <p className='text-blue-700 pt-3 font-bold text-2xl'>Lets Start</p>
              <p className="mt-5 text-blue-700 font-bold text-xl">Email</p>
              <input name="email address" className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" id="username"   type="text" placeholder='@northeastern.edu' onChange={changeEmail} />
              <p className="mt-5 text-blue-700 font-bold text-xl">Password</p>
              <input name="email address" className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" id="username"   type="text" placeholder='password' onChange={changePassword} />
            <div className='mt-5'>
            
            <button onClick={login} className=" py-2 px-4 rounded-md bg-blue-700 text-white w-24 hover:bg-blue-200 font-bold">Login</button>
          
          </div>
          {error===true?<div className='text-blue-700 font-bold'>Incorrect username or password</div>:<div></div>}
          
          <div className="bg-black flex flex-row mr-0">
          <div className="flex flex-col">
          <div className='text-blue-700 mt-5 font-bold'>Not a user?</div>
          <Link href='/signup'>
          <button className="mt-5 py-2 px-4 font-bold rounded-md bg-blue-700 text-white w-24 hover:bg-blue-200 mb-36">Sign Up</button>
          </Link>
          </div>
          </div>
          </div>
          </section>
          
          
          
          <Footer/>
        
        </body>

        

        

      </center>
    </div>


    

  </div>
  )
}

export default Index