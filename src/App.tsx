import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import DummyPage from "./pages/DummyPage/DummyPage";
import CategoryPage from "./pages/ProductCategory/CategoryPage";
import SellingPost from "./pages/SellingPost/SellingPost";
import ShowAd from "./pages/ShowAds/ShowAd";
import AdDetails from './pages/AdDetailsPage/AdDetails';
import AdBidding from './pages/AdBidding/AdBidding';
import MyCartPage from './pages/MyCart/MyCartPage';
import "./App.css";
import MyLikedItems from './pages/MyLikedItems/MyLikedItems';
import SuccessPage from './pages/PaymentPage/SuccessPage';
import MyDashboard from './components/MyDashboard/MyDashboard';

const App: React.FC = () => {

  return (
    <div className="min-h-screen ">
        <Router>
          <>
            <Routes>
              <Route path='/' element={<DummyPage></DummyPage>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/register" element={<Register></Register>}></Route>
              <Route path="/home" element={<Home />} />
              <Route path="/ads" element={<ShowAd></ShowAd>}></Route>
              <Route path="/ad/details/:id" element={<AdDetails></AdDetails>}></Route>
              <Route path='/item/bidding/:adId' element={<AdBidding></AdBidding>}></Route>
              <Route path='/cart' element={<MyCartPage></MyCartPage>}></Route>
              <Route path='/liked/items' element={<MyLikedItems></MyLikedItems>}></Route>
              <Route path='/my/dashboard' element={<MyDashboard></MyDashboard>}></Route>
              <Route path='/success' element={<SuccessPage></SuccessPage>}></Route>
              <Route
                path="/item/selling/categories"
                element={<CategoryPage></CategoryPage>}
              ></Route>
              <Route
                path="/item/selling/post/:category"
                element={<SellingPost></SellingPost>}
              ></Route>
              {/* <Route
                path="/notes"
                element={
                  <RequireAuth>
                    <Notes />
                  </RequireAuth>
                }
              >
              </Route>
              {/* <Route path="/todo" element={<Todo />} /> */}
            </Routes>
            <ToastContainer />
          </>
        </Router>
    </div>
  );
}

export default App;