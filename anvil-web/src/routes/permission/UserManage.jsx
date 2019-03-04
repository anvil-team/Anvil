/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-04 22:41:48
 * 用户管理
 */

import React from 'react';
import { connect } from 'react-redux';
import { Divider, Form, Input, Button } from 'antd';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'src/components/UI/SearchBox';
import UserTableForm from './components/UserTableForm';

class UserManage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchUserList' });
  }

  render() {
    const { userState, form } = this.props;
    const { userList } = userState;
    const { getFieldDecorator } = form;

    return (
      <>
        <BlankContent>
          <SearchBox>
            <Form layout="inline">
              <Form.Item>{getFieldDecorator('keyword')(<Input placeholder="请输入" />)}</Form.Item>
              <Form.Item>
                <Button type="primary">搜索</Button>
              </Form.Item>
            </Form>
          </SearchBox>
          <UserTableForm
            value={userList}
            pagination={false}
            onChange={this.handleTableFormChange}
          />
        </BlankContent>
      </>
    );
  }

  handleTableFormChange = (form) => {
    console.log(form);
  };

  handleToAddUser = () => {
    const { dispatch } = this.props;

    dispatch({ type: 'user/setState', payload: { editVis: true } });
  };
}

export default connect((state) => ({
  userState: state.userState,
}))(Form.create()(UserManage));
