const express = require("express")
const cors = require("cors")

const bookingsRouter = require("./routes/bookings")
const roomRouter = require("./routes/room")

const port = process.env.PORT || 8080

const app = express()

app.use("/",express.static("public"))
app.use(cors())
app.use(express.json())

app.use("/hall-booking", bookingsRouter)
app.use("/hall-booking", roomRouter)

app.listen(port,()=>{
    console.log("Server is running on: http://localhost:"+port)
})

