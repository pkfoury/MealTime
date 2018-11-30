import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { apiPost, apiGet } from '../functions/Api';
import axios from 'axios';

class GoalsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calories: null,
      carbs: null,
      fat: null,
      money: null,
      protein: null,
      weight: null
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
    apiPost('user_goals/update', this.state).then((res) => {
      if(res.status === 200) {
        window.location.reload();
      } else {
        window.alert("Upload error");
      }
    })
  }

  render() {
    return (
      <div className="GoalsCard">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Calories</Label>
            <Input type="number" name="calories" onChange={e => this.handleChange(e)} placeholder={this.props.goals['calories']} />
          </FormGroup>
          <FormGroup>
            <Label>Carbohydrates</Label>
            <Input type="number" name="carbs" onChange={e => this.handleChange(e)} placeholder={this.props.goals['carbs']} />
          </FormGroup>
          <FormGroup>
            <Label>Fat</Label>
            <Input type="number" name="fat" onChange={e => this.handleChange(e)} placeholder={this.props.goals['fat']} />
          </FormGroup>
          <FormGroup>
            <Label>Protein</Label>
            <Input type="number" name="protein" onChange={e => this.handleChange(e)} placeholder={this.props.goals['protein']} />
          </FormGroup>
          <FormGroup>
            <Label>Weight</Label>
            <Input type="number" name="weight" onChange={e => this.handleChange(e)} placeholder={this.props.goals['weight']} />
          </FormGroup>
          <FormGroup>
            <Label>Money</Label>
            <Input type="number" name="money" onChange={e => this.handleChange(e)} placeholder={this.props.goals['money']} />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default GoalsCard;