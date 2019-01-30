import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { cache, httpLink, authLink } from './apollo/client';
import { ApolloClient, ApolloLink } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';

class Root extends Component {
  render() {
    const client = new ApolloClient({ cache, link: ApolloLink.from([authLink,httpLink]) });
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
