import React from 'react';
import { connect } from 'react-redux';
import { Modal, Transfer } from 'antd';

class DistributionProjectModal extends React.Component {
  render() {
    return <Modal>
      <Transfer></Transfer>
    </Modal>;
  }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(DistributionProjectModal);
