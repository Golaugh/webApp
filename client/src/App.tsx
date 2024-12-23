import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import BookContext from "./contexts/BookContext";
import Cart from "./components/Cart";
import CheckoutPage from "./components/CheckoutPage";
import ConfirmationPage from "./components/ConfirmationPage";

function App() {


    return (
      <Router basename={"JianwenBookstoreReactTransact"}>
        <AppHeader/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/categories/:id" element={<BookContext><CategoryBookList /></BookContext>} />
            <Route path="/cart" element={<Cart />}/>
            <Route path="/checkout" element={<CheckoutPage />}/>
            <Route path="*" element={<div>Page Not Found</div>} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>

        <AppFooter />

      </Router>
  );
}

export default App;

