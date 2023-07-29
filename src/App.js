import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import './styles/formRate.css'
import Homepage from './screens/Homepage';
import ViewDetail from './screens/ViewDetail';
import ChapterContent from './screens/ChapterContent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/detail/:sid' element={<ViewDetail />} />
          <Route path='/detail/:sid/chapter/:cid' element={<ChapterContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
