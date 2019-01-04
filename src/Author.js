import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from './components/CustomInput';
import CustomSubmit from './components/CustomSubmit';

class AuthorForm extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.sendForm = this.sendForm.bind(this);
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  sendForm(event) {
    event.preventDefault();
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({
        nome: this.state.name,
        email: this.state.email,
        senha: this.state.password
      }),
      success: function(response) {
        this.props.updateListCallback(response);
      }.bind(this),
      error: function(error) {
        console.log('Error');
      }
    });
  }

  setName(event) {
    this.setState({name: event.target.value});
  }

  setEmail(event) {
    this.setState({email: event.target.value});
  }

  setPassword(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="post">
          <CustomInput id="nome" type="text" name="nome" value={this.state.name} onChange={this.setName} label="Nome" />
          <CustomInput id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="e-mail" />
          <CustomInput id="senha" type="password" name="senha" value={this.state.password} onChange={this.setPassword} label="Senha" />
          <CustomSubmit label="Gravar"/>
        </form>
      </div>
    );
  }
}

class AuthorsTable extends Component {

  render() {
    return (
      <div>            
        <table className="pure-table">
            <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
            </tr>
            </thead>
            <tbody>
            {
              this.props.list.map(function(author) {
                return (
                  <tr key={ author.key }>
                  <td>{ author.nome }</td>
                  <td>{ author.email }</td>
                  </tr>
                );
              })
            }
            </tbody>
        </table> 
      </div>
    );
  }
}

export default class AuthorBox extends Component {

  constructor() {
    super();
    this.state = { list: [] };
    this.updateList = this.updateList.bind(this);
  }
  
  componentDidMount() {
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      dataType: 'json',
      success: function(response) {
          this.setState({ list: response });
      }.bind(this)
    });
  }

  updateList(newList) {
    this.setState({list: newList});
  }

  render() {
    return (
      <div>
        <AuthorForm updateListCallback={this.updateList}/>
        <AuthorsTable list={this.state.list}/>
      </div>
    );
  }
}