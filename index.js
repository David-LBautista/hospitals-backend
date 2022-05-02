require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');


const app = express();
app.use(cors());

// Body
app.use(express.json());

// Connection to DB
dbConnection();

// public
app.use(express.static('public'))

// Routes
app.use('/api/users', require('./routes/user-routes'));
app.use('/api/auth', require('./routes/auth-routes'));
app.use('/api/hospitals', require('./routes/hospital-routes'));
app.use('/api/doctors', require('./routes/doctors-routes'));
app.use('/api/search-all', require('./routes/search-all-routes'));
app.use('/api/upload', require('./routes/uploads-routes'));


app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT)
})


