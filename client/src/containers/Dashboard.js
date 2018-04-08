import React, { Component } from 'react';
import InfoBox from '../components/InfoBox';
import Auth from '../utils/Auth';
import axios from 'axios';

class Dashboard extends Component {
  state = {
    message: ''
  };

  componentDidMount() {
    axios
      .get('/api/v1/stats', {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`
        }
      })
      .then(response => {
        this.setState({
          message: response.data.message
        });
      })
      .catch(error => {
        this.setState({
          message: 'Unable to get stats'
        });
      });
  }

  render() {
    return (
      <InfoBox>
        <div>
          <h3>
            Hey {localStorage.getItem('username')}! Here you can view a lot of
            stats!!!
          </h3>
        </div>
        <div>Example: {this.state.message}</div>
      </InfoBox>
    );
  }
}

export default Dashboard;
