import TableComponent from "./common/TableComponent";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./common/navbar/Navbar";
import RequireAuth from "./authorization/RequireAuth";
import { useState } from "react";
import { AppContext } from "./context/appContext";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import DummyPage from "./pages/DummyPage/DummyPage";

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
          </>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;