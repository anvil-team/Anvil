import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Select, Switch } from 'antd';

const formLayoutItem = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

class ApplicationEditModal extends React.Component {
  render() {
    const { form, userState, applicationState, onClose } = this.props;
    const { getFieldDecorator } = form;
    const { userList } = userState;
    const { applicationVis, editLoading } = applicationState;

    return (
      <Modal
        visible={applicationVis.editVis}
        title="新增项目"
        onCancel={onClose}
        confirmLoading={editLoading}
        onOk={this.handleEditApplication}
      >
        <Form>
          <Form.Item label="项目名称" {...formLayoutItem}>
            {getFieldDecorator('applicationName', { rules: [{ required: true }] })(<Input />)}
          </Form.Item>
          <Form.Item label="项目描述" {...formLayoutItem}>
            {getFieldDecorator('description')(<Input.TextArea rows={3} />)}
          </Form.Item>
          <Form.Item label="负责人" {...formLayoutItem}>
            {getFieldDecorator('personInCharge', { rules: [{ required: true }] })(
              <Select>
                {userList.map((user) => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.realName}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="审核" {...formLayoutItem}>
            {getFieldDecorator('shouldReviewed', {
              initialValue: false,
              valuePropName: 'checked',
              rules: [{ required: true }],
            })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  handleEditApplication = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (values.shouldReviewed) values.shouldReviewed = 1;
      else values.shouldReviewed = 0;

      if (!err) dispatch({ type: 'application/fetchEditApplication', payload: values });
    });
  };
}

const mapStateToProps = (state) => ({
  applicationState: state.applicationState,
  userState: state.userState,
});

export default connect(mapStateToProps)(Form.create()(ApplicationEditModal));
