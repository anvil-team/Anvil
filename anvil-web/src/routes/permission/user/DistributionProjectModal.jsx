import React from 'react';
import { connect } from 'react-redux';
import { Modal, Transfer, Spin } from 'antd';

class DistributionProjectModal extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'project/fetchProjectList' });
  }

  render() {
    const { projectState, userState, onClose } = this.props;
    const { projectListLoading } = projectState;
    const { userVis, userNow } = userState;

    return (
      <Modal
        visible={userVis.distributionVis}
        title={`给${userNow.username} 分配项目`}
        onCancel={onClose}
        onOk={this.handleDistributionProject}
      >
        <Spin spinning={projectListLoading}>
          <Transfer rowKey={(record) => record.id} dataSource={this.getTransferDataSource()} />
        </Spin>
      </Modal>
    );
  }

  getTransferDataSource = () => {
    const {
      projectState: { projectList },
    } = this.props;

    return projectList.map((pro) => ({
      key: pro.id,
      title: pro.applicationName,
    }));
  };

  handleDistributionProject = () => {};
}

const mapStateToProps = (state) => ({
  userState: state.userState,
  projectState: state.projectState,
});

export default connect(mapStateToProps)(DistributionProjectModal);
