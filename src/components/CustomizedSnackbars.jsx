import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './MySnackbarContentWrapper'


const CustomizedSnackbars = (props) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={4000}
        onClose={props.closeSnack}
      >
        <MySnackbarContentWrapper
          onClose={props.closeSnack}
          variant={props.type}
          message={props.message}
        />
      </Snackbar>
    </div>
  );
}

CustomizedSnackbars.propTypes = {
  type: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  closeSnack: PropTypes.func.isRequired,
};

export default CustomizedSnackbars