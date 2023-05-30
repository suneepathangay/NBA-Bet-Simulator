import React, { useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { homedir } from 'os';
import { typeOf } from 'tls';

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
              console.log(user.email)
            } else {
              console.log("no uid")
            }
          });
    }
    
    let numGamesToday=0
    
   

    //getting data from our middleware express server
    

    //index ustate to keep track of the pointer
  
    
    
    

    

    let gameId=""
    let date=""

    

    const getDate=async()=>{
      const result=await axios.get('http://localhost:3001/data')
      date=result.data["scoreboard"]["gameDate"]
      console.log(date)
    }

    const getGameId=async()=>{
      const result=await axios.get('http://localhost:3001/data')
      let game=result.data["scoreboard"]["games"][gameIndex]
      gameId=game["gameId"]
      console.log(gameId)
      
  }


    
    


    
    
    

    

    
    const[betAmount,setBetAmount]=useState(0)


    

    const setUserBet=(event)=>{
      setBetAmount(event.target.value)
      console.log(betAmount)
    }

    
    const[betError,setBetError]=useState(false)
    
    const[allow,setAllow]=useState(true)
    
    const sendData=async()=>{
      
      if(betAmount<=0){
        setBetError(true)
      }
      
      
       
      
      const result=await axios.post('http://127.0.0.1:5000/send',{
        bet:betAmount,
        userTeam:userTeam,
        gameId:gameId,
        uid:uid,
        //impletement function to get the odds
        odds:ods,
        date:date,
        state:underOver,
        points:points
      })
      console.log(gameId,date,userTeam)
      
    }
      
  
    
    const[offersIndex,setOFI]=useState(0)
    const[matchup,setMatchup]=useState(0)
    const[offers,setOffers]=useState("")
    const[ods,setods]=useState(0)
    const[gameIndex,setGameIndex]=useState(0)
    



    let numGames=0
    let numOffers=0

    const nextOffer=()=>{
      if(offersIndex+1<=numOffers-1){
        setOFI(offersIndex+1)
      }
    }
    const backOffer=()=>{
      if(offersIndex>0){
        setOFI(offersIndex-1)
      }
    }

    const nextGame=()=>{
      if(gameIndex+1<=numGames-1){
        setGameIndex(gameIndex+1)
      }

    }

    

    const backGame=()=>{
      if(gameIndex>0){
        setGameIndex(gameIndex-1)
      }
    }

    const getGame=async()=>{
      const results=await axios.get('http://localhost:3001/odds')
      console.log(results.data["eventGroup"]["events"][gameIndex]["name"])
      setMatchup(results.data["eventGroup"]["events"][gameIndex]["name"])

    }
    


    const getOdds=async()=>{
      const result=await axios.get('http://localhost:3001/odds')
      let lengths=result.data["eventGroup"]["offerCategories"][0]["offerSubcategoryDescriptors"].length
      let week_games=result.data["eventGroup"]["offerCategories"][0]["offerSubcategoryDescriptors"][lengths-1]["offerSubcategory"]["offers"]
     console.log(week_games)
      numGames=week_games.length

      //change this so it gets the weeks index
      
        let game=week_games[gameIndex]
        //console.log(game)
        let outcomes=game[0]["outcomes"]
        numOffers=outcomes.length
        

        //console.log(outcomes[offersIndex])
        setOffers(outcomes[offersIndex]['label'])
        setods(outcomes[offersIndex]['oddsDecimal'])
        
    }

    //write function to get the NBA Game ID

    const[userTeam,setUser]=useState("")
    const[underOver,setOverUnder]=useState(false)
    const[points,setPoints]=useState(0)
    const[buttonState,setButton]=useState('bg-blue-700')

    
   

    const setUserBets=()=>{

      let shit=offers.split(' ')
      setUser(offers.split(' ')[0])
      console.log(offers.split(' '))
      console.log(shit[3])
      if (shit[3]=='Over'){
        setOverUnder(true)
      }else{
        setOverUnder(false)
      }
      setPoints(shit[4])

      
      setButton('bg-blue-200')
      console.log(userTeam)
    }

    

    
     
    


useEffect(()=>{
   
   getUiud()
   
  
  getOdds()
  
  getDate()
  getGame()
  getGameId()
  
  
  
   

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

            <div className='text-blue-700 text-2xl font-bold mt-4'>MatchUp</div>
            <p className="text-gray-500 font-bold">Click the offer which you want to bet on</p>
            <p className="text-gray-500 font-bold">If you want to select a different game click on next game</p>
            <div className='bg-blue-700 rounded-md p-4 mt-3 text-white mb-3'> {matchup}</div>
            <div className="flex flex-row">
              <div className='mt-3 mb-3 flex flex-row items-center'>
            <button className='bg-blue-700 text-white rounded-md mr-3 p-2' onClick={backGame}>Prev Game</button>
            <button className='bg-blue-700 text-white rounded-md mr-3 p-2' onClick={nextGame}>Next Game</button>
            </div>
            </div>
            <button onClick={setUserBets} className={`rounded-md p-4 mt-3 text-white ${buttonState}`} id="myButton">{offers} {ods}</button>
            
            <div className='mt-6'>
              <button className='bg-blue-700 text-white rounded-md mr-3 p-2' onClick={backOffer} >Prev Offer</button>
              <button className='bg-blue-700 text-white rounded-md p-2' onClick={nextOffer} >Next Offer</button>
              <div className='mt-3'>
              
              </div>
              <div className='mt-3 font-bold text-blue-700'>Bet Amount</div>
              <input onChange={setUserBet} className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" />
              
            </div>
            <div>
            <div className='mt-3'>
               
                
            </div>
            </div>
            
            <button onClick={sendData} className='bg-blue-700 rounded-md p-2 mt-3 text-white'>Submit</button>
            
            
            {betError===true?<div className='text-blue-700 font-bold'>Please Enter in a valid bet</div>:<div></div>}
            
            <button className='bg-blue-700 rounded-md p-2 mt-3 text-white'>Next</button>
          </stuff>
          
        </center>
        

    </div>
  )
}


export default dash
