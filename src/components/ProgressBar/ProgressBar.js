import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

class ColoredLinearProgress extends Component {
  render() {
    const { classes } = this.props;
    return <LinearProgress {...this.props} classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}/>;
  }
}

const styles = props => ({
  colorPrimary: {
    backgroundColor: '#343a40',
  },
  barColorPrimary: {
    backgroundColor: '#fbae1c',
  }
});

export default  withStyles(styles)(ColoredLinearProgress);