const express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  multer = require('multer'),
  path = require('path');

const app = express();
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

app.post('/api/register', upload.single('image'), (req, res) => {
  console.log(typeof req.body.picture);
  let base64Image = req.body.picture.split(';base64,').pop();
  fs.writeFile(
    `./upload/${req.body.name}.jpeg`,
    base64Image,
    { encoding: 'base64' },
    (err) => {
      if (err) console.log(err);
      console.log('file saved');
    }
  );
});

app.listen(port, () => console.log(`Server is up & running on port ${port}`));
