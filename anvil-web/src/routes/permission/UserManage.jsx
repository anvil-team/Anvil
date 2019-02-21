/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-02-21 09:33:37
 * 用户管理
 */

import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class UserManage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchUserList' });
  }

  render() {
    const { userState } = this.props;
    const { userList, pagination } = userState;

    return (
      <>
        <Table
          rowKey="username"
          dataSource={userList}
          columns={this.getColumns()}
          pagination={{ showQuickJumper: true, showSizeChanger: true, ...pagination }}
        />
      </>
    );
  }

  getColumns = () => {
    return [
      { title: 'ID', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'realName' },
      { title: '用户名', dataIndex: 'username' },
      { title: '部门信息', dataIndex: 'department' },
      { title: '职位', dataIndex: 'position' },
      { title: '角色编码', dataIndex: 'roleCode' },
      { title: '角色名称', dataIndex: 'roleName' },
    ];
  };
}

export default connect((state) => ({
  userState: state.userState,
}))(UserManage);
