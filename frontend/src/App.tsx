import { Routes, Route } from "react-router-dom";
import Form from "./components/Form/FormComponet";
import DashboardLayoutAccount from "./components/DashboardLayout/DashboardLayoutComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/home" element={<DashboardLayoutAccount />} />
    </Routes>
  );
}

export default App;
