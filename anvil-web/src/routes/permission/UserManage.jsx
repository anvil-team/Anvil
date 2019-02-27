/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-02-27 22:31:10
 * 用户管理
 */

import React from 'react';
import { connect } from 'react-redux';
import { Table, Divider, Form, Input, Button } from 'antd';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'src/components/UI/SearchBox';

class UserManage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchUserList' });
  }

  render() {
    const { userState, form } = this.props;
    const { userList, pagination } = userState;
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
}))(Form.create()(UserManage));
