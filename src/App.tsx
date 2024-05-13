import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import { Homepage, Transactions } from "./containers";
import { routes } from "./utils/routes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.homepage} element={<Homepage />} />
          <Route path={routes.transactions} element={<Transactions />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
