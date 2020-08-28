const express = require('express'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      bodyParser = require('body-parser');
      
const app = express();

app.use(cors());

require('dotenv').config();

mongoose.connect(
  'mongodb+srv://platypus:'
  + process.env.MONGOPW + 
  '@cluster0-ftq3z.mongodb.net/Pharmacy?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log('Error');
  });

app.use(bodyParser.urlencoded({
  extended: false
}));
  
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Data from backend");
});

app.listen(port, () => console.log(`Server is up & running on port ${port}`));