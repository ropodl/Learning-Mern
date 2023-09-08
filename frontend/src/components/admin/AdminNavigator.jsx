import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import Actors from "./Actors";
import Dashbar from "./Dashbar";
import Dashboard from "./Dashboard";
import Movies from "./Movies";
import Navbar from "./Navbar";
import AddMovieDialog from "./component/AddMovieDialog";

export default function AdminNavigator() {
  return (
    <div>
      <div className="flex">
        <Dashbar />
        <div className="flex-1 max-w-screen-xl h-screen dark:bg-secondary">
          <div className="absolute bg-secondary"></div>
          <Navbar onAddMovieClick={() => console.log("adding movie")} />
          <AddMovieDialog />
          <div className="p-2">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/actors" element={<Actors />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
