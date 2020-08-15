const mongose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function () {
  if (this.isNew || this.isModified("password")) {
    const salt = 12;
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
