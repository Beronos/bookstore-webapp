
import React,{Component}  from 'react';
import {TextField, Grid, Button} from '@material-ui/core/';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Redirect } from "react-router-dom";
  
export class CreateBook extends Component{
  constructor(props){
    super(props);

    this.state = {
      authors: [],
      book: {
        title: "",
        genre: "",
        publicationYear: 2021,
        rating: 1,
        stock: 1,
        description: "",
        img: ""
      },
      selectedAuthors: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleAuthorSelection = this.handleAuthorSelection.bind(this);
    this.getAuthors = this.getAuthors.bind(this);
    this.saveBook = this.saveBook.bind(this);
  }

  getAuthors(){
    axios.get(`/authors`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
      .then(res => {
       console.log(res.data.body);
       this.setState({authors: res.data.body},)
      }, )
  }

  async addNewBook(book, authors){
    let flag = false;
    await axios.post(`/books`,{
      title: book.title,
      publicationYear: book.publicationYear,
      stock: book.stock,
      rating: book.rating,
      description: book.description,
      genre: book.genre,
      IMGLocation: book.img,
      authors_id: authors
    }, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
    .then(function (response) {
      console.log(response);
      flag = true;
    })
    .catch(function (error) {
      console.log(error);
    }, );
    if(flag)
    {
      this.props.history.push('/books');
    }

  }

  handleChange(event) {
    let col = event.target.name;
    let val = event.target.value;
    if(col === "img"){
      let valSplit = val.split("\\");
      val = valSplit[valSplit.length - 1];
    }
    this.setState(prevState => ({
      book: {                   
          ...prevState.book,    
          [col]: val     
      }
    }))
  }

  handleAuthorSelection(event, values){
    const author = values[values.length - 1];
    this.setState({
      selectedAuthors: [...this.state.selectedAuthors, author.id]
    })
  }

  componentDidMount() {
    this.getAuthors();
  }

  saveBook(){
    let {book, selectedAuthors} = this.state;
    console.log(book);
    this.addNewBook(book, selectedAuthors);
  }

  render() {
    let {book, authors} = this.state;
      if (!localStorage.getItem("jwt") || localStorage.getItem("isAdmin") !== "true"){
        return (
          <Redirect to="/admin" />
        )
      }
    return (
      
      <form>
        <div id="create-book-container" className="shadow-border">
          <Grid container spacing={2} justify="space-around" >
            <Grid item xs={12} >
              <TextField name="title" color="secondary" value={book.title} onChange={this.handleChange} required fullWidth label="Title" />
            </Grid> 
            <Grid item xs={12}>
              <Autocomplete
                multiple name="authors" onChange={this.handleAuthorSelection} options={authors}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                renderInput={(params) => (
                  <TextField {...params} color="secondary" required fullWidth label="Author(s)" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField name="genre" color="secondary" value={book.genre} onChange={this.handleChange} required fullWidth label="Genre" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="publicationYear" value={book.publicationYear} onChange={this.handleChange} color="secondary" required fullWidth type="number" label="Publication Year" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="rating" value={book.rating} onChange={this.handleChange} color="secondary" required fullWidth type="number" label="Rating" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="stock" value={book.stock} onChange={this.handleChange} required color="secondary" fullWidth type="number" label="Stock" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description" value={book.description} onChange={this.handleChange}
                color="secondary" required fullWidth
                placeholder="Enter description"
                multiline rows={3} rowsMax={6}
                label="Description"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField name="img" onChange={this.handleChange} color="secondary" type="file" fullWidth label="Image" />
            </Grid>
            <Grid m={9} item xs={12}>
              
              <Button variant="contained" onClick={this.saveBook} color="secondary">
                  Save book
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    )
  }
}

export default CreateBook;
