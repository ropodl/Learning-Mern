const { isValidObjectId } = require("mongoose");
const Actor = require("../models/actor");
const { sendError } = require("../utils/error");
const { uploadImage, removeImage } = require("../utils/cloudinaryActions");
const { formatActor } = require("../utils/formatActor");

exports.create = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;

  const newActor = new Actor({ name, about, gender });

  if (file) {
    const { url, public_id } = await uploadImage(file.path);
    newActor.avatar = {
      url,
      public_id,
    };
  }

  await newActor.save();

  res.status(201).json(formatActor(newActor));
};

exports.actor = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid request");

  const actor = await Actor.findById(id);
  if (!actor) return sendError(res, "Invalid request, actor not found", 404);

  res.json(formatActor(actor));
};

exports.update = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid request");

  const actor = await Actor.findById(id);
  if (!actor) return sendError(res, "Invalid request, actor not found");

  const public_id = actor.avatar?.public_id;

  if (public_id && file) {
    const { result } = await removeImage(public_id);
    if (result !== "ok") return sendError(res, "Could not remove image");
  }

  if (file) {
    const { url, public_id } = await uploadImage(file.path);
    actor.avatar = { url, public_id };
  }

  actor.name = name;
  actor.gender = gender;
  actor.about = about;

  await actor.save();

  res.status(201).json(formatActor(actor));
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid request");

  const actor = await Actor.findById(id);
  if (!actor) return sendError(res, "Invalid request, actor not found");

  const public_id = actor.avatar?.public_id;

  if (public_id) {
    const { result } = await removeImage(public_id);
    if (result !== "ok") return sendError(res, "Could not remove image");
  }

  await Actor.findByIdAndDelete(id);

  res.json({
    message: "Actor removed successfully",
  });
};

exports.search = async (req, res) => {
  const { query } = req;

  const result = await Actor.find({ $text: { $search: `"${query.name}"` } });

  const actors = result.map((actor) => formatActor(actor));

  res.json(actors);
};

exports.latest = async (req, res) => {
  const result = await Actor.find().sort({ createdAt: "-1" }).limit(10);

  const actors = result.map((actor) => formatActor(actor));

  res.json(actors);
};
