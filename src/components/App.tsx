import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import DetailedPost from './DetailedPost';
import "../styles/app.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route path="/:postId" element={<DetailedPost/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
