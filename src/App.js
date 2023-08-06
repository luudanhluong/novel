import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import './styles/formRate.css'
import Homepage from './screens/Homepage';
import ViewDetail from './screens/ViewDetail';
import Login from './screens/Login';
import ChapterContent from './screens/ChapterContent';
import Register from './screens/Register';
import SearchStory from './screens/SearchStory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/detail/:sid' element={<ViewDetail />} />
          <Route path='/detail/:sid/chapter/:cid' element={<ChapterContent />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<SearchStory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
