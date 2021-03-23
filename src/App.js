import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateTask from "./CreateTaskForm";
import EditTask from "./EditTaskForm";
import List from "./List";

function App(props) {
  
  console.log(props);
  return (
      <Router>
        <center>
          <Link to="/create">Create</Link><span>  </span>
          <Link to="/">List</Link> <span>  </span>
          <Link to="/edit">Edit</Link>
        </center>
        <Switch>
          <Route path="/create">
            <CreateTask />
          </Route>
          <Route path="/edit/:cardId">
            <EditTask />
          </Route>
          <Route path="/">
            <List/>
          </Route>
        </Switch>
      
      </Router>
  );
}

export default App;
