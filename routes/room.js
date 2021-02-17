const express = require("express")
const path = require("path")
const fs = require("fs")

const router = express.Router()

const roomDataFile = path.join(__dirname,"../data/room.json")
const bookingDataFile = path.join(__dirname,"../data/bookings.json")

let roomData = JSON.parse(fs.readFileSync(roomDataFile,'utf8'))
let bookingData = JSON.parse(fs.readFileSync(bookingDataFile,'utf8'))

router.get("/rooms",(req,res)=>{
    let roomBooked = bookingData.map((booking)=>( {...booking,...{"isBooked": "yes"}}))

    let roomUnBooked = roomData.map((room)=>({"room-id": room.id ,"isBooked": "No"}))
    .filter((room)=>( ! bookingData.some(booking => booking["room-id"] == room["room-id"])))

    let resData = [...roomUnBooked, ...roomBooked]
    res.json(resData)
})

router.post("/room",(req,res)=>{
    roomData.push({...req.body,...{"id":"room-"+(roomData.length+1)}})
    fs.writeFileSync(roomDataFile,JSON.stringify(roomData))
    res.json({
        message: "Created room successfully"
    })
})

module.exports = router