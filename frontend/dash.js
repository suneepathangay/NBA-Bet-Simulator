import React, { useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

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



    const options = {
        method: "GET",
        url: "https://odds.p.rapidapi.com/v4/sports/basketball_nba/odds",
        params: {
          regions: "us",
          oddsFormat: "decimal",
          markets: "h2h,spreads",
          dateFormat: "iso",
        },
        headers: {
          "X-RapidAPI-Key": "",
          "X-RapidAPI-Host": "odds.p.rapidapi.com",
        },
      };
      
      let dict={}
      let list=[]


   
      
      const [index, setIndex] = useState(0);
     //const[list,setList]=useState([])
      const [currgame, setCurr] = useState("");
      const [curr, setCurrOdds] = useState(0);
      const [awaycurr, setCurrAway] = useState(0);
      
      async function requestData() {
        const response = await axios.request(options);
         setCurr(
          response.data[index]["away_team"]+"@"+response.data[index]["home_team"],
            
        );
        
        setCurrOdds(
          response.data[index]["bookmakers"][0]["markets"][0]["outcomes"][0][
            "price"
          ]
        );
        setCurrAway(
          response.data[index]["bookmakers"][0]["markets"][0]["outcomes"][1][
            "price"
          ]
        );
        
      }
      const next = async () => {
        setIndex((prev) => prev + 1);
        await requestData();
        //console.log(list)
      };
      
      const back = async () => {
        setIndex((prev) => prev - 1);
        await requestData();
        //console.log(list)
      };
    //write this data to sql database with uiud storing the favorite team and money bet and matchup
    
    const[favoriteTeam,setFav]=useState("")
    const[bet,setBet]=useState(0)
    

    const setFavoriteTeam=(event)=>{
        setFav(event.target.value)
        console.log(favoriteTeam)
    }

    const setbets=(event)=>{
        setBet(event.target.value)
        console.log(bet)
    }
    
    const sendData= async ()=>{

        if(isNaN(bet)==true || isNaN(favoriteTeam)==false){
            alert("please enter a valid bet")
        }
        console.log(currgame)
        list=currgame.split('@')
        console.log(list)
        dict[list[0]]=awaycurr
        dict[list[1]]=curr
        
        console.log(dict)
        if(favoriteTeam!=null){
            //setOdds(dict[favoriteTeam])
        }

        const data= axios.post('http://127.0.0.1:5000/send',{
         bet:bet,
         odds:dict,
         betName:currgame,
         favorite:favoriteTeam,
         uiud:uid
     
        })
        console.log(bet,dict,currgame,favoriteTeam,uid)
       
        
     }
    
     
    


useEffect(()=>{
   //requestData()
   getUiud()

})

   
   

    

  return (
    <div className='h-screen bg-black'>
        <Link href='/'>
        <h1 className='text-orange-500 font-bold'>Mills BasketBet</h1>
        </Link>
        <center className='flex flex-col items-center'>
          <stuff className='mt-4 flex flex-col'>
            <div className='text-orange-500 text-2xl font-bold mt-28'>Today's Games</div>
            <Link href='/payment'>
            <button className='bg-orange-500 rounded-md p-4 mt-3'>{awaycurr} {currgame} {curr}</button>
            </Link>
            <div className='mt-6'>
              <button className='bg-orange-500 rounded-md mr-3 p-2' onClick={back}>Back</button>
              <button className='bg-orange-500 rounded-md p-2' onClick={next}>Next</button>
              <div className='mt-3'>
              
              </div>
              <div className='mt-3 font-bold text-orange-500'>Bet Amount</div>
              <input className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" onChange={setbets} />
              
            </div>
            <div>
            <div className='mt-3'>
                <div className='text-orange-500 font-bold'>Favorite Team</div>
                <input className=" placeholder-gray-500 mt-5 shadow appearance-none border rounded  py-2 px-3 bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline" onChange={setFavoriteTeam}/>
            </div>
            </div>
            
            <button className='bg-orange-500 rounded-md p-2 mt-3' onClick={sendData}>Submit</button>
            
           
          </stuff>
          
        </center>
        

    </div>
  )
}


export default dash
