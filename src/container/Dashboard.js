import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import { Query } from 'react-apollo';
import User from '../graphql/User';
export default class Dashboard extends Component {
  logout = () => {
    sessionStorage.removeItem('access_token');
    this.props.history.push("/login")
  }
  render() {
    return (
      <div>
        <div className="mt-3 mb-3">
         
          <Query query={User.query.user} variables={{id: sessionStorage.getItem("id")}} fetchPolicy="cache-and-network">
            {({data, error, loading}) => {
              if (loading ) return "...";
              if (error) return "Error fetching data";
              return data.user.profile && data.user.profile.firstname ? <div>Hello, <strong>{data.user.profile.firstname}</strong></div> : <div>You didn't update your profile yet. <a href="#" onClick={() => this.props.history.push("/update-profile")}>Please Update</a></div>
            }}
          </Query>
        </div>
        <div className="mb-3">
          <ListGroup>
            <ListGroupItem active tag="a" href="#" action>All User(s) <Badge>{this.props.data.users.length}</Badge></ListGroupItem>
            {
              this.props.data.users.map(item => <ListGroupItem tag="a" href="#" action>{item.email}({Object.keys(item.profile).length > 0 ? item.profile.firstname : <i>No Profile</i>})</ListGroupItem>)
            }
          </ListGroup>
          <Button onClick={this.logout} block>Logout</Button>
        </div>
      </div>
    )
  }
}
