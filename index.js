const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const passportConfig = require("./config/passport")
const app = express()

const PORT = 8000

//middlewares
app.use(express.json())
app.use(passport.initialize())

passportConfig(passport)

//db connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log("Oh no error in db connection...", err)
})


app.get("/", (req,res) => {
    res.send("hello world")
})

//define routes middlewares
app.use("/api", require("./routes/user"))
app.use("/api", require("./routes/post"))



app.listen(PORT, () => console.log("server is running on port"+ PORT))