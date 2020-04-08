import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Start from './components/Start';
import Settings from './components/Settings';
import Navbar from './components/NavBar';
import Users from './components/Users';
import Home from './components/Home'
 
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
             <Route path="/home" component={Home}/>
           </Switch>
        </div> 
      </BrowserRouter>
      </div>    
       
    );
  }
}
 
export default App;