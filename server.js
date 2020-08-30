const express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  multer = require('multer'),
  path = require('path'),
  User = require('./models/User'),
  Medicine = require('./models/Medicine');

const app = express();

// app.use(express.static(path.join(__dirname, 'client', 'build')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${+new Date()}.jpg`);
  },
});
const upload = multer({
  storage,
});

app.use(cors());

require('dotenv').config();

mongoose
  .connect(
    'mongodb+srv://platypus:' +
      process.env.MONGOPW +
      '@cluster0-ftq3z.mongodb.net/Pharmacy?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log('Error');
  });

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get('/api/', (req, res) => {
  res.send('Data from backend');
});

// Route for register
app.post('/api/register', upload.single('image'), (req, res) => {
  const newUser = new User({
    name: req.body.name,
    address: req.body.address,
    password: req.body.password,
    dob: req.body.dob,
    email: req.body.email,
    contact: req.body.contact,
  });
  let base64Image = req.body.picture.split(';base64,').pop();
  console.log(newUser);
  fs.writeFile(
    `./upload/${newUser._id}.jpeg`,
    base64Image,
    { encoding: 'base64' },
    (err) => {
      if (err) console.log(err);
      newUser.photoUrl = `./upload/${newUser._id}.jpeg`;
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err.message);
          return res.status(401).json({ message: err.message });
        });
    }
  );
});

// Router for login
app.post('/api/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user.password === req.body.password) {
        res.json(user);
      } else {
        res.status(401).json({ message: 'Wrong Passwod' });
      }
    })
    .catch((error) => {
      res.status(401).json({ message: 'User not found' });
    });
});

app.post('/api/add', (req, res) => {
  let newMedicines = req.body.meds;

  newMedicines.forEach(async (med) => {
    User.findByIdAndUpdate(
      req.body.id,
      {
        $push: { meds: { name: med } },
      },
      { new: true },
      (err, result) => {
        if (err) console.log(err);
      }
    );
  });
});

app.get('/api/meds/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.json({ meds: user.meds });
    })
    .catch((error) => {
      res.status(401).json({ message: error.message });
    });
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

app.listen(port, () => console.log(`Server is up & running on port ${port}`));
