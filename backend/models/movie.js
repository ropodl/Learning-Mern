const mongoose = require("mongoose");
const genres = require("../utils/genres");

const movieSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    story_line: { type: String, trim: true, required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: "Actor" },
    release_date: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["public", "private"],
    },
    type: {
      type: String,
      required: true,
    },
    genres: {
      type: String,
      required: true,
      enum: genres,
    },
    tags: {
      type: String,
      required: true,
    },
    cast: [
      {
        actor: { type: mongoose.Schema.Types.ObjectId, ref: "Actor" },
        role_as: String,
        lead_actor: Boolean,
      },
    ],
    writers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor",
      },
    ],
    poster: {
      type: Object,
      url: { type: String, required: true },
      public_id: { type: String, required: true },
      required: true,
    },
    trailer: {
      type: Object,
      url: { type: String, required: true },
      public_id: { type: String, required: true },
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

movieSchema.index({ title: "text" });

module.exports = mongoose.model("Movie", movieSchema);
