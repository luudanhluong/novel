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
import BoxChat from './screens/user/boxChat/BoxChat';
import ViewListChapter from './screens/user/Chapter/ViewListChapter';

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
          <Route path='/author/mystory/boxchat/:sid' element = {<BoxChat />}  />
          <Route path='/author/mystory/addeditchapter/:sid' element = {<ViewListChapter />}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
