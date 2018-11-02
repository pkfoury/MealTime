import React, { Component } from 'react';
import './Profile.css';
import { Card, CardDeck } from 'reactstrap';
import ProfileCard from '../components/ProfileCard'
import ProfileInfo from '../components/ProfileInfo'
import { apiGet, apiPost } from '../functions/Api';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    apiGet('users').then ( ({data}) => {
      this.setState({
        user: data.data
      })
    }) 
  }

  render() {
    return (
      <div className="profile">
        <h1>Hello {this.state.user["user_name"]}!</h1>
        <CardDeck>
          <div className="card-profile">
            <ProfileCard page="profile" user={this.state.user}/>
          </div>
          <div className="card-profile__form">
            <Card>
              <div className="info-card">
                <h3>Edit information</h3>
                <ProfileInfo user={this.state.user} />
              </div>
            </Card>
          </div>
        </CardDeck>
      </div>
    );
  }
}

export default Profile;