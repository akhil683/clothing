import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/Authentication/Authentication.component";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/Shop.component";
import Checkout from "./components/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={ <Checkout/> } />        
      </Route>
    </Routes>
  );
};

export default App;
