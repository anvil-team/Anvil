import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Select, Switch } from 'antd';

const formLayoutItem = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

class ProjectEditModal extends React.Component {
  render() {
    const { form, userState, projectState, onClose } = this.props;
    const { getFieldDecorator } = form;
    const { userList } = userState;
    const { projectVis } = projectState;

    return (
      <Modal visible={projectVis.editVis} title="新增项目" onCancel={onClose}>
        <Form>
          <Form.Item label="项目名称" {...formLayoutItem}>
            {getFieldDecorator('applicationName')(<Input />)}
          </Form.Item>
          <Form.Item label="项目描述" {...formLayoutItem}>
            {getFieldDecorator('description')(<Input.TextArea rows={3} />)}
          </Form.Item>
          <Form.Item label="负责人" {...formLayoutItem}>
            {getFieldDecorator('personInCharge')(
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
            {getFieldDecorator('shouldReviewed')(
              <Switch checkedChildren="是" unCheckedChildren="否" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  projectState: state.projectState,
  userState: state.userState,
});

export default connect(mapStateToProps)(Form.create()(ProjectEditModal));
