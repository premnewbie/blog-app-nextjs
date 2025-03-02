import mongoose from "mongoose";

const connectToDB = async() => {
    const connectionUrl = "mongodb+srv://prempm50:iTYNZECNkoV1CeFo@cluster0.hnsk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(connectionUrl).then(() => console.log("Database connection is successfull")).catch((err) => console.log("Unable to connect to the database",err))
} 

export default connectToDB;