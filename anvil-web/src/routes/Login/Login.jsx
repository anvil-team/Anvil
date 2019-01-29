import React from 'react';
import { Form, Button, Input, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import styles from './index.scss';

class Login extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { login, tips } = this.props.loginState;
    return (
      <>
        <Form className={styles.loginForm}>
          <Spin indicator={<Icon type="loading" />} size="large" spinning={login} tip={tips}>
            <div className={styles.loginTitle}>Login For Anvil by anvil</div>
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
              <Button
                loading={login}
                type="primary"
                className={styles.loginBtn}
                onClick={this.handleLogin}
              >
                Login
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </>
    );
  }

  handleLogin = () => {
    const { dispatch, form } = this.props;
    form.validateFields((errs, values) => {
      if (!errs) {
        dispatch({ type: 'login/auth', payload: values });
      }
    });
  };
}

const mapStateToProps = (state) => ({ loginState: state.loginState });

export default connect(mapStateToProps)(Form.create()(Login));
