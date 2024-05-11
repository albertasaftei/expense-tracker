import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./containers/Homepage";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
