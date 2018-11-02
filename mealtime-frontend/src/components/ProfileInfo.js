import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { apiGet, apiPost } from '../functions/Api';

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {},
      password: {},
      allergies: {},
      dietaryBudget: {},
      financialBudget: {},
      favorites: {}
    }
  }

  submit(event) {
    event.preventDefault();
    apiGet('/users').then (({data}) => {
      console.log(data);
    })
  }

  render() {
    return (
      <div className="ProfileInfo">
        <Form onSubmit={this.submit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
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