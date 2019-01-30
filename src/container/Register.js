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
    e.preventDefault();
    const { email, password, } = this.state;
    mutation({ variables: { email, password } }).then(async result => {
      // to surely save the session to sessionStorage before going to the main app
      // await (async () => sessionStorage.setItem('access_token', result.data.login))();
    });
  }
  onChange = (id, { target: { value }}) => {
    this.setState({ [id]: value });
  }
  render() {
    return (
      <Row id="login_form">
        <Mutation mutation={UserGQL.mutation.register}>
          {(register, { data, error, loading }) => {
            return <Col xs={{ size: 10, order: 2, offset: 1 }} sm={{ size: 10, order: 2, offset: 1 }} md={{ size: 4, order: 3, offset: 4 }} lg={{ size: 4, order: 3, offset: 4 }}>
              <Form onSubmit={this.submit.bind(this, register)}>
                <h1 className="text-center">--REGISTER--</h1>
                { error && <Alert color="danger">Something went wrong. Please Try Again</Alert> }
                { data && <Alert color="success">Success!  You can now <a style={{color: "inherit"}} href="#" onClick={() => this.props.history.push("/login")}> <strong>Login</strong></a></Alert> }
                <FormGroup>
                  <Label for="email_login">Email</Label>
                  <Input onChange={this.onChange.bind(this, "email")} disabled={loading} type="email"  placeholder="Email Address" />
                </FormGroup>
                <FormGroup>
                  <Label for="password_login">Password</Label>
                  <Input  onChange={this.onChange.bind(this, "password")} disabled={loading} type="password" name="email" id="password_login" placeholder="Desired Password" />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" disabled={loading} block onClick={this.submit.bind(this, register)} color="primary">Login</Button>
                  <Button disabled={loading} block onClick={() => this.props.history.push("/login")}  >Cancel</Button>
                </FormGroup>
              </Form>
            </Col>
          }}
        </Mutation>
      </Row>
    )
  }
}
