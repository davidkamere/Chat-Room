import React from 'react';

import Chat from "./Components/Chat/chat";
import Join from "./Components/Join/join";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Join/>}/>
                <Route path="/chat" element={<Chat/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;