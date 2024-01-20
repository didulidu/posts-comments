import React, { Suspense } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import { PostsProvider } from './context/PostsContext';
import { MessageProvider } from './context/MessageContext';
import Loader from './components/Loader';
import PostDetailPageWrapper from './pages/PostDetailPageWrapper';
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
              <Suspense fallback={<Loader label="loading post..." />}>
                <PostDetailPageWrapper />
              </Suspense>
            } />
          </Routes>
        </Router>
      </PostsProvider>
    </MessageProvider>
  );
};

export default App;
