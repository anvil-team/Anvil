/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-03 23:27:30
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-12-20 20:28:10
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { ConnectedRouter } from 'connected-react-router';
import { routes } from './routes/router';
import AuthRoute from './components/AuthRoute';
import BasicLayout from './layouts/BasicLayout';
import './app.scss';


class App extends React.Component {
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            {routes.map((route) =>
              route.redirect ? (
                <Redirect key={route.path} to={{ pathname: route.redirect }} />
              ) : route.auth ? (
                <Route
                  key={route.path}
                  path={route.path}
                  render={(props) => (
                    <BasicLayout {...props}>
                      {route.children ? (
                        route.children.map((subRoute) => (
                          <DocumentTitle title={this.prefixTitle(subRoute.title)} key={route.path}>
                            <AuthRoute
                              {...props}
                              path={subRoute.path}
                              redirect="/login"
                              render={(props) => <subRoute.component {...props} />}
                            />
                          </DocumentTitle>
                        ))
                      ) : (
                        <DocumentTitle title={this.prefixTitle(route.title)}>
                          <route.component {...props} />
                        </DocumentTitle>
                      )}
                    </BasicLayout>
                  )}
                />
              ) : (
                <Route
                  exact
                  key={route.path}
                  path={route.path}
                  render={(props) => (
                    <DocumentTitle title={this.prefixTitle(route.title)}>
                      <route.component {...props} />
                    </DocumentTitle>
                  )}
                />
              )
            )}
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }

  checker = () => {
    return sessionStorage.token;
  };

  prefixTitle = (title) => {
    return `Anvil - ${title}`;
  };
}

export default App;
