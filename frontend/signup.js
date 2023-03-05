import React from 'react'
import Link from 'next/link'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'


function Signup() {

  //links user id to bank account object class

  class BankAccount{
    constructor(balance){
      this.balance=balance
    }
    add(amount){
      this.balance=this.balance+amount
    }
    withdraw(amount){
      if(amount<this.balance){
        this.balance=this.balance-amount
      }
      this.balance=0
    }
  }

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const createUser=async()=>{
    try{
    const userCredential=await createUserWithEmailAndPassword(auth,email,password)
    const user=userCredential.user
    console.log(user.uid)
    console.log("succes")
    }catch(err){
      console.log(err)
    }
  }

  const changeEmail=(event)=>{
    setEmail(event.target.value)
    console.log(email)
  }
  const changePassword=(event)=>{
    setPassword(event.target.value)
    console.log(password)
  }
  
  







  return (
    <div className='h-screen bg-black'>
      <Link href='/'>
      <h1 className='text-orange-500 font-bold'>Mills BasketBet</h1>
      </Link>

      <div className='flex flex-col items-center'>
          <p className='text-orange-500 font-bold mb-1'>Sign Up</p>
          <p className='text-orange-500 font-bold mt-36'>Email </p>
          <input name="email address" className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" id="username"   type="text" placeholder='@northeastern.edu' onChange={changeEmail} />
          <p className='text-orange-500 font-bold mt-4'>Password</p>
          <input name="email address" className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" id="username"   type="text" placeholder='@northeastern.edu' onChange={changePassword} />
          <Link href='/dash'>
          <button className="mt-5 py-2 px-4 rounded-md bg-orange-500 text-white w-24 hover:bg-orange-200" onClick={createUser}>Submit</button>
          </Link>
      </div>


    </div>
  )
}

export default Signup