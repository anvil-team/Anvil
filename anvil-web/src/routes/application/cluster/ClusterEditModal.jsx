import React from 'react';
import { Form, Modal, Select, Input } from 'antd';
import { connect } from 'react-redux';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class ClusterEditModal extends React.Component {
  render() {
    const { form, clusterState } = this.props;
    const { clusterVis } = clusterState;
    const { getFieldDecorator } = form;

    return (
      <>
        <Modal visible={clusterVis.editVis}>
          <Form>
            <Form.Item label="项目" {...formItemLayout}>
              {getFieldDecorator('applicationId')(<Select>{}</Select>)}
            </Form.Item>
            <Form.Item label="集群名称" {...formItemLayout}>
              {getFieldDecorator('clusterName')(<Input />)}
            </Form.Item>
            <Form.Item label="描述" {...formItemLayout}>
              {getFieldDecorator('description')(<Input.TextArea rows={3} />)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  clusterState: state.clusterState,
});

export default connect(mapStateToProps)(Form.create()(ClusterEditModal));
