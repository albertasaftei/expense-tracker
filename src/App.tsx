import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import "./index.css";
import { Homepage, Transactions } from "./containers";
import { routes } from "./utils/routes";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path={routes.homepage} element={<Homepage />} />
            <Route path={routes.transactions} element={<Transactions />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
