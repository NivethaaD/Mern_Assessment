//https://cloud.mongodb.com/v2/66e9c97537c3280da2d2c703#/metrics/replicaSet/66e9c9fb8f2d3f5e31eb4a29/explorer/test/users/find
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const userRoute=require('./routes/userRoute')
const employeeRoute=require('./routes/employee')
app.use(express.json());
app.use(cors());

app.use('/api/v1',userRoute);
app.use('/api/v1',employeeRoute)
mongoose.connect(process.env.MONGO_URL, {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => console.log(`Server connected to port ${PORT}`)); 