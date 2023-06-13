const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http")
const dotenv = require("dotenv")
const server = http.createServer(app)

const mongoose = require("mongoose")

const PORT = process.env.PORT || 5000

dotenv.config()
app.use(cors({ origin: "*" }))

//connect mongodb
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch((err) => console.log("MongoDB error ", err))

server.listen(PORT, () => {
    console.log("Server Chat is listening on port " + PORT)
})
