/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-03 23:27:30
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-01-09 22:36:39
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { routes } from './routes/router';
import AuthRoute from 'components/AuthRoute';
import BasicLayout from './layouts/BasicLayout';
import './app.scss';

class App extends React.Component {
  render() {
    const { store, history, persistor } = this.props;

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
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
                          route.children.map((sub) => (
                            <DocumentTitle title={this.prefixTitle(sub.title)} key={sub.path}>
                              <AuthRoute
                                {...props}
                                path={route.path + sub.path}
                                redirect="/login"
                                render={(props) => <sub.component {...props} />}
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
        </PersistGate>
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
