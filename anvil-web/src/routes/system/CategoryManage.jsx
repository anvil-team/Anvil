import React from 'react';
import { Table, Popconfirm, Modal, Form, Input, InputNumber, Select, Button } from 'antd';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
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
    const { current } = categoryState;

    return (
      <>
        <div>
          <Button type="primary" onClick={this.handleToAdd}>
            添加目录
          </Button>
        </div>
        <Table
          rowKey="id"
          columns={this.getColumns()}
          pagination={categoryState.pagination}
          dataSource={categoryState.list}
        />
        <Modal
          visible={visible}
          title={current ? '更新目录' : '增加目录'}
          onCancel={this.handleCancel}
          onOk={this.handleConfirm}
        >
          <Form layout="vertical">
            <Form.Item label="名称" {...formItemLayout}>
              {getFieldDecorator('categoryName', {
                initialValue: categoryState.current?.categoryName,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="地址" {...formItemLayout}>
              {getFieldDecorator('url', { initialValue: categoryState.current?.url })(<Input />)}
            </Form.Item>
            <Form.Item label="父级目录" {...formItemLayout}>
              {getFieldDecorator('parentId', { initialValue: categoryState.current?.parentId })(
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
      {
        title: '父节点ID',
        dataIndex: 'parentId',
        render: (text, record) => {
          return text ? record.parent.categoryName : '-';
        },
      },
      { title: '菜单名称', dataIndex: 'categoryName' },
      { title: '地址', dataIndex: 'url' },
      { title: '优先级', dataIndex: 'priority' },
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

  handleToAdd = () => {
    this.setState({ visible: true });
  };

  handleConfirm = () => {
    const {
      form: { validateFields },
      dispatch,
      categoryState,
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        if (categoryState.current?.id) values.id = categoryState.current?.id;
        dispatch({ type: 'category/updateCategory', payload: { category: values, current: null } });

        this.setState({ visible: false });
      }
    });
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
