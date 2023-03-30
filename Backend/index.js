const express = require('express');
const { connection } = require("./config/db");


require("dotenv").config();



const PORT = process.env.PORT;
const cors = require("cors");//


const app = express();//
app.use(cors());//
const cookieParser=require('cookie-parser')
app.use(cookieParser())
app.use(express.json())



// app.get('/', (req, res) => { 
//        console.log(req.device); 
//        res.json({ "msg": "Welcome to Seoux Bodycare! on your " + req.device.type.toUpperCase()
//  })
//  });

app.get('/', (req, res) => {
       res.json({ "msg": "Welcome to Seoux Bodycare! on your "})
})

const {userRouter}=require("./routes/user.route")
app.use("/users",userRouter)


//////////////////////////////////////////////



const {authenticate}=require("./middlewares/authenticate.middle")
// app.use(authenticate)



const { Categorylist } = require("./routes/CategoryList");
const { Workingproflist } = require("./routes/WorkingProfList");


app.use("/",Categorylist);
app.use("/",Workingproflist);






app.listen(PORT, async () => {
       try {
              await connection;
              console.log("Connected to Database");
              console.log(`Listening on ${PORT}`);
       } catch (error) {
              console.log("Failed while connecting to Database");
              console.log(error);
       }
})