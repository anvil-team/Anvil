import React from 'react';
import { connect } from 'react-redux';
import { Modal, Transfer, Spin } from 'antd';

class DistributionApplicationModal extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'application/fetchApplicationCombo' });
  }

  render() {
    const { applicationState, userState, onClose } = this.props;
    const { applicationListLoading } = applicationState;
    const { userVis, userNow } = userState;

    return (
      <Modal
        visible={userVis.distributionVis}
        title={`给${userNow.username} 分配项目`}
        onCancel={onClose}
        onOk={this.handleDistributionApplication}
      >
        <Spin spinning={applicationListLoading}>
          <Transfer rowKey={(record) => record.id} dataSource={this.getTransferDataSource()} />
        </Spin>
      </Modal>
    );
  }

  getTransferDataSource = () => {
    const {
      applicationState: { applicationList },
    } = this.props;

    return applicationList.map((pro) => ({
      key: pro.id,
      title: pro.applicationName,
    }));
  };

  handleDistributionApplication = () => {};
}

const mapStateToProps = (state) => ({
  userState: state.userState,
  applicationState: state.applicationState,
});

export default connect(mapStateToProps)(DistributionApplicationModal);
