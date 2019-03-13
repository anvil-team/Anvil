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
    const { userVis, userNow, selectedKeys, targetKeys } = userState;

    return (
      <Modal
        visible={userVis.distributionVis}
        title={`给${userNow.username} 分配项目`}
        onCancel={onClose}
        onOk={this.handleDistributionApplication}
      >
        <Spin spinning={applicationListLoading}>
          <Transfer
            rowKey={(record) => record.key}
            render={(item) => item.title}
            selectedKeys={selectedKeys}
            targetKeys={targetKeys}
            dataSource={this.getTransferDataSource()}
            onChange={this.handleTransferChange}
            onSelectChange={this.handleTransferSelectChange}
          />
        </Spin>
      </Modal>
    );
  }

  getTransferDataSource = () => {
    const {
      applicationState: { applicationComboList },
      userState: { targetKeys },
    } = this.props;

    return applicationComboList
      .filter((app) => !targetKeys.includes(app.id))
      .map((pro) => ({
        key: pro.id,
        title: pro.applicationName,
      }));
  };

  handleTransferChange = (nextTargetKeys) => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/setState', payload: { targetKeys: nextTargetKeys } });
  };

  handleTransferSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'user/setState',
      payload: { selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] },
    });
  };

  handleDistributionApplication = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/updateUserApplicationAssign' });
  };
}

const mapStateToProps = (state) => ({
  userState: state.userState,
  applicationState: state.applicationState,
});

export default connect(mapStateToProps)(DistributionApplicationModal);
