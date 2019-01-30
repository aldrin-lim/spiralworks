import React, { Component } from 'react'
import { Button, Col, Row } from 'reactstrap';
import UserGQL from '../graphql/User';
import { Query } from 'react-apollo';
import { parseJwt } from '../util';
export default class Main extends Component {
  componentDidMount = () => {
    sessionStorage.setItem("user",JSON.stringify(parseJwt(sessionStorage.getItem("access_token"))))
  }
  logout = () => {
    sessionStorage.removeItem('access_token');
    this.setState({}); // re-render
  }
  render() {
    // return to login if no token found
    if (!sessionStorage.getItem('access_token')) this.props.history.push("/login");
    return (
      <Row>
        <Col xs={{ size: 10, order: 2, offset: 1 }} sm={{ size: 10, order: 2, offset: 1 }} md={{ size: 4, order: 3, offset: 4 }} lg={{ size: 4, order: 3, offset: 4 }}>
          <Query query={UserGQL.query.users} fetchPolicy="cache-and-network">
            {({data, error, loading}) => {
              if (loading) return "loading..."
              if (error) return JSON.stringify(error)
              return "asd"
            }}
          </Query>
          <Button onClick={this.logout} block>test</Button>
        </Col>
        
      </Row>
    )
  }
}
