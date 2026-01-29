const mongoose = require("mongoose")

let connecttt = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/billing")
        console.log("connected")
    } catch (e) {
        console.log("Connection Exception: ",e)
    }
}


connecttt()