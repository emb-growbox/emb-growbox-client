import Home from "./screens/Home";
import Navbar from "./comp/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Graphs from "./screens/Graphs";
import { useEffect, useState } from "react";
import fetchLastData from "./util/http";
import LinearProgress from "@mui/material/LinearProgress";
import Settings from "./screens/Settings";

function App() {
  const [sensorData, setSensorData] = useState();
  useEffect(() => {
    async function fetchSensorData() {
      const sensorData = await fetchLastData();
      setSensorData(sensorData);
    }
    fetchSensorData();
  }, []);
  
  if (!sensorData) {
    return <LinearProgress />;
  }
  return (
    <Router>
      <Navbar lastDate={sensorData.date} />
      <Routes>
        <Route path="/" exact element={<Home sensorData={sensorData}></Home>} />
        <Route path="/Graphs" exact element={<Graphs />} />
        <Route path="/Settings" exact element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
