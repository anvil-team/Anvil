import React from 'react'
import { Form, Button, Input, Icon } from 'antd'
import { connect } from 'react-redux'
import styles from './index.module.scss'

class Login extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'login/say', payload: '是咖啡机可大幅度' })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <>
        <Form className={styles.loginForm}>
          <div className={styles.loginTitle}>Login For Anvil</div>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'please input your username' }],
            })(<Input prefix={<Icon type="user" />} placeholder="input your username" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'please input your password' }],
            })(
              <Input
                type="password"
                prefix={<Icon type="lock" />}
                placeholder="input your password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" className={styles.loginBtn} onClick={this.handleLogin}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }

  handleLogin = () => {
    const { history } = this.props
    history.push('/dashboard')
  }
}

const mapStateToProps = (state) => ({ login: state.login })

export default connect(mapStateToProps)(Form.create()(Login))
