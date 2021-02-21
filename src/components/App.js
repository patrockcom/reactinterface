import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

class App extends Component {

  constructor() {
    super();
    this.state = {
      myAppointmnents: [],
      lastIndex: 0
    }
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
       const apts = result.map(item => {
         item.aptID = this.state.lastIndex;
         this.setState({ lastIndex: this.state.lastIndex +1})
         return item;
      });
      this.setState({
        myAppointmnents: apts
      });
  });
}  

  render() {

    // const listItems = this.state.myAppointmnents.map(item => (
    //   <div>
    //     <div>{item.petName}</div>
    //     <div>{item.ownerName}</div>
    //   </div>
    // ));  

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointmnents} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;