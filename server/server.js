require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router/auth-router')
const PORT = 5000;
app.use(express.json());
const connectDb = require('./utils/db');

app.use('/api/auth/', router)
connectDb().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`)
})
});
