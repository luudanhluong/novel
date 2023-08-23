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
import AddEditStory from './components/author/AddEditStory/AddEditStory';
import MyListStory from './screens/user/MyListStory/MyListStory';
import Feedback from './screens/user/feedback/Feedback';

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
          <Route path='/author/addeditstory' element={<AddEditStory />} />
          <Route path='/author/mystory' element = {<MyListStory /> } />
          <Route path='/author/mystory/feedback/:sid' element = {<Feedback />}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
