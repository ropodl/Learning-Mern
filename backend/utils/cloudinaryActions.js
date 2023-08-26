const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
  secure: true,
});

exports.uploadImage = async (path) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(path, {
    gravity: "face",
    height: 500,
    width: 500,
    crop: "thumb",
  });

  return { url, public_id };
};

exports.removeImage = async (id) => {
  const { result } = await cloudinary.uploader.destroy(id);
  return { result };
};
