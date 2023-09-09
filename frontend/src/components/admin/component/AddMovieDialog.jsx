import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import { uploadTrailer } from "../../../api/movie";
import { useNotification } from "../../../hooks";
import Input from "../../form/Input";
import Submit from "../../form/Submit";
import Textarea from "../../form/Textarea";

export default function AddMovieDialog() {
  const { updateNotification } = useNotification();

  const [videoSelected, setVideoSelected] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formVisible, setFormVisible] = useState(false);
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    story_line: "",
    tags: [],
    cast: [],
    director: {},
    writers: [],
    release_date: "",
    poster: null,
    genres: [],
    type: "",
    language: "",
    status: "",
    trailer: {
      url: "",
      public_id: ""
    }
  });

  const handleChange = async (file) => {
    setTypeError(false);
    const formData = new FormData();
    formData.append("video", file);
    const { error, url, public_id } = await uploadTrailer(
      formData,
      setProgress
    );
    if (!error) {
      setVideoSelected(true);
      setFormVisible(true);
    }
  };
  const handleError = (err) => {
    updateNotification("error", err);
    setTypeError(true);
  };
  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white w-[45rem] h-100 overflow-auto rounded relative">
        <Progress visible width={progress} />
        {/* <button className="absolute top-3 right-2 bg-white bg-opacity-50 rounded-full">
          <GrClose className="p-1.5" size={30} />
        </button> */}
          {/* ={!videoSelected} */}
        <FileSelect
          visible={false}
          handleChange={handleChange}
          onTypeError={handleError}
          typeError={typeError}
        />
        <Forms visible />
      </div>
    </div>
  );
}

const Progress = ({ visible, width }) => {
  if (!visible) return null;
  return (
    <div className="w-full bg-gray-200 h-1.5 dark:bg-gray-700 absolute top-0">
      <div
        className="bg-blue-600 h-1.5 dark:bg-blue-500"
        style={{ width: width + "%" }}
      ></div>
    </div>
  );
};
const FileSelect = ({ visible, handleChange, onTypeError, typeError }) => {
  if (!visible) return null;
  return (
    <FileUploader
      classes="file_drop_zone"
      handleChange={handleChange}
      onTypeError={onTypeError}
      hoverTitle="Drop your file here"
      name="file"
      maxSize={100}
      types={["mp4"]}
    >
      <div className="text-center dark:text-white py-10">
        <div className="flex justify-center mb-3">
          <AiOutlineCloudUpload size={100} />
        </div>
        <div className="text-xl font-black mb-3">
          Drag and drop video files to upload
        </div>
        <div className="text-xs text-gray-300 mb-3">
          Your videos will be private until you publish them.
        </div>
        {typeError ? (
          <div className="text-sm font-gray-300 mb-3 flex items-center justify-center">
            {" "}
            <FiAlertTriangle className="mr-3 text-lg text-red-600" /> File type
            not supported.
          </div>
        ) : null}
        <button className="bg-blue-400 px-5 py-2 rounded text-black font-semibold">
          Select File
        </button>
      </div>
    </FileUploader>
  );
};
const Forms = ({ visible, handleSubmit, title }) => {
  if (!visible) return null;
  return (
    <div className="flex flex-col p-3 h-[30rem] overflow-y-scroll">
      <Input name="title" placeholder="Movie Title" />
      <Textarea name="story_line" placeholder="Story Line" />
      <Input name="tags" placeholder="Movie Tags" />
      <Input name="cast" placeholder="Movie Casts" />
      <Input name="director" placeholder="Director" />
      <Input name="writers" placeholder="Writers" />
      <Input type="date" name="release_date" placeholder="Release Date" />
      <Input name="poster" type="file" accept="image/*" />
      <Input name="genres" placeholder="Movie Genres" />

      <Submit value="Add New Movie"/>
    </div>
  );
};
