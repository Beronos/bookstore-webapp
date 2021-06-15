import React, {Component} from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Grid, Button } from '@material-ui/core/';
import NameAvatar from './NameAvatar'
import { Redirect } from "react-router-dom";

class BooksTable extends Component {
    state = {
      books: []
    }

    getBooks(){
      axios.get(`/books`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
        .then(res => {
         this.setState({books: res.data.body})
        })
    }
  
    deleteBook(book){
      axios.delete(`/books/${book.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
      .then(function (response) {
        // console.log(response);
      })
    }

    updateBook(book){
      axios.put(`/books/${book.id}`,{
        title: book.title,
        publicationYear: book.publicationYear,
        stock: book.stock,
        rating: book.rating,
        description: book.description,
        genre: book.genre,
        IMGLocation: book.IMGLocation,
        authors_id: [],
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
      this.getBooks();
    }
  
    columns = [
      {
        title:'ID', field:'id', editable: false
      },
      {
        title:'Title', field:'title', render: (row) => <NameAvatar name={row.title} />
      },
      {
        title:'Publication Year', field: 'publicationYear'
      },
      {
        title:'Genre', field: 'genre'
      },
      {
        title:'Rating', field: 'rating'
      },
    ]
    
  
    render() {
      if (!localStorage.getItem("jwt") || localStorage.getItem("isAdmin") !== "true"){
        return (
          <Redirect to="/admin" />
        )
      } 
      return (
        <div>
          <div id="my-table">
            <MaterialTable
            options={{
              maxBodyHeight: 500,
              actionsColumnIndex: -1,
            }}
        
            title="Books"
              columns={this.columns}
              data={this.state.books}
              
              editable={{

                onRowDelete: (deletedBook) => new Promise((resolve) => {
                  this.deleteBook(deletedBook)
                  setTimeout(() =>{
                    this.getBooks();
                    resolve()
                  },500)
                }),
                onRowUpdate: (updatedBook) => new Promise((resolve) => {
                  this.updateBook(updatedBook);
                  setTimeout(() =>{
                    this.getBooks();
                    resolve()
                  },500)
                })
              }}
              
            />
          </div>
          <Grid container spacing={2} justify="center" >
            <Grid item xs={5} ></Grid>
            <Grid item xs={2} >
              <Button id="create-book-button" variant="contained" onClick={this.saveBook} color="secondary">
                <a id="create-book-link" href="/books/create">Create</a>
              </Button>
            </Grid>
            <Grid item xs={5} ></Grid>
          </Grid> 

          
          
        </div>
 

      )
    }
  }

  export default BooksTable;