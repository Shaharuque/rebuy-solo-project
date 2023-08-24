import TableComponent from "./common/TableComponent";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./component/Home/Home";
import Notes from "./component/Notes/Notes";
import Navbar from "./common/navbar/Navbar";
import RequireAuth from "./authorization/RequireAuth";
import Todo from "./component/ToDo/Todo";
import ChatMain from "./component/Chat/ChatMain";
import SignUp from "./component/Chat/Onboarding/SignUp";
import SignIn from "./component/Chat/Onboarding/SignIn";
import { useState } from "react";
import { AppContext } from "./context/appContext";

const App: React.FC = () => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});

  return (
    <div className="min-h-screen bg-[#edf3fc]">
      {/* <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}> */}
      <AppContext.Provider value={{ currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
        <Router>
          <Navbar></Navbar>
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/chat' element={<ChatMain></ChatMain>}></Route>
              <Route path="/register" element={<SignUp></SignUp>}></Route>
              <Route path="/login" element={<SignIn></SignIn>}></Route>
              <Route
                path="/notes"
                element={
                  <RequireAuth>
                    <Notes />
                  </RequireAuth>
                }
              >
              </Route>
              <Route path="/todo" element={<Todo />} />
            </Routes>
          </>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;