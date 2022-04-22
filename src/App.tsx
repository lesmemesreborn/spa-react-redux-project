import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Modal from './components/Modal'
import Main from './pages/Main'
import News from './pages/News'
import {useSelector, useDispatch} from "react-redux";
import {RootState} from './redux/index'
import './App.css';

function App() {
  const showModal = useSelector((state: RootState) => state.toolkit.showModal)


  return (
    <div className="app">
      <BrowserRouter>
        {showModal && <Modal />}
        <Header />
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path={"/news"} element={<News />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
