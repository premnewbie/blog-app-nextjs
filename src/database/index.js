import mongoose from "mongoose";

const connectToDB = async() => {
    const connectionUrl = process.env.MONGO_URI;
    mongoose.connect(connectionUrl).then(() => console.log("Database connection is successfull")).catch((err) => console.log("Unable to connect to the database",err))
} 

export default connectToDB;