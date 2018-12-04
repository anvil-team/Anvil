/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-03 23:27:30
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-12-04 23:17:37
 */
import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { routes, authRoutes } from './routes/router'
import AuthRoute from './components/AuthRoute'

class App extends React.Component {
  checker = () => {
    return sessionStorage.token
  }

  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} render={(props) => <route.component {...props} />} />
          ))}
          {authRoutes.map((route) =>
            route.redirect ? (
              <Redirect key={route.path} to={{ pathname: route.redirect }} />
            ) : (
              <AuthRoute
                key={route.path}
                checker={this.checker}
                component={route.component}
                redirect="/login"
              />
            )
          )}
        </Switch>
      </Router>
    )
  }
}

export default App
