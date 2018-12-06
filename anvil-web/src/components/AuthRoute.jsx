import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isDev from 'src/utils/isDev'
import { Spin, Icon } from 'antd'

class AuthRoute extends React.PureComponent {
  state = {
    isPermissions: false,
  }

  componentDidMount() {
    this.checkPermissions()
  }

  checkPermissions = async () => {
    const { checker } = this.props
    let resultValue = checker
    if (typeof checker === 'function') {
      resultValue = await checker()
    }
    this.setState(
      {
        isPermissions: isDev() ? true : resultValue ? true : false,
      },
      () => {
        if (!this.state.isPermissions) {
          this.props.history.replace(this.props.redirect)
        }
      }
    )
  }

  render() {
    const { isPermissions } = this.state
    const { component: Component, render } = this.props
    return (
      <Route
        exact
        render={(props) =>
          isPermissions ? (
            Component ? (
              <Component {...props} />
            ) : (
              render(props)
            )
          ) : (
            <Spin size="large" indicator={<Icon type="loading" />} />
          )
        }
      />
    )
  }
}

export default AuthRoute
