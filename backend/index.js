const express = require('express');
const http = require("http");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const cors = require('cors');
app.use(cors());
const auth = require('./middleware/auth');
const roleAuth = require('./middleware/roleAuth');
const creds = require('./middleware/creds');
const User = require('./model/users');
const Flight = require('./model/flight');
const jwt = require('jsonwebtoken');
require('dotenv').config();
session=require('express-session'),

app.use(session({
  key: 'sessid',
  secret: 'This is secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 10000,
    signed: false
  }
}))

app.use(creds);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const server = http.createServer(app);
mongoose.connect("mongodb+srv://teja003:teja003@cluster0.9vcdq.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });

app.get('/',(req,res) => {
  res.json(req.user);
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      roles: "User"
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email, role:user.roles },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2d",
        }
      );
      user.token = token;
      user.save();
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});


app.post('/bookflight',auth,roleAuth(["User"]), async (req,res) => {
  const { id,email }  = req.body;
  const flight = await Flight.findOne({id});
  const user = await User.findOne({email});
   const uresult = await User.findOneAndUpdate({email:email},{
    $push: { flights : [flight] }
  });
  const fresult = await Flight.findOneAndUpdate({id},{
    $push: { passenger_list : [user] }
  });
  res.status(201).json({ok:"Done"});
});

app.get('/mybookings',auth,roleAuth(["User"]),async (req,res) => {
  const flights = await User.findOne({email:req.email}).populate('flights');
  res.json(flights);
});


// DONE
app.post('/flight/add',auth,roleAuth(["Admin"]),(req,res) => {
  const flight = new Flight({
    id:Date.now().toString(),
    name: req.body.name,
    flight_no: req.body.flight_no,
    from:req.body.from,
    to:req.body.to,
    date: req.body.date
  });
  flight.save();
  res.json(flight);
});
// DONE
app.get('/flight/all',auth,roleAuth(["Admin","User"]),async (req,res) => {
  const data = await Flight.find();
  res.json(data);
});
app.delete('/flight/remove/:id',auth,roleAuth(["Admin"]),async (req,res) => {
  const id = req.params.id;
  const flight = await Flight.findOne({id});
  await flight.remove();
  res.status(200).json({message: "Flight deleted successfully!"});
});

// DONE
app.get('/flight/details/:id',auth, roleAuth(["Admin"]), async (req,res)=>{
  const id = req.params.id;
  const flight = await Flight.findOne({id}).populate('passenger_list');
  res.json(flight);
});

server.listen(5000, () => console.log(`Server running on port 5000`));