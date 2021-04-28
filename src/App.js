import './App.css'; 
import Customers from './components/Customers';  
import ShowTrainings from './components/ShowTrainings'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
       <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            PersonalTrainer
          </Typography>
        </Toolbar>
      </AppBar>   
      <Switch> 
        <Route exact path="/">
        <Customers />
        </Route>
      </Switch>    
      <ShowTrainings />
    </div> 
    </Router>
  );
}

export default App;
