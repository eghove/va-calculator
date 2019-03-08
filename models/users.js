// the users model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userName: {
    type: String, 
    trim: true,
    required: true,
    unique: true,
    required: "Username is required."
  },

  userCreated: {
    type: Date,
    default: Date.now
  },

  estimates: [
    {
      type: Schema.Types.ObjectId,
      ref: "Estimates"
    }
  ]
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;