import {
  HashRouter as Router,
  Route
} from "react-router-dom";


import './App.css';
import Header from './components/Header'
import TasksListPage from './pages/TasksListPage'
import ProjectsListPage from './pages/ProjectsListPage'
import TaskPage from './pages/TaskPage'
import ProjectPage from './pages/ProjectPage'

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Route exact path="/" exact component={ProjectsListPage} />
          <Route exact path="/:id/tasks" exact component={TasksListPage} />
          <Route exact path="/:id/tasks/:id" exact component={TaskPage} />
          <Route exact path="/:id/" component={ProjectPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
