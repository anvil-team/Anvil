/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-03 23:27:30
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-12-06 17:27:26
 */
import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { routes } from './routes/router'
import AuthRoute from './components/AuthRoute'
import BasicLayout from './layouts/BasicLayout'
import './app.scss'

class App extends React.Component {
  render() {
    return (
      <Router>
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
      </Router>
    )
  }

  checker = () => {
    return sessionStorage.token
  }

  prefixTitle = (title) => {
    return `Anvil - ${title}`
  }
}

export default App
