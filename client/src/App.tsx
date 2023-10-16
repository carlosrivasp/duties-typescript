import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DutyForm from "./components/DutyForm";
import DutiesList from "./components/DutiesList";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" Component={DutiesList}  />
        <Route path="/new-duty" Component={DutyForm} />
        <Route path="/edit-duty/:id" Component={DutyForm} />
      </Routes>
    </Router>
  );
}

export default App;
