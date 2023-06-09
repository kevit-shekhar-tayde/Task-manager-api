const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");
const dotenv = require("dotenv");

dotenv.config({ path: "../../config/test.env" });

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Darshita",
  email: "darshita@gmail.com",
  password: "qwer1234",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  name: "Prashant",
  email: "parshu@gmail.com",
  password: "asdf1234",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET_KEY),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First test task",
  completed: false,
  owner: userOneId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second test task",
  completed: true,
  owner: userOneId,
};
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third test task",
  completed: false,
  owner: userTwoId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
};
