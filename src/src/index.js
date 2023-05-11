import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import MovieList from './pages/MovieList'
import MovieDetail from './pages/MovieDetail'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Box sx={{ minWidth: '500px', maxWidth: '800px', width: '60%', margin: 'auto', marginTop: '64px' }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="movies/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
    </Box>
);
