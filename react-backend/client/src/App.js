import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Start from './components/Start';
import Settings from './components/Settings';
import Navbar from './components/NavBar';
import Users from './components/Users';
import Student_Home from './components/Home';
import TutorHome from './components/TutorHome';
import Matches from './components/Matches';
 
class App extends Component {
  render() {
    return (  
      <div>
        <BrowserRouter>
        <div>
          <Navbar />
            <Switch>
             <Route path="/" component={Start} exact/>
             <Route path="/settings" component={Settings}/>
             <Route path="/users" component={Users}/>
             <Route path="/student/home" component={Student_Home}/>
             <Route path="/tutor/home" component={TutorHome}/>
             <Route path="/matches" component={Matches}/>
           </Switch>
        </div> 
      </BrowserRouter>
      </div>    
       
    );
  }
}
 
export default App;