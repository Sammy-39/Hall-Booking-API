const express = require("express")
const path = require("path")
const fs = require("fs")

const router = express.Router()

const bookingDataFile = path.join(__dirname,"../data/bookings.json")

let bookingsData = JSON.parse(fs.readFileSync(bookingDataFile,'utf8'))

router.get("/customers",(req,res)=>{
    res.json(bookingsData)
})

router.get('/customer/:id',(req,res)=>{
    if(bookingsData[req.params.id-1]){
        res.json(bookingsData[req.params.id-1])
    }
    else{
        res.send({
            message: "Error: ID not found"
        })
    }
})

router.post("/booking",(req,res)=>{
    let flag = 0
    bookingsData.forEach((booking)=>{
        let bookStart = parseFloat(booking["start-time"])
        let reqStart = parseFloat(req.body["start-time"])
        let bookFinish = parseFloat(booking["finish-time"])
        let reqFinish = parseFloat(req.body["finish-time"])
        if(booking["room-id"]===req.body["room-id"] && booking["date"]===req.body["date"] && 
          ((reqStart >= bookStart && reqStart < bookFinish) || (reqFinish <= bookFinish && reqFinish > bookStart)))
            flag = 1
    })
    if(flag){
        res.json({
            message: "Room already booked for the given date and time"
        })
    }
    else{
        bookingsData.push({...req.body,...{"id":"booking-"+(bookingsData.length+1)}})
        fs.writeFileSync(bookingDataFile,JSON.stringify(bookingsData))
        res.json({
            message: "Room booked successfully"
        })
    }
})

module.exports = router