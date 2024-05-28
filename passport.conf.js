const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const bcrypt = require("bcryptjs");

// Define the local strategy
const localStrategy = new LocalStrategy(async (username, password, done) => {
    console.log("local")
  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

// Define the serialization of the user
const serializeUser = (user, done) => {
    console.log("serialize")
  done(null, user.id);
};

// Define the deserialization of the user
const deserializeUser = async (id, done) => {
    console.log("deserialize")
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
};

// Export the individual parts
module.exports = {
  localStrategy,
  serializeUser,
  deserializeUser
};
