import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import { without } from "lodash";
import { FaThemeisle } from 'react-icons/fa';

class App extends Component {

  constructor() {
    super();
    this.state = {
      myAppointmnents: [],
      formDisplay: false,
      orderBy: 'aptDate',
      orderDir: 'asc',
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
  }
toggleForm() {
  this.setState({
    formDisplay: !this.state.formDisplay
  })
}

addAppointment(apt) {
  let tempApts = this.state.myAppointmnents;
  apt.aptId = this.state.lastIndex;
  tempApts.unshift(apt);
  this.setState({
    myAppointmnents: tempApts,
    lastIndex: this.state.lastIndex + 1
  });
}

  deleteAppointment(apt) {
      let tempApts = this.state.myAppointmnents;
      tempApts = without(tempApts, apt);

      this.setState({
        myAppointmnents: tempApts
      });
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
    
    let order;
    let filteredApts = this.state.myAppointmnents;
    if(this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts.sort((a,b) => {
      if (a[this.state.orderBy].toLowerCase() < 
        b[this.state.orderBy].toLowerCase()
      ) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    });


    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments 
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment = {this.addAppointment}
                />
                <SearchAppointments />
                <ListAppointments appointments={filteredApts}
                  deleteAppointment={this.deleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;