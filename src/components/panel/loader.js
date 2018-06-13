
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { blue200 } from 'material-ui/styles/colors';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function Loader(props) {
  const { classes } = props;
  return (
    <div>
    
      <CircularProgress className={classes.progress} style={{color :blue200}} size={50} />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);