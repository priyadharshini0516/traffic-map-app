// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationScreen from './components/LocationScreen';
import MapView from './components/MapView';
// Your live tracking map component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocationScreen navigate={(path) => window.location.href = path} />} />
        <Route path="/map" element={<MapView />} />
        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
