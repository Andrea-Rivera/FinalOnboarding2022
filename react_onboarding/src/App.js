import { Navbar } from "./components/Navbar";
import { Customer } from "./components/Customers/CustomerIndex";
import { ProductIndex } from "./components/Products/ProductIndex";
import { StoreIndex } from "./components/Stores/StoreIndex";
import { SalesIndex } from "./components/Sales/SalesIndex";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/customers" element={<Customer />} />
          <Route path="/products" element={<ProductIndex />} />
          <Route path="/stores" element={<StoreIndex />} />
          <Route path="/sales" element={<SalesIndex />} />
        </Routes>
      </Router>

      <p>
        Please select Customers, Products,Stores or Sales department to see more
        features of this application.
      </p>
    </div>
  );
}

export default App;
