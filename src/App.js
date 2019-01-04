import React, { Component } from 'react';
import 'purecss/build/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import CustomInput from './components/CustomInput';
import CustomSubmit from './components/CustomSubmit';

class App extends Component {

  constructor() {
    super();
    this.state = {
      list: [],
      name: '',
      email: '',
      password: ''
    };
    this.sendForm = this.sendForm.bind(this);
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
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
        this.setState({list: response});
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
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>
        <div id="menu">
            <div className="pure-menu">
                <a className="pure-menu-heading" href="#">Company</a>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                </ul>
            </div>
        </div>

        <div id="main">
            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="post">
                  <CustomInput id="nome" type="text" name="nome" value={this.state.name} onChange={this.setName} label="Nome" />
                  <CustomInput id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="e-mail" />
                  <CustomInput id="senha" type="password" name="senha" value={this.state.password} onChange={this.setPassword} label="Senha" />
                  <CustomSubmit label="Gravar"/>
                </form>             

              </div>  
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
                      this.state.list.map(function(author) {
                        return (
                          <tr key={author.key}>
                            <td>{ author.nome }</td>
                            <td>{ author.email }</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table> 
              </div>             
            </div>
          </div>            
        </div>
    );
  }
}

export default App;
