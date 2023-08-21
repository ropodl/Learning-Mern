import React from "react";

import AuthProvider from "./AuthProvider.jsx";
import NotificationProvider from "./Notification.jsx";
import ThemeProvider from "./ThemeProvider.jsx";

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
