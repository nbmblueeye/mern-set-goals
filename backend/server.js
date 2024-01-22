const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = process.env.MERN_APP_PORT || 5000
const connectDB = require('./configs/db');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/goals', require('./routes/goalRoute'));
app.use('/api/users', require('./routes/userRoute'));

app.use(errorHandler);

app.listen(port, () => {
    console.log('listening on port ' + port);
});