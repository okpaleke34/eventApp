import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './pages/Home';
import Event from './pages/Event';
import AddEvent from './pages/AddEvent';

class App extends Component{ 
  state = { 
    loading: true
   }
  componentDidMount() { 
    this.setState({loading:false})
  } 
  render() { 
    const { loading } = this.state; 
    if(loading) { 
        return <div>Page is load.....</div>;
    } 
    return (
      <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-event" component={AddEvent} />
          <Route exact path="/view/:id" 
            render={(props) =>(
              <Event key={props.match.params.id} {...props} />
            )} 
          />
      </Router>
    )
  } 
} 

export default App;