import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import { PostsProvider } from './context/PostsContext';
import PostDetailPage from './pages/PostDetailPage';
import withMessage from './components/withMessage';
import withLogger from './components/withLogger';
// TODO
// - Testovi

const App = () => {
  return (
    <PostsProvider >
      <Router>
        <Routes>
          <Route path={"/"} element={<PostsPage />} />
          <Route path={"/posts"} element={<PostsPage />} />
          <Route path="/post/:id" element={
            <PostDetailPage />
          } />
        </Routes>
      </Router>
    </PostsProvider>
  );
};

export default withMessage(withLogger(App));
