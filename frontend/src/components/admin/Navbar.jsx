import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../../hooks";

export default function Navbar({ onAddActorClick, onAddMovieClick }) {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();

  const options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

  return (
    <div className="flex items-center justify-between relative bg-primary p-3">
      <input type="text" className="border-2 border-white focus:opacity-70 dark:text-white transition bg-transparent rounded text-lg p-1 outline-none" placeholder="Search Movies..." />

      <div className="flex items-center space-x-3">
        <button onClick={toggleTheme} className="text-white">
          <BsFillSunFill size={24} />
        </button>
        <div className="relative">
          <button onClick={() => setShowOptions(true)} className="flex items-center space-x-2 dark:border-dark-subtle border-white text-white hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1">
            <span>Create</span>
            <AiOutlinePlus />
          </button>

          <CreateOptions visible={showOptions} onClose={() => setShowOptions(false)} options={options} />
        </div>
      </div>
    </div>
  );
}

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = "options-container";

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;

      if (parentElement.id === containerID || id === containerID) return;

      // New Update
      if (container.current) {
        if (!container.current.classList.contains("animate-scale")) container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id={containerID}
      ref={container}
      className="absolute right-0 top-12 flex flex-col py-1 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option onClick={onClick} key={title}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="dark:text-white text-secondary hover:opacity-80 transition px-4 py-2">
      {children}
    </button>
  );
};
