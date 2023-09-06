import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../NotFound'
import Actors from "./Actors"
import Dashboard from "./Dashboard"
import Movies from "./Movies.jsx"


export default function AdminNavigator() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}
