import React, { Component } from 'react'
import { Button, Col, Row, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import UserGQL from '../graphql/User';
import { Query } from 'react-apollo';
import { parseJwt } from '../util';
import { Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import UpdateProfile from './UpdateProfile';
export default class Main extends Component {
  componentDidMount = () => {
    const jwtdata = parseJwt(sessionStorage.getItem("access_token"))
    console.log(jwtdata)
    sessionStorage.setItem("firstname", jwtdata.firstname);
    sessionStorage.setItem("id", jwtdata.id)
  }
  
  render() {
    // return to login if no token found
    if (!sessionStorage.getItem('access_token')) this.props.history.push("/login");
    return (
      <Row>
        <Col xs={{ size: 10, order: 2, offset: 1 }} sm={{ size: 10, order: 2, offset: 1 }} md={{ size: 6, order: 3, offset: 3 }} lg={{ size: 6, order: 3, offset: 3 }}>
          <Query query={UserGQL.query.users} fetchPolicy="cache-and-network">
            {({ data, error, loading }) => {
              if (loading) return "loading..."
              if (error) return JSON.stringify(error)
              return <Switch>
                <Route path="/" exact component={(props) => <Dashboard {...props} data={data} />} />
                <Route path="/update-profile" exact component={UpdateProfile} />
              </Switch>
            }}
          </Query>
        </Col>

      </Row>
    )
  }
}
