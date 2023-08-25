const cloudinary = require("cloudinary").v2;
const Actor = require("../models/actor");

// import Actor from "../models/actor";

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

exports.create = async (req, res) => {
  const { name, about, gender, isVerified, avatar } = req.body;
  const { image } = req;

  const newActor = new Actor({ name, about, gender });
  newActor.save();
};
