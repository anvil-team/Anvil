import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isDev from 'src/utils/isDev'

class AuthRoute extends React.PureComponent {
  state = {
    isPermissions: false,
  }

  checkPermissions = async () => {
    const { checker } = this.props
    let resultValue = checker
    if (typeof checker === 'function') {
      resultValue = await checker()
    }
    this.setState({
      isPermissions: isDev() ? true : resultValue ? true : false,
    })
  }

  render() {
    const { isPermissions } = this.state
    const { component: Component, redirect } = this.props
    return (
      <Route
        exact
        render={(props) =>
          isPermissions ? (
            Component ? (
              <Component {...props} />
            ) : null
          ) : (
            <Redirect to={{ pathname: redirect, state: { from: props.location } }} />
          )
        }
      />
    )
  }
}

export default AuthRoute
