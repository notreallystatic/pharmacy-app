const express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  multer = require('multer'),
  path = require('path'),
  User = require('./models/User'),
  Medicine = require('./models/Medicine'),
  request = require('request');
const { resolve } = require('path');

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
    let requiresAuth = med.length % 2 ? true : false;
    User.findByIdAndUpdate(
      req.body.id,
      {
        $push: { meds: { name: med, requiresAuth: requiresAuth } },
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

function checkAuth(meds) {
  return new Promise((resolve, reject) => {
    let requiresAuth = false;
    meds.forEach((med) => {
      if (med.requiresAuth === 'true') requiresAuth = true;
    });
    resolve(requiresAuth);
  });
}

app.post('/api/refill', async (req, res) => {
  const meds = req.body.meds;
  const id = req.body.id;
  console.log(meds);
  checkAuth(meds)
    .then((requiresAuth) => {
      console.log(requiresAuth);
      res.json({ requiresAuth: requiresAuth });
    })
    .catch((error) => {
      res.status(401).json({ message: error.message });
    });
});

// Route to recognize face.
app.post('/api/auth', upload.single('image'), (req, sendRes) => {
  const id = req.body.id;
  let base64Image = req.body.picture.split(';base64,').pop();
  fs.writeFile(
    `./upload/temp/${id + 2}.jpeg`,
    base64Image,
    { encoding: 'base64' },
    (err) => {
      if (err) console.log(err);

      // img1: './upload/${id}.jpeg'
      // img2: './upload/temp/${id}.jpeg'

      var options = {
        method: 'POST',
        url: 'https://biometricvisionapi.com/v1/compare',
        headers: {
          'X-Authentication-Token':
            'a0SVrkEXPgsut9iMK9HR8CtbkLBkbw70JLDKXtX721cEVrHiEevKCsr5CvYniLeK',
          Content: 'application/json',
          Accept: 'application/json',
        },
        formData: {
          image1: {
            value: fs.createReadStream(`./upload/${id}.jpeg`),
            options: {
              filename: `${id}.jpeg`,
              contentType: null,
            },
          },
          image2: {
            value: fs.createReadStream(`./upload/temp/${id + 2}.jpeg`),
            options: {
              filename: `${id + 2}.jpeg`,
              contentType: null,
            },
          },
        },
      };

      request(options, (err, res) => {
        if (err) {
          console.log(err.message);
        }
        const faceResult = JSON.parse(res.body);
        console.log(faceResult);
        console.log(faceResult['confidence']);
        const result = faceResult['confidence'] === 'Match' ? true : false;
        console.log(result);
        sendRes.json({
          result: result,
        });
      });
    }
  );
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

app.listen(port, () => console.log(`Server is up & running on port ${port}`));
