
const express=require("express")
const cors=require("cors")
const { default: axios } = require("axios")

const app=express()
app.use(cors())

const getData=async ()=>{
    const result=await axios.get('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json')
    console.log(result.data)
    return result.data
}

const getOdds=async()=>{
    const result=await axios.get('https://sportsbook-us-ma.draftkings.com//sites/US-MA-SB/api/v5/eventgroups/42648/categories/487/subcategories/10004?format=json')
    return result.data
}


app.get('/data',async(req,res)=>{
    
    res.send(await getData())
})
app.get('/odds',async(req,res)=>{
    res.send(await getOdds())
})


app.listen(3001)
