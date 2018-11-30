import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class ProfileCard extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Card>
          <CardImg top src={this.props.user["image_url"]} alt="Card image" />
          <CardBody>
            <CardTitle>Hello {this.props.user["user_name"]}</CardTitle>
            <CardSubtitle>Hope you're having a great day.</CardSubtitle>
            { this.props.main == 'true' ? <Button href="/profile">Profile</Button> 
              : <pre><CardText>{JSON.stringify(this.props.user, null, 2)}</CardText></pre> }
          </CardBody>
        </Card>
      </div>
    )
  }
};

export default ProfileCard;
