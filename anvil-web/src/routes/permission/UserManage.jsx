/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-02-26 13:39:22
 * 用户管理
 */

import React from 'react';
import { connect } from 'react-redux';
import { Table, Divider } from 'antd';
import BlankContent from 'src/layouts/BlankContent';

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
        <BlankContent>
          <Table
            rowKey="username"
            dataSource={userList}
            columns={this.getColumns()}
            pagination={{ showQuickJumper: true, showSizeChanger: true, ...pagination }}
          />
        </BlankContent>
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
      {
        title: '操作',
        width: 200,
        render: () => {
          return (
            <>
              <a>编辑</a>
              <Divider type="vertical" />
              <a>分配项目</a>
              <Divider type="vertical" />
              <a>删除</a>
            </>
          );
        },
      },
    ];
  };
}

export default connect((state) => ({
  userState: state.userState,
}))(UserManage);
