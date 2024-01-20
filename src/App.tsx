import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import { PostsProvider } from './context/PostsContext';
import { MessageProvider } from './context/MessageContext';
import PostDetailPage from './pages/PostDetailPage';
// TODO
// - Testovi

const App = () => {
  return (
    <MessageProvider message="Hello from">
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
    </MessageProvider>
  );
};

export default App;
