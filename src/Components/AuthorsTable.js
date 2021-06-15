import React, {Component} from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import NameAvatar from './NameAvatar'
import { Redirect } from "react-router-dom";


class AuthorsTable extends Component {
    state = {
      authors: []
    }

    getAuthors(){
      axios.get(`/authors`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
        .then(res => {
        //  console.log(res.data.body);
         this.setState({authors: res.data.body})
        },
        )
    }
  
    addNewAuthor(author){
      console.log(author);
      axios.post(`/authors`,{
        firstName: author.firstName,
        lastName: author.lastName
      }, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        // console.log(error);
      });
    }
  
    deleteAuthor(author){
      axios.delete(`/authors/${author.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } } )
      .then(function (response) {
        console.log(response);
      })
    }

    updateAuthor(author){
      console.log(author);
      axios.put(`/authors/${author.id}`,{
        firstName: author.firstName,
        lastName: author.lastName
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // console.log(error);
      });
    }

    componentDidMount() {
      this.getAuthors();
    }
  
    columns = [
      {
        title:'ID', field:'id', editable: false
      },
      {
        title:'First Name', field:'firstName', render: (row) => <NameAvatar name={row.firstName} />
        
      },
      {
        title:'Last Name', field: 'lastName', render: (row) => <NameAvatar name={row.lastName} />
      }
    ]
    
  
    render() {
      if (!localStorage.getItem("jwt") || localStorage.getItem("isAdmin") !== "true"){
        return (
          <Redirect to="/admin" />
        )
      } 
      console.log("nah");
      return (
        <div id="my-table" >
          <MaterialTable
          options={{
            maxBodyHeight: 500,
            actionsColumnIndex: -1,
          }}
      
          title="Authors"
            columns={this.columns}
            data={this.state.authors}
            
            editable={{
              onRowAdd: (newAuthor) => new Promise((resolve) => { 
                this.addNewAuthor(newAuthor);
                setTimeout(() =>{
                  this.getAuthors();
                  resolve();
                },500)
              }),
              onRowDelete: (deletedAuthor) => new Promise((resolve) => {
                this.deleteAuthor(deletedAuthor)
                setTimeout(() =>{
                  this.getAuthors();
                  resolve()
                },500)
              }),
              onRowUpdate: (updatedAuthor) => new Promise((resolve) => {
                this.updateAuthor(updatedAuthor);
                setTimeout(() =>{
                  this.getAuthors();
                  resolve()
                },500)
              })
            }}
            
          />
        </div>
      )
    }
  }

  export default AuthorsTable;