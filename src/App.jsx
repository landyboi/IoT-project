import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './views/About';
import Home from './views/Home';

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Routes>
        </div>
    );
};

export default App;