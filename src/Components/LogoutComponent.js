import React,{ Component }  from 'react';



  
export class Logout extends Component{
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
  }

  render() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isAdmin')
    this.props.history.push('/admin');
    return (
      <h1>Logged out</h1>
    )
  }
}

export default Logout;