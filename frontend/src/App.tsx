import { Routes, Route } from "react-router-dom";
import Form from "./components/Form/FormComponet";
import DashboardLayoutAccount from "./components/DashboardLayout/DashboardLayoutComponent";
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/home" element={<DashboardLayoutAccount />} />
    </Routes>
    </Provider>
  );
}

export default App;
