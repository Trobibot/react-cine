import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import MovieList from './pages/MovieList'
import MovieDetail from './pages/MovieDetail'
import HomePage from './pages/HomePage'

import NavBar from './components/NavBar'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Box sx={{ minWidth: '500px', maxWidth: '800px', width: '60%', margin: 'auto', marginTop: '128px' }}>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="movies/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
    </Box>
);
