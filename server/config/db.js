// udai123
// mongodb+srv://karumuriudaisai002:<db_password>@cluster0.ejw0cit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require("mongoose")

const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGDB_URL)
        console.log(`mongodb connected at ${conn.connection.host}`)
    }catch(e){
        console.log(`error in connecting mongdb ${e}`)
        process.exit(1)
    }
}

module.exports = connectDb
