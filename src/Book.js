import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from './components/CustomInput';
import CustomSubmit from './components/CustomSubmit';
import PubSub from 'pubsub-js';
import ErrorHandler from './ErrorHandler';

class BookForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      authorId: ''
    };
    this.setTitle = this.setTitle.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.setAuthorId = this.setAuthorId.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  setTitle(event) {
    this.setState({ title: event.target.value });
  }

  setPrice(event) {
    this.setState({ price: event.target.value });
  }

  setAuthorId(event) {
    this.setState({ authorId: event.target.value });
  }

  sendForm(event) {
    event.preventDefault();
    var title = this.state.title.trim();
    var price = this.state.price.trim();
    var authorId = this.state.authorId.trim();
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/livros",
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({
        titulo: title,
        preco: price,
        autorId: authorId
      }),
      success: function(response) {
        PubSub.publish('book-list-update', response);
        this.setState({
          title: '',
          price: '',
          authorId: ''
        });
      }.bind(this),
      error: function(error) {
        if (error.status === 400) {
          new ErrorHandler().publishErrors(error.responseJSON);
        }
      },
      beforeSend: function() {
        PubSub.publish("clean-errors", {});
      }
    })
  }

  render() {
    var authors = this.props.authors.map(function(author) {
      return <option key={author.id} value={author.id}>{author.nome}</option>;
    });
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="post">
          <CustomInput id="titulo" type="text" name="titulo" value={this.state.title} onChange={this.setTitle} label="Título" />
          <CustomInput id="price" type="decimal" name="price" value={this.state.price} onChange={this.setPrice} label="Price" />
          <div className="pure-controls">
            <select value={this.state.authorId} name="autorId" onChange={this.setAuthorId}>
              <option value="">Selecione</option>
              {authors}
            </select>
          </div>
          <div className="pure-control-group">
            <label></label>
            <CustomSubmit label="Gravar"/>
          </div>
        </form>
      </div>
    )
  }
}

class BooksTable extends Component {
  
  render() {
    var books = this.props.list.map(function(book) {
      return (
        <tr key={book.titulo}>
          <td>{book.titulo}</td>
          <td>{book.autor.nome}</td>
          <td>{book.preco}</td>
        </tr>
      );
    });

    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>TItulo</th>
            <th>Autor</th>
            <th>Preco</th>
          </tr>
        </thead>
        <tbody>
          {books}
        </tbody>
      </table>
    );
  }
}

export class BookBox extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      list: [], 
      authors: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/livros",
      dataType: 'json',
      success: function(data) {
        this.setState({ list: data });
      }.bind(this)
    });

    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      dataType: 'json',
      success: function(data) {
        this.setState({ authors: data });
      }.bind(this)
    });

    PubSub.subscribe('book-list-update', function(topic, list) {
      this.setState({ list: list });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
        <div className="content" id="content">
          <BookForm authors={this.state.authors} />
          <BooksTable list={this.state.list} />
        </div>
      </div>
    )
  }
}