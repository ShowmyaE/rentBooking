const express=require('express')
const app=express()
const sqlite3=require('sqlite3')
const {open}=require('sqlite')
const path=require('path')
const cors = require("cors");



app.use(cors());
app.use(express.json())

const dbPath=path.join(__dirname,'demodb.db')
let db=null

const initializeDbAndServer=async()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        app.listen(5000,()=>{
          console.log('Server Running at http://localhost:5000')
           
        })

    }catch(error){
        console.log(`DB Error : ${error.message}`)
        process.exit(1)
  }
}
initializeDbAndServer()

app.get('/bookinglist',async(req,res)=>{
 
    const getUserQuery=`select * from BookingList`;
    const userDbDetails=await db.all(getUserQuery);
    console.log('DB value',userDbDetails);
    res.send(userDbDetails)

})