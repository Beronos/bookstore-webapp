
import React,{ Component }  from 'react';
import {TextField, Grid, Button} from '@material-ui/core/';
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';


  
export class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
    }

    toast.configure();

    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.loginRequest = this.loginRequest.bind(this);
  }

  async loginRequest(username, password){
    let flag;
    await axios.post(`/login`,{
        username: username,
        password: password
      })
      .then(function (response) {
          console.log(this);
          console.log(response);
          let {body} = response.data;
        if(body.access_token){
            localStorage.setItem('jwt', body.access_token);
            localStorage.setItem('isAdmin', body.isAdmin);
            flag = body.isAdmin;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    if(flag){
        this.props.history.push('/books');
    } else {
      toast.error('Wrong credentials', {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
        
    }
  }


  handleChange(event) {
    let name = event.target.name;
    let val = event.target.value;
    
    this.setState(({
          [name]: val     
    }))
  }

  handleLoginSubmit(){
      let {username, password} = this.state;
      this.loginRequest(username, password);
  }

  

  render() {
    if (localStorage.getItem("jwt") && localStorage.getItem("isAdmin") === "true"){
      return (
        <Redirect to="/books" />
      )
    } 
    return (
      <form>
        <div id="login-form-container" className="shadow-border">
          <Grid container spacing={6} >
            <Grid item xs={12} >
              <TextField name="username" color="secondary"  fullWidth onChange={this.handleChange} required  label="Username" />
            </Grid> 
            <Grid item xs={12} >
              <TextField type="password" name="password" color="secondary"  fullWidth onChange={this.handleChange} required  label="Password" />
            </Grid> 
            <Grid item xs={12} >
              <Button variant="contained" onClick={this.handleLoginSubmit} color="secondary" size="large" startIcon={<SaveIcon />}>
                Log in
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    )
  }
}

export default Login;
