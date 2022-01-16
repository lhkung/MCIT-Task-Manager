import {
  HashRouter as Router,
  Route
} from "react-router-dom";


import './App.css';
import Header from './components/Header'
import Project from './components/Project'
import TasksListPage from './pages/TasksListPage'
import TaskPage from './pages/TaskPage'
//import 'bootstrap/dist/css/bootstrap.css'


function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Project />
          <Route path="/" exact component={TasksListPage} />
          <Route path="/task/:id" component={TaskPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
