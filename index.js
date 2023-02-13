const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config({path: 'C:\Users\sejal\OneDrive\Desktop\New folder\banking-system-master\.env'});
const app = express();

const cors = require('cors')
app.use(cors())

const PORT  = process.env.PORT || 5000;
mongoose.connect("mongodb+srv://Kashish:eEtMGT8LdxbqIUxr@kashishvatsh.kwp09li.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(() => console.log("DB connected"))
.catch((e) => console.log(e))

// app.get("/",(req,res) => {
//     res.send("hi bruh")
// })
app.use(express.json());
const userRoute = require("./routes/userData")
app.use(userRoute)

if ( process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
app.listen(PORT,() => console.log(`PORT is running at ${PORT}`))