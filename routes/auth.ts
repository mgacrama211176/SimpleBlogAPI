import express from 'express';
import User from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/register', async (request, response) => {
  // as much as possible use try catch to catch any errors if possible
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: encryptedPassword,
    });
    const user = await newUser.save();
    response.status(200).json({ message: `Account created` });
  } catch (err) {
    response.status(500).json(err);
  }
});

//Login Part
router.post('/login', async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  try {
    const user = await User.findOne({ username: username });
    //checking if user existed
    if (!user) {
      response.status(400).json({ message: `No user Found` });
    } else {
      //   for checking for password if password is correct.
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        response.status(400).json({ message: `password incorrect` });
      } else {
        response.status(200).json({ message: `password correct` });
      }
    }
  } catch (err) {
    response.status(500).json(err);
  }
});
export default router;
