import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import SettingsPage from "./Pages/SettingsPage";
import ProfilePage from "./Pages/ProfilePage";
import { UseAuthStore } from "./Store/UseAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { UseThemeStore } from "./Store/UseThemeStore";
import { UseChatStore } from "./Store/UseChatStore";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = UseAuthStore();
  const {theme ,setTheme} = UseThemeStore()


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className=" flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme = {theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={<SettingsPage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
