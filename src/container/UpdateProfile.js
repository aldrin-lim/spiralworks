import React, { Component } from 'react'
import { Alert, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserGQL from '../graphql/User';
import { Mutation, Query } from 'react-apollo';
import User from '../graphql/User';
export default class UpdateProfile extends Component {
  submit = (mutation, profile, e) => {
    e.preventDefault()
    const { email, password } = this.state;
    const input = {"profile": profile};
    const keys = ["firstname", "lastname","age", "gender"];
    keys.map(item => { if (this.state[item]) input.profile[item] = this.state[item] });
    mutation({ variables: {"id": sessionStorage.getItem("id"), input } }).then(async result => {
      console.log(result)
    });
  }
  onChange = (id, { target: { value } }) => {
    this.setState({ [id]: value });
  }
  render() {
    return (
      <Row >
        <Query query={UserGQL.query.user} variables={{ id: sessionStorage.getItem("id") }}>
          {(query) => {
            if (query.loading) return "Loading"
            if (query.error) return JSON.stringify(query.error)
            return <Mutation mutation={UserGQL.mutation.updateUser} refetchQueries={[{query: UserGQL.query.users}, {query: UserGQL.query.user, variables:{ id: sessionStorage.getItem("id") }}]}>
              {(updateUser, { data, error, loading }) => {
                return <Col xs={{ size: 10, order: 2, offset: 1 }} sm={{ size: 10, order: 2, offset: 1 }} md={{ size: 4, order: 3, offset: 4 }} lg={{ size: 4, order: 3, offset: 4 }}>
                  <Form onSubmit={this.submit.bind(this, updateUser, query.data.user.profile)}>
                  <h1 className="text-center">--UPDATE PROFILE--</h1>
                    {error && <Alert color="danger">Something went wrong. Please Try Again</Alert>}
                    { data && <Alert color="success">Profile Updated!  <a style={{color: "inherit"}} href="#" onClick={() => this.props.history.push("/login")}> <strong>Return</strong></a></Alert> }
                    <FormGroup>
                      <Label>First Name</Label>
                      <Input defaultValue={query.data.user.profile.firstname} onChange={this.onChange.bind(this, "firstname")} disabled={loading} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Input defaultValue={query.data.user.profile.lastname} onChange={this.onChange.bind(this, "lastname")} disabled={loading} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Age</Label>
                      <Input type="number" defaultValue={query.data.user.profile.age} onChange={({target: {value}}) => this.setState({age: parseInt(value)})} disabled={loading} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Gender</Label>
                      <Input defaultValue={query.data.user.profile.gender} onChange={this.onChange.bind(this, "gender")} disabled={loading} />
                    </FormGroup>
                    <FormGroup>
                      <Button type="submit" disabled={loading} block onClick={this.submit.bind(this, updateUser, query.data.user.profile)} color="primary">Update</Button>
                      <Button disabled={loading} block onClick={() => this.props.history.push("/")}  >Cancel</Button>
                    </FormGroup>
                  </Form>
                </Col>
              }}
            </Mutation>
          }}
        </Query>

      </Row>
    )
  }
}
