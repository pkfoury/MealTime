import React, { Component } from 'react';
import './Profile.css';
import { Card, CardDeck, CardTitle, CardText, CardImg, CardImgOverlay, Button } from 'reactstrap';
import ProfileCard from '../components/ProfileCard'
import ProfileInfo from '../components/ProfileInfo'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "user"
    }
  }
  render() {
    return (
      <div className="profile">
        <h1>Hello {this.state.user}!</h1>
        <CardDeck>
          <div className="card-profile">
            <ProfileCard page="profile" />
          </div>
          <div className="card-profile__form">
            <Card>
              <div className="info-card">
                <h3>Edit information</h3>
                <ProfileInfo />
              </div>
            </Card>
          </div>
        </CardDeck>
      </div>
    );
  }
}

export default Profile;