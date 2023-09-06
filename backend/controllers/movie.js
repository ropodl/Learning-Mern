const cloudinary = require("../utils/cloudinaryActions");
const { sendError } = require("../utils/error");
const { uploadVideo } = require("../utils/cloudinaryActions");
const Movie = require("../models/movie");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const {
    title,
    story_line,
    director,
    release_date,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;
  const { file } = req;

  const newMovie = new Movie({
    title,
    story_line,
    release_date,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  });

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid Director ID");
    newMovie.director = director;
  }

  if (writers) {
    for (let writer of writers)
      if (!isValidObjectId(writer)) return sendError(res, "Invalid Writer ID");
    newMovie.writers = writers;
  }

  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.uploader.upload(file.path, {
    transformation: {
      width: 1280,
      height: 720,
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
  });
  const poster = { url, public_id, responsive: [] };
  const { breakpoints } = responsive_breakpoints[0];
  if (breakpoints.length) {
    for (let imagObj of breakpoints) {
      const { secure_url } = imagObj;
      poster.responsive.push(secure_url);
    }
  }
  newMovie.poster = poster;

  await newMovie.save();

  res.status(201).json({ id: newMovie.id, title });
};

exports.updateNoPoster = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Movie Id");

  if (!req.file) return sendError(res, "Movie Poster missing");

  const movie = Movie.findById(id);
  if (!movie) return sendError(res, "Movie not found", 404);

  const {
    title,
    story_line,
    director,
    release_date,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  movie.title = title;
  movie.story_line = story_line;
  movie.release_date = release_date;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.tags = tags;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid Director ID");
    movie.director = director;
  }

  if (writers) {
    for (let writer of writers)
      if (!isValidObjectId(writer)) return sendError(res, "Invalid Writer ID");
    movie.writers = writers;
  }

  const poster_id = movie.poster?.public_id;
  if (poster_id) {
    const { result } = await cloudinary.uploader.destroy(poster_id);
    if (result !== "ok") return sendError(res, "Could not update poster");
  }
  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.uploader.upload(req.file.path, {
    transformation: {
      width: 1280,
      height: 720,
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
  });
  const poster = { url, public_id, responsive: [] };
  const { breakpoints } = responsive_breakpoints[0];
  if (breakpoints.length) {
    for (let imagObj of breakpoints) {
      const { secure_url } = imagObj;
      poster.responsive.push(secure_url);
    }
  }
  movie.poster = poster;

  await movie.save();

  res.json();
};

exports.updateWithPoster = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Movie Id");

  const movie = Movie.findById(id);
  if (!movie) return sendError(res, "Movie not found", 404);

  const {
    title,
    story_line,
    director,
    release_date,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  movie.title = title;
  movie.story_line = story_line;
  movie.release_date = release_date;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.tags = tags;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid Director ID");
    movie.director = director;
  }

  if (writers) {
    for (let writer of writers)
      if (!isValidObjectId(writer)) return sendError(res, "Invalid Writer ID");
    movie.writers = writers;
  }

  await movie.save();

  res.json();
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid Movie Id");

  const movie = Movie.findById(id);
  if (!movie) return sendError(res, "Movie not found", 404);

  const poster_id = movie.poster?.public_id;
  if (poster_id) {
    const { result } = await cloudinary.uploader.destroy(poster_id);
    if (result !== "ok")
      return sendError(res, "Could not remove poster from cloud");
  }

  const trailer_id = movie.trailer?.public_id;
  if (!trailer_id) return sendError(res, "Could not find trailer");
  const { result } = await cloudinary.uploader.destroy(trailer_id, {
    resource_type: "video",
  });
  if (result !== "ok")
    return sendError(res, "Could not remove trailer from cloud");

  await movie.findByIdAndDelete(id);

  res.json({ message: "Movie removed successfully" });
};

exports.uploadTrailer = async (req, res) => {
  const { file } = req;

  if (!file) return sendError(res, "Video file is missing");

  const { url, public_id } = await uploadVideo(file.path);

  res.status(201).json({ url, public_id });
};
