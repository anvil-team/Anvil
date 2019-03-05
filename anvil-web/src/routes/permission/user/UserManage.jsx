/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-05 21:43:40
 * 用户管理
 */

import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'src/components/UI/SearchBox';
import UserTableForm from './UserTableForm';
import DistributionProjectModal from './DistributionProjectModal';

class UserManage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchUserList' });
    dispatch({ type: 'user/fetchRoleComboList' });
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
          <UserTableForm value={userList} pagination={false} />
        </BlankContent>
        <DistributionProjectModal onClose={this.handleClose('distributionVis')} />
      </>
    );
  }

  handleClose = (field) => () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/setUserVis', payload: { data: { [field]: false } } });
  };
}

export default connect((state) => ({
  userState: state.userState,
}))(Form.create()(UserManage));
