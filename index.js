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
// id: 2,
// name: "Jerrsy, United State",
// Villas: "12 Villas",
// Apartments: "10 Apartments",
// Offices: "07 Offices",
// cover: "./images/location/city-2.png",
app.get('/location',async(req,res)=>{
//    const createTable=`CREATE TABLE LocationTable(
//         id int,
//         name varchar(255),
//         Villas varchar(255),
//         Appartments varchar(255),
//         Offices varchar(255),
//         cover varchar(255)
//     );`
//     const createData=await db.run(createTable);
    // const insertquery=`INSERT INTO LocationTable(id,name,Villas,Appartments,Offices,cover)
    // VALUES (6,'California, USA', '12 Villas',"10 Apartments","07 Offices", "./images/location/city-6.png")`;
    // const insertData=await db.run(insertquery)
    const getUserQuery=`select * from LocationTable`;

    const userDbDetails=await db.all(getUserQuery);
    console.log('DB value',userDbDetails);
    res.send(userDbDetails)

})
