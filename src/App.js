import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
      <Route index element={<Public />} />
    </Routes>
  );
}

export default App;
