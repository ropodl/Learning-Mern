import { useContext } from "react";
import { NotificationContext } from "../context/Notification";
import { ThemeContext } from "../context/ThemeProvider";

export const useTheme = () => useContext(ThemeContext);
export const useNotification = () => useContext(NotificationContext);
