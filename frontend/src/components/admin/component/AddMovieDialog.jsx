import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { uploadTrailer } from "../../../api/movie";
import { useNotification } from "../../../hooks";

export default function AddMovieDialog() {
  const { updateNotification } = useNotification();
  const [typeError, setTypeError] = useState(false);
  const handleChange = (file) => {
    setTypeError(false);
    const formData = new FormData();
    formData.append("video", file);
    uploadTrailer(formData);
  };
  const handleError = (err) => {
    updateNotification("error", err);
    setTypeError(true);
  };
  return (
    <FileSelect visible={true} handleChange={handleChange} onTypeError={handleError} typeError={typeError} />
  );
}
const FileSelect = ({ visible, handleChange, onTypeError, typeError }) => {
  // const [file, setFile] = useState(null);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white w-[45rem] overflow-auto rounded relative">
        <div className="w-full bg-gray-200 h-1.5 dark:bg-gray-700 absolute top-0">
          <div
            className="bg-blue-600 h-1.5 dark:bg-blue-500"
            style={{ width: "78%" }}
          ></div>
        </div>
        <button className="absolute top-3 right-2 bg-white bg-opacity-50 rounded-full">
          <GrClose className="p-1.5" size={30} />
        </button>
        <FileUploader
          classes="file_drop_zone"
          handleChange={handleChange}
          onTypeError={onTypeError}
          hoverTitle="Drop your file here"
          name="file"
          types={["mp4", "mov", "mkv"]}
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
                <FiAlertTriangle className="mr-3 text-lg text-red-600" /> File
                type not supported.
              </div>
            ) : null}
            <button className="bg-blue-400 px-5 py-2 rounded text-black font-semibold">
              Select File
            </button>
          </div>
        </FileUploader>
      </div>
    </div>
  );
};
