const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user-router");
const authRoute = require("./routes/auth-route");
const problemRoute = require("./routes/problem-route")
const solutionRoute = require("./routes/solution-route");
const dashboardRoute = require("./routes/dashboard-route");
const reviewRoute = require("./routes/review-route");
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB")
}


const port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log(`Server is Listing on port : ${port}`);
})

app.use("/api/user" , userRoute);
app.use("/api/auth" , authRoute);
app.use("/api/problem" ,problemRoute , reviewRoute);
app.use("/api/dashboard" , dashboardRoute)
app.use("/api/problem/:id" ,solutionRoute , reviewRoute);

app.use((err , req ,res ,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    })
}) 
