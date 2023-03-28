import React, { useEffect,useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import axios from 'axios'

function pay() {

//Stuff for App

// Work on updating the money in the user database

// work on determining the winner 

// Setup Function to deposit funds every new month

  const[display,setDisplay]=useState(0)

  const[message,setMessage]=useState("")

  
//only makes API call if the user.uid is not not null
  function callRequestBalance(){
    if(uid){
      requestBalance(uid)
    }else{
      setTimeout(callRequestBalance,100)
    }
  }

  function callAddBalance(){
    if(uid){
      addMoney(uid)
    }else{
      setTimeout(callAddBalance,100)
    }
  }
  
  
  let uid=""
    onAuthStateChanged(auth,(user)=>{
      uid=user.uid
      console.log(uid)
    })
  


async function requestBalance(uid) {
  
  const result=await axios.get('http://127.0.0.1:5000/balance',{
    params:{
      id:uid
    }
  })
  
  console.log(result.data[0],uid)
  setDisplay(result.data[0][0])
  console.log(display)
  
}

async function addMoney(){
  const result=await axios.get('http://127.0.0.1:5000/addmoney',{
    params:{
      id:uid
    }
  })
  
  console.log("added money")
  console.log(result.data[0][0])
  setDisplay(result.data[0][0])
}




async function requestPayOut(){

  const result=await axios.get('http://127.0.0.1:5000/outcome',{
    params:{
      id:uid
    }
  })

  setMessage(result.data)

}



  

  useEffect(()=>{
  
  
   callRequestBalance()
  })

  


  return (
    <div className='h-screen bg-black'>
    <div>
      <h1 className='text-orange-500 font-bold'>Mills BasketBet</h1>
      <center className='justify-center mt-48'>
        
        <div className='flex flex-col items-center'>
         <text className='text-orange-500 font-bold'>Account Balance</text>
         <text className='text-orange-500 font-bold mt-4'>{display}</text>
         <div className='pt-3 flex flex-col'>
          <button  className='bg-orange-500 text-black rounded-md p-2' onClick={callAddBalance}>Add Money</button>
          <button  className='bg-orange-500 text-black rounded-md p-2 mt-4' onClick={requestPayOut}>Request Payout</button>
          <text className='text-orange-500'>{message}</text>
         </div>
        </div>

       

      </center>
    </div>
  </div>

  
)}

export default pay