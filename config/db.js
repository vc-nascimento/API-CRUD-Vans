// config/db.js
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

const dbUser= process.env.DB_USER;
const dbPassoword = process.env.DB_PASS;

async function main() {
    await mongoose.connect(
        //`mongod+srv://${dbUser}:${dbPassoword}@cluster0.zgbteua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        `mongodb+srv://${dbUser}:${dbPassoword}@cluster0.zgbteua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Conectou ao banco de dados!");
}

main().catch((err) => console.log(err));
module.exports = main;

