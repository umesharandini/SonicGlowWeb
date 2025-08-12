import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import Home from './pages/Home';
import Section1 from './pages/Section1';
import Predefined from './pages/Predefined';
import Userdefined from './pages/Userdefined';
import UserText from './pages/UserText';
import UserPattern from './pages/UserPattern';
import Text from "./pages/Textbox";
import Resources from './pages/Resources';
import SonicGlow from './pages/SonicGlow';
import About from './pages/About';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section1" element={<Section1 />} />
        <Route path="/Predefined" element={<Predefined />} /> {/* Changed from /predefined2 */}
        <Route path="/userdefined" element={<Userdefined />} />
        <Route path="/userText" element={<UserText />} />
        <Route path="/userPattern" element={<UserPattern />} />
        <Route path="/text" element={<Text/>}/>
         <Route path="/resources" element={<Resources />} />
         <Route path="/cube" element={<SonicGlow />} />
         <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}


export default App;