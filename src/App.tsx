import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from "./common/TableComponent";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import RequireAuth from "./authorization/RequireAuth";
import { useState } from "react";
import { AppContext } from "./context/appContext";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import DummyPage from "./pages/DummyPage/DummyPage";
import CategoryPage from "./pages/ProductCategory/CategoryPage";
import SellingPost from "./pages/SellingPost/SellingPost";
import ShowAd from "./pages/ShowAds/ShowAd";
import AdDetailsCard from './components/AdCard/AdDetailsCard';
import AdDetails from './pages/AdDetailsPage/AdDetails';
import AdBidding from './pages/AdBidding/AdBidding';

const App: React.FC = () => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});

  return (
    <div className="min-h-screen">
      {/* <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}> */}
      <AppContext.Provider value={{ currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
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
      </AppContext.Provider>
    </div>
  );
}

export default App;