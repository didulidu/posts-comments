import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';
import { PostsProvider } from './context/PostsContext';

const App = () => {
  return (
    <PostsProvider >

      <Router>
        <Routes>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Routes>
      </Router>
    </PostsProvider>
  );
};

export default App;
