import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

class CategoryManage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'category/getList' });
  }

  render() {
    const { categoryState } = this.props;

    return <Table rowKey="id" columns={this.getColumns()} dataSource={categoryState.list} />;
  }

  getColumns = () => {
    return [
      { title: 'ID', dataIndex: 'id' },
      { title: '父节点ID', dataIndex: 'parent_id' },
      { title: '菜单名称', dataIndex: 'categoryName' },
      { title: '地址', dataIndex: 'url' },
      { title: '优先级', dataIndex: 'priority' },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (text) => <span>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</span>,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        render: (text) => <span>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</span>,
      },
    ];
  };
}

export default connect(({ categoryState }) => ({ categoryState }))(CategoryManage);
