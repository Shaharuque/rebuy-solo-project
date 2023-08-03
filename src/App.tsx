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

const App: React.FC = () => {

  return (
    <div className="min-h-screen bg-[#edf3fc]">
      
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
            <Route path="/todo" element={<Todo/>} />
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;