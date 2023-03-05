import React, { useEffect,useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import axios from 'axios'

function pay() {

  //check if its a user betting
  onAuthStateChanged(auth,(user)=>{
    const uid=user.uid
    //requestPayout(uid)


})

  async function requestPayout(uid){
    const result=await axios.request('http://127.0.0.1:5000/get',
    {
    params: {
      uid:uid
    }
  }
    )


  }

  const[display,setDisplay]=useState(0)

  useEffect(()=>{
    //setDisplay(requestPayout())
  })

  


  return (
    <div className='h-screen bg-black'>
    <div>
      <h1 className='text-orange-500 font-bold'>Mills BasketBet</h1>
      <center className='justify-center mt-48'>
        
        <div className='flex flex-col items-center'>
         <text className='text-orange-500 font-bold'>Account Balance</text>
         <text className='text-orange-500 font-bold mt-4'>{display}</text>
        </div>

       

      </center>
    </div>
  </div>

  
)}

export default pay