import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { apiPost } from '../functions/Api';

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      allergies: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    apiPost('/profile', this.state).then( (req, res) => {
      console.log(res);

    })
  }

  render() {
    return (
      <div className="ProfileInfo">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" onChange={e => this.change(e)} placeholder={this.props.user["email"]} />
          </FormGroup>
          <FormGroup>
            <Label>Allergens</Label>
            <Input type="text" name="allergens" onChange={e => this.change(e)} placeholder={"nuts, shellfish, etc."} />
          </FormGroup>
          <FormGroup>
            <Label>Profile image</Label>
            <Input type="file" name="file" id="profile-pic" />
            <FormText color="muted">
              Upload a profile picture here.
          </FormText>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default ProfileInfo;