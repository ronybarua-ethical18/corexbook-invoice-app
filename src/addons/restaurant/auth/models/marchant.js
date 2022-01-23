const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marchantSchema = Schema({
  first_name:{
    type:String,
    required:true,
    trim:true
  },
  last_name:{
    type:String,
    required:true,
    trim:true
  },
  company:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    // unique:[true,"Your email address already Exists"]
  },
  mobile:{
    type:String,
    required:true,
    trim:true
  },
  logo: { type: String, default: "http://localhost:8000/uploads/logo-1641384621274.jpg" },
  is_verified:{
    type:Boolean,
    default:false
  },
  // user: {type: mongoose.Types.ObjectId,
  //   ref: "user" },
  token: {
    type: String
  }
},{
  timestamp:true
});

module.exports = mongoose.model("marchant", marchantSchema);
