import React, { Component } from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import Login from '../panel/login';
import Signup from '../panel/signup';
import Admin from '../admin/admin';
import Viewarea from '../user/viewarea';
import Viewbooked from '../user/viewbooked';
import User from '../admin/user';
import Feedbacks from '../admin/feedback';
import Booking from '../admin/bookings';
import Userfeedback from '../user/feedback.js';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
    <div>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin} />
          <Route path="/viewarea" component={Viewarea} />
          <Route path="/viewbooked" component={Viewbooked} />
          {/* <Route path="/parkingarea1" component={Parking1} />
          <Route path="/parkingarea2" component={Parking2} />
          <Route path="/parkingarea3" component={Parking3} /> */}
          <Route path="/feedback" component={Feedbacks} />
          <Route path="/userdetails" component={User} />
          <Route path="/bookings" component={Booking} />
          <Route path="/userfeedback" component={Userfeedback} />

    </div>
      </BrowserRouter>
    );
  }
}

export default App;
