import { Routes, Route } from "react-router-dom";
import Form from "./components/Form/FormComponet";
import DashboardLayoutAccount from "./components/DashboardLayout/DashboardLayoutComponent";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/home" element={<DashboardLayoutAccount />} />
      </Routes>
    </Provider>
  );
}

export default App;
