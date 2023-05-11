import React, { useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { homedir } from 'os';

//todo list
//post data to the server
//error handle on the post request
//add conditional Link Part

function dash() {
    let uid=""
    const getUiud=()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              uid = user.uid;
              console.log(uid)
            } else {
              console.log("no uid")
            }
          });
    }
    
    let numGamesToday=0
    
   

    //getting data from our middleware express server
    const getMatchup=async()=>{
      
      const result=await axios.get('http://localhost:3001/data')
      numGamesToday=result.data["scoreboard"]["games"].length
      //console.log(result.data["scoreboard"]["games"])
      return result.data["scoreboard"]["games"]
      
    }


    //index ustate to keep track of the pointer
    const[index,setIndex]=useState(0)
    
    const[homeCity,setHomeCity]=useState("")
    const[awayCity,setAwayCity]=useState("")

    const[homeTeam,setHomeTeam]=useState("")
    const[awayTeam,setAwayTeam]=useState("")

    let gameId=""


    
    


    const next=()=>{
      if(index+1<=numGamesToday-1){
      setIndex(index+1)
      }
      //console.log(index)
      
    }
    
    const back=()=>{
      if(index-1>=0){
        setIndex(index-1)
      }
      //console.log(index)
      

    }

    const[matchup,setMatch]=useState("")
    const getSchedule=async()=>{
      const data=await getMatchup()
     
      setHomeCity(data[index]["homeTeam"]["teamCity"])
      
      setAwayCity(data[index]["awayTeam"]["teamCity"])
      
      setHomeTeam(data[index]["homeTeam"]["teamName"])
      setAwayTeam(data[index]["awayTeam"]["teamName"])
    }

    const getGameId=async()=>{
      const data=await getMatchup()
      gameId=data[index]["gameId"]
      //console.log(gameId)
    }

    const[userTeam,setTeam]=useState("")
    const[betAmount,setBetAmount]=useState(0)


    const setUserTeam=(event)=>{
      setTeam(event.target.value)
    }

    const setUserBet=(event)=>{
      setBetAmount(event.target.value)
    }

    const[homeerror,sethomeError]=useState(false)
    const[awayerror,setAwayError]=useState(false)
    const[betError,setBetError]=useState(false)
    
    const sendData=async()=>{
      let odds=0
     if(betAmount<=0){
        setBetError(true)
      }

      if(userTeam !== homeCity+" " +homeTeam){
        sethomeError(true)
      }
      if(userTeam !== awayCity+" "+awayTeam ){
        setAwayError(true)
        
      }else{

        if(userTeam===homeCity+" "+homeTeam){
          odds=homeTeamOdds
        }
        if(userTeam===awayCity+" "+awayTeam){
          odds=awayTeamOdds
        }
      
      const result=await axios.post('http://127.0.0.1:5000/send',{
        bet:betAmount,
        userTeam:userTeam,
        gameId:gameId,
        uid:uid,
        //impletement function to get the odds
        odds:odds
      })
      console.log(betAmount,userTeam,gameId,uid,odds)
      console.log(homeCity+" " +homeTeam)
      console.log(userTeam)
    }
  }
    const[homeTeamOdds,setHomeOdds]=useState(0)
    const[awayTeamOdds,setAwayOdds]=useState(0)

    const getOdds=async()=>{
      const result=await axios.get('http://localhost:3001/odds')
      let test_list=result.data["eventGroup"]["offerCategories"][0]["offerSubcategoryDescriptors"][4]["offerSubcategory"]["offers"]
     // let list_bets=result.data["eventGroup"]["offerCategories"][0]["offerSubcategoryDescriptors"][4]["offerSubcategory"]["offers"][0][0]["outcomes"]
      for(let i=0; i<test_list.length; i++){
        //let list_bets=result.data["eventGroup"]["offerCategories"][0]["offerSubcategoryDescriptors"][4]["offerSubcategory"]["offers"][i][0]["outcomes"]
        let iterate_list=result.data["eventGroup"]["offerCategories"][0]["offerSubcategoryDescriptors"][4]["offerSubcategory"]["offers"][i][0]["outcomes"]
        //console.log(iterate_list)

        console.log(iterate_list)
      }
      

    }

   

    
     
    


useEffect(()=>{
   getMatchup()
   getUiud()
   getSchedule()
   getGameId()
  //getOdds()
   

})

   
   

    

  return (
    <div className='h-screen bg-black'>
        <Link href='/'>
        <header className="flex items-row">
        <h1 className='text-blue-700 font-bold text-2xl'>Basket</h1>
        <h2 className='text-white font-bold text-2xl'>Bet</h2>
      
      </header>
        </Link>
        <center className='flex flex-col items-center'>
          <stuff className='mt-4 flex flex-col'>
            <div className='text-blue-700 text-2xl font-bold mt-28'></div>
            
            <button className='bg-blue-700 rounded-md p-4 mt-3 text-white '> {homeTeamOdds} {homeCity} {homeTeam} vs {awayCity} {awayTeam} {awayTeamOdds}</button>
            
            <div className='mt-6'>
              <button className='bg-blue-700 text-white rounded-md mr-3 p-2' onClick={back} >Back</button>
              <button className='bg-blue-700 text-white rounded-md p-2' onClick={next} >Next</button>
              <div className='mt-3'>
              
              </div>
              <div className='mt-3 font-bold text-blue-700'>Bet Amount</div>
              <input onChange={setUserBet} className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" />
              
            </div>
            <div>
            <div className='mt-3'>
                <div className='text-blue-700 font-bold'>Favorite Team</div>
                <input onChange={setUserTeam} className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            </div>
            
            <button onClick={sendData} className='bg-blue-700 rounded-md p-2 mt-3 text-white'>Submit</button>
            
            {awayerror==true && homeerror===true ?<div className='text-blue-700 font-bold'>Please Enter The Team As Displayed On Screen</div>:<div></div>}
            {betError===true?<div className='text-blue-700 font-bold'>Please Enter in a valid bet</div>:<div></div>}
            <button onClick={getOdds} className='bg-blue-700 rounded-md p-2 mt-3 text-white'>Next</button>
          </stuff>
          
        </center>
        

    </div>
  )
}


export default dash
