import React from 'react'
import { Form, Button, Input, Icon } from 'antd'
import styles from './index.module.scss'

class Login extends React.Component {
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

export default Form.create()(Login)
