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
          <CardImg top width="100%" src={this.props.user["image_url"]} alt="Card image cap" />
          <CardBody>
            <CardTitle>{this.props.user["user_name"]}</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText><pre>{JSON.stringify(this.props.user, null, 2)}</pre></CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
};

export default ProfileCard;
