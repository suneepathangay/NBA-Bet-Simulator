import React, { useState,useEffect } from 'react'

import Link from 'next/link'
import Menu from '../components/Menu'

import {auth,provider} from '../firebase'
import { signInWithPopup ,onAuthStateChanged} from 'firebase/auth'





function Index() {
 
  const[email,setEmail]=useState("")
  const[value,setValue]=useState("")
  const[uid,setUid]=useState("")
  const[register,setRegister]=useState(false)


  




  function logOut(){
    auth.signOut().then(() => {
      
      console.log("User signed out successfully");
    }).catch((error) => {
      
      console.error("Error signing out:", error);
    });
  }

  const handleClick=()=>{
    try{
    signInWithPopup(auth,provider).then((data)=>{
      setEmail(data.user.email)
     
      localStorage.setItem("email",data.user.email)
      console.log(email)
      console.log("success")
      

    })
  }catch(error){
    console.log(error)
  }
  }

  useEffect(() => {
    setValue(localStorage.getItem("email"))
    console.log(register)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
        console.log(uid)
        console.log(user.email)
        setRegister(true)
      } else {
        console.log("no uid")
      }
    });



    
  })
  const[error,seterror]=useState(false)
  const setError=()=>{
    if(register==false){
      seterror(true)
    }
  }



  

  

  

  






  return (
    <div class="h-screen bg-black">
   
        <div class="flex items-row bg-gray-800">
        <header class="flex items-row bg-gray-800">
          <h1 class="text-blue-700 font-bold text-2xl">Basket</h1>
          <h2 class="text-white font-bold text-2xl">Bet</h2>
          
        </header>
        <div class="flex items-end flex-grow justify-end"> 
          <button onClick={logOut} class=" mb-2 py-2 px-4 rounded-md bg-blue-700 text-white w-24 hover:bg-blue-200 font-bold">LogOut</button>
        </div>
        
        </div>

       
      
  
      <center class="justify-center mt-48">
        <section>
          <h1 class="flex flex-col items-center">
            <div class="flex items-row">
              <p class="text-blue-700 font-bold text-2xl">Basket</p>
              <p class="text-white font-bold text-2xl">Bet</p>
            </div>
          </h1>
          <header class="flex flex-col items-center">
            <div class="flex items-row">
              <p class="text-white pt-3 font-bold text-xl mr-2">Gamble</p>
              <p class="text-blue-700 pt-3 font-bold text-xl mr-2">On Basketball</p>
              <p class="text-white pt-3 font-bold text-xl mr-2">Without</p>
              <p class="text-blue-700 pt-3 font-bold text-xl mr-2">The Losses</p>
            </div>
            <p class="text-gray-500 pt-2 font-bold">
              BasketBet allows you to bet on real-time NBA games without real money.
            </p>
            <p class="text-gray-500 pt-2 font-bold">
              By allowing you to do this, you can avoid developing a gambling addiction or possibly treat a current one.
            </p>
          </header>
  
          <div class="flex flex-col items-center">
            <p class="text-blue-700 pt-3 font-bold text-2xl">Let's Start</p>
            <p class="mt-5 text-blue-700 font-bold text-xl"> Google Login</p>
            
            <div class="mt-5">
              <button onClick={handleClick} class="py-2 px-4 rounded-md bg-blue-700 text-white w-24 hover:bg-blue-200 font-bold">Login</button>
              
              
              
              
            </div>
            
            {register==false?
            <button onClick={setError} class="py-2 px-4 mt-3 mb-auto rounded-md bg-blue-700 text-white w-24 hover:bg-blue-200 font-bold">Home</button>:
            <Link href="/dash">
            <button class="py-2 px-4 mt-3 mb-auto rounded-md bg-blue-700 text-white w-24 hover:bg-blue-200 font-bold">Home</button>
            </Link>
            
          }
          <text className="text-blue-700 font-bold text-2xl mt-3">Not a User?</text>
          <Link href="/signup">
          <button class="py-2 px-4 mt-3 mb-auto rounded-md bg-blue-700 text-white w-24 hover:bg-blue-200 font-bold">Sign Up</button>
          </Link>
          </div>
        </section>
      </center>
  
      <footer class="bg-gray-800 text-white text-center py-3 mt-60">
        <p>&copy; Developed By Suneet Pathangay</p>
      </footer>
    </div>
    
  
  
  )
}

export default Index