/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server: Server;



const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to mongoDB database");
    server = app.listen(envVars.PORT, () => {
      console.log(`PH-Tour-Management-System is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// SIGTERM Signal Error
process.on("SIGTERM",()=>{
    console.log("SIGTERM Signal Recieved... Server shutting down..");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

// SIGINT Signal For Manually Off Server
process.on("SIGINT",()=>{
    console.log("SIGINT Signal Recieved... Server shutting down..");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("unhandledRejection",(err)=>{
    console.log("Unhandled Rejection Detected... Server shutting down..",err);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})
// unhandledRejection Error
// Promise.reject(new Error("I forgot to catch this promise"))

process.on("uncaughtException",(err)=>{
    console.log("Uncaught Exception Detected... Server shutting down..",err);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})
// uncaughtException
// throw new Error("I forgot to handle this local error")
