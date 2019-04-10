import React from 'react';
import { Form, Modal, Select, Input, Spin } from 'antd';
import { connect } from 'react-redux';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class ClusterEditModal extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'application/fetchApplicationList' });
  }

  render() {
    const { form, clusterState, applicationState } = this.props;
    const { clusterVis, cluster } = clusterState;
    const { applicationList, applicationListLoading } = applicationState;
    const { getFieldDecorator } = form;

    return (
      <>
        <Modal
          visible={clusterVis.editVis}
          onCancel={this.handleClose}
          onOk={this.handleAddCluster}
        >
          <Spin spinning={applicationListLoading}>
            <Form>
              <Form.Item label="项目" {...formItemLayout}>
                {getFieldDecorator('applicationId', { initialValue: cluster?.applicationId })(
                  <Select>
                    {applicationList.map((app) => (
                      <Select.Option key={app.id} value={app.id}>
                        {app.applicationName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="集群名称" {...formItemLayout}>
                {getFieldDecorator('clusterName', { initialValue: cluster?.clusterName })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="描述" {...formItemLayout}>
                {getFieldDecorator('description', { initialValue: cluster?.description })(
                  <Input.TextArea rows={3} />
                )}
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </>
    );
  }

  handleClose = () => {
    const { dispatch } = this.props;

    dispatch({ type: 'cluster/setClusterVis', payload: { editVis: false, cluster: null } });
  };

  handleAddCluster = () => {
    const { dispatch, form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'cluster/fetchEditCluster', payload: { data: values } });
      }
    });
  };
}

const mapStateToProps = (state) => ({
  clusterState: state.clusterState,
  applicationState: state.applicationState,
});

export default connect(mapStateToProps)(Form.create()(ClusterEditModal));
