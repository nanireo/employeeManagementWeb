const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const employeeRoutes = require('./routes/employeeRoutes');
const loginRoutes = require('./routes/loginRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

// Session middleware setup
app.use(session({
  secret: 'your-secret-key', // Change this to a long random string
  resave: false,
  saveUninitialized: true,
}));

app.use(cors());
app.use(express.json());
app.use('/uploadimage', express.static('uploadimage'));

//mongoose.connect('mongodb+srv://nani:nani123@cluster0.yip5wi3.mongodb.net/employeeList',

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/employee', employeeRoutes);
app.use('/api/login', loginRoutes);

// Server creation

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running at 4000");
});



















// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const employeeRoutes = require('./routes/employeeRoutes');
// const loginRoutes = require('./routes/loginRoutes');
// const cors = require('cors');
// const path = require('path');

// const app = express();

// // Session middleware setup
// app.use(session({
//   secret: 'your-secret-key', // Change this to a long random string
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use(cors());
// app.use(express.json());
// app.use('/uploadimage', express.static('uploadimage'));

// // Database connection

// mongoose.connect('mongodb+srv://nani:nani123@cluster0.yip5wi3.mongodb.net/employeeList', { useNewUrlParser: true, useUnifiedTopology: true })

// .then(() => {
//     console.log('MongoDB connected successfully');
//   });


// // mongoose.connect('mongodb+srv://nani:x46ts37kRM7h6bpE@empmanagement.jluc3ge.mongodb.net/?retryWrites=true&w=majority&appName=empManagement/employeeList', { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => {
// //     console.log('MongoDB connected successfully');
// //   });

//   // mongoose.connect('mongodb://localhost:27017/employeeList', { useNewUrlParser: true, useUnifiedTopology: true })
//   // .then(() => {
//   //   console.log('MongoDB connected successfully');
//   // });


// // Routes
// app.use('/api/employee', employeeRoutes);
// app.use('/api', loginRoutes);

// // Server creation
// app.listen(4000, () => {
//   console.log("Server is running at 4000");
// });



















// const express = require('express')
// const mongoose = require('mongoose')
// const employeeRoutes = require('./routes/employeeRoutes');
// const loginRoutes = require('./routes/loginRoutes');
// //const dataRoutes  = require('./routes/addBusRoutes');
// const cors = require('cors');
// //const routes = require('./routes');
// const path = require('path');


// const app = express();


// app.use(cors());
// app.use(express.json());
// app.use('/uploadimage', express.static('uploadimage'));
// //app.use('/uploadimage', express.static(path.join(__dirname, 'uploadimage')));

// //app.use(routes);
// //Database connection
//  mongoose.connect('mongodb://localhost:27017/employeeList', {useNewUrlParser: true, useUnifiedTopology: true })
//       .then(() => {
//         console.log('MongoDB connected successfully')});


//   //Routes
//  app.use('/api/employee', employeeRoutes);
//  app.use('/api', loginRoutes);


//  //server creation
// app.listen(4000, ()=> { 
//     console.log("server is running at 4000 ");
// });