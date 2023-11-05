import Navbar from "./Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./Home"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
