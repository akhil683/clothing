import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/Authentication/Authentication.component";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/Shop.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
