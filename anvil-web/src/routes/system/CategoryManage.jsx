import React from 'react';
import { Table, Popconfirm, Modal, Form, Input, InputNumber, Select } from 'antd';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

class CategoryManage extends React.Component {
  state = {
    visible: false,
    current: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'category/getList' });
  }

  render() {
    const {
      categoryState,
      form: { getFieldDecorator },
    } = this.props;
    const { visible } = this.state;

    return (
      <>
        <Table
          rowKey="id"
          columns={this.getColumns()}
          pagination={categoryState.pagination}
          dataSource={categoryState.list}
        />
        <Modal visible={visible} title="更新目录" onCancel={this.handleCancel}>
          <Form layout="vertical">
            <Form.Item label="名称" {...formItemLayout}>
              {getFieldDecorator('categoryName', {
                initialValue: categoryState.current?.categoryName,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="父级目录" {...formItemLayout}>
              {getFieldDecorator('parentId')(
                <Select>
                  {categoryState.list.map((c) => (
                    <Select.Option key={c.id} value={c.id}>
                      {c.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="优先级" {...formItemLayout}>
              {getFieldDecorator('priority', {
                initialValue: categoryState.current?.priority,
              })(<InputNumber precision={0} />)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }

  getColumns = () => {
    return [
      { title: 'ID', dataIndex: 'id' },
      { title: '父节点ID', dataIndex: 'parentId' },
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
      {
        title: '操作',
        render: (text, record) => (
          <div className="anvil-btn">
            <a onClick={this.handleToEdit(record)}>修改</a>
            <Popconfirm
              title="是否继续?"
              cancelText="取消"
              okText="确定"
              onConfirm={this.handleConfirmDelete(record)}
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        ),
      },
    ];
  };

  handleCancel = () => {
    this.setState((prevState) => ({ visible: !prevState.visible }));
  };

  handleToEdit = (record) => {
    return () => {
      const { dispatch } = this.props;
      dispatch({ type: 'category/setState', payload: { current: record } });
      this.setState({ visible: true });
    };
  };

  handleConfirmDelete = (record) => {
    return async () => {
      const { dispatch } = this.props;
      await dispatch({ type: 'category/deleteCategory', payload: record });
    };
  };
}

export default connect(({ categoryState }) => ({ categoryState }))(
  Form.create({
    mapPropsToFields: (props) => props.current,
  })(CategoryManage)
);
