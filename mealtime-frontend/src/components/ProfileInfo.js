import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { apiPost, apiGet } from '../functions/Api';
import axios from 'axios';

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      allergies: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const file = document.getElementById('profile-pic').files[0];
    if(file) {
      apiGet('aws').then( ({data}) => {
        console.log(data);
        axios.put(data, file).then( (res) => {
          if(res.status === 200) {
            window.location.reload();
          } else {
            window.alert("Upload error");
          }
        })
      })
    }
    apiPost('profile', this.state).then((res) => {
      window.alert("Wait for page to refresh!");
      if(res.status === 200) {
        window.location.reload();
      } else {
        window.alert("Upload error");
      }
    })
  }

  render() {
    return (
      <div className="ProfileInfo">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" onChange={e => this.handleChange(e)} placeholder={this.props.user["email"]} />
          </FormGroup>
          <FormGroup>
            <Label>Allergens</Label>
            <Input type="text" name="allergens" onChange={e => this.handleChange(e)} placeholder={"nuts, shellfish, etc."} />
          </FormGroup>
          <FormGroup>
            <Label>Profile image</Label>
            <Input type="file" name="file" id="profile-pic" onChange={e => this.handleChange(e)} />
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