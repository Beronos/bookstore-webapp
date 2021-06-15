

import React,{Component}  from 'react';
import {Avatar, Grid} from '@material-ui/core';


export class NameAvatar extends Component{
  render() {
    return (
      <Grid container alignItems="center">
        <Grid item sm={2}>
          <Avatar>  {this.props.name[0]}</Avatar>
        </Grid>
        <Grid>
          {this.props.name}
        </Grid>
      </Grid>
    )
  }
}

export default NameAvatar;


