import React, { Component } from 'react'
import { Alert, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserGQL from '../graphql/User';
import { Mutation } from 'react-apollo';
export default class Login extends Component {
  state = {
    email: "",
    password: ""
  }
  componentDidMount = () => {
    if (sessionStorage.getItem('access_token')){
      this.props.history.push("/");
    }
  }
  submit = (mutation, e) => {
    e.preventDefault()
    const { email, password } = this.state;
    mutation({ variables: { email, password } }).then(async result => {
      // to surely save the session to sessionStorage before going to the main app
      console.log(result.data.login)
      await (async () => sessionStorage.setItem('access_token', result.data.login))().then(() => this.props.history.push("/"));
      
    });
  }
  onChange = (id, { target: { value }}) => {
    this.setState({ [id]: value });
  }
  render() {
    return (
      <Row id="login_form">
        <Mutation mutation={UserGQL.mutation.login}>
          {(login, { data, error, loading }) => {
            return <Col xs={{ size: 10, order: 2, offset: 1 }} sm={{ size: 10, order: 2, offset: 1 }} md={{ size: 4, order: 3, offset: 4 }} lg={{ size: 4, order: 3, offset: 4 }}>
              <Form onSubmit={this.submit.bind(this, login)}>
                <h1 className="text-center">--LOG IN--</h1>
                { error && <Alert color="danger">Incorrect Credentials. Please Try Again</Alert> }
                <FormGroup>
                  <Label for="email_login">Email</Label>
                  <Input onChange={this.onChange.bind(this, "email")} disabled={loading} type="email" id="email_login" placeholder="Email Address" />
                </FormGroup>
                <FormGroup>
                  <Label for="password_login">Password</Label>
                  <Input  onChange={this.onChange.bind(this, "password")} disabled={loading} type="password" name="email" id="password_login" placeholder="Your Password" />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" disabled={loading} block onClick={this.submit.bind(this, login)} color="primary">Login</Button>
                  <Button disabled={loading} block onClick={() => this.props.history.push("/register")} color="success" >Register</Button>
                </FormGroup>
              </Form>
            </Col>
          }}
        </Mutation>
      </Row>
    )
  }
}
