const fs = require('fs');
const dotenv = require('dotenv');
const Tours = require('../models/tourModel');
const mongoose = require('mongoose');

//Load env vars
dotenv.config({ path: '../config/config.env' });

mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, `utf-8`));

// IMPORT ALL DATA TO DB
const importData = async () => {
  try {
    await Tours.create(tours);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tours.deleteMany();
    console.log('Data Successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--i') {
  importData();
} else if (process.argv[2] === '--d') {
  deleteData();
}
