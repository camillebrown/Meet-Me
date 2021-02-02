import { Switch, Route } from 'react-router-dom'

// Components imports
import Home from "./components/Home"
// HOC which wraps around other components
import Layout from "./components/common/Layout"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Profile from "./components/Profile"
import Event from "./components/Event"
import Calendar from "./components/Calendar"
import UpdateComment from "./components/UpdateComment"
import MyEvent from "./components/Saved Event/MyEvent"


// CSS imports
import "./css/App.css";

const App = () => {

  return (
    <Layout>
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/calendar" component={Calendar} />
        {/* <Route exact path="/profile/myevents/:id" component={CalendarEvent} />   */}
        <Route exact path="/event/comments/:id" component={MyEvent} />
        <Route exact path="/profile/newcomment" component={Event} />
        <Route exact path="/events/:id" component={Event} />
        <Route exact path="/event/updatedcomment/:id" component={UpdateComment} />
      </Switch>
    </Layout>
  );
   }



export default App;





    




