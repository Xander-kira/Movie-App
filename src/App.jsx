import { useState } from 'react'
import React from "react";
import MovieApp from "./Components/MovieApps";
import TopRatedMovies from "./Components/TopRatedMovie";
import './App.css'

function App() {
 

  return (
    <>
       <MovieApp />;
       <TopRatedMovies/>
    </>
  )
}

export default App
