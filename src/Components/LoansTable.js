import React, {Component} from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import NameAvatar from './NameAvatar'
import { Redirect } from "react-router-dom";

class LoansTable extends Component {
    state = {
      loans: []
    }

    getLoans(){
      axios.get(`/loans`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
        .then(res => {
        console.log(res.data.body);
         this.setState({loans: res.data.body})
        })
        .catch(e =>{
            console.log(e);
        })
    }
    

    componentDidMount() {
      this.getLoans();
    }
  
    columns = [
      {
        title:'ID', field:'id', editable: false
      },
      {
        title:'Book Title', field:'book', render: (row) => <NameAvatar name={row.book.title} />
      },
      {
        title:'User', field:'user', render: (row) => <NameAvatar name={row.user.username} />
      }
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
            }}
        
            title="Loans"
              columns={this.columns}
              data={this.state.loans}
            />
          </div>
        </div>
 

      )
    }
  }

  export default LoansTable;