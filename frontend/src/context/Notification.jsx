import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeoutId;

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");

  const updateNotification = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);
    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      default:
        setClasses("bg-red-500");
        break;
    }
    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className={classes + " fixed top-0 left-1/2 -translate-x-1/2  rounded rounded-t-none z-50"}>
          <p className="text-white px-4 py-2 font-semibold">{notification}</p>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
