import React, { Component } from 'react';
import 'purecss/build/pure-min.css';
import './css/side-menu.css';

import { Link, Route } from 'react-router-dom';
import { AuthorBox } from './Author';
import { Home } from './Home';

class App extends Component {

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
                <li className="pure-menu-item">
                  <Link to="/home" className="pure-menu-link">Home</Link>
                </li>
                <li className="pure-menu-item">
                  <Link to="/author" className="pure-menu-link">Autor</Link>
                </li>
                <li className="pure-menu-item">
                  <Link to="/book" className="pure-menu-link">Livro</Link>
                </li>
              </ul>
            </div>
          </div>
          <div id="main">
            <Route exact path="/home" component={Home}/>
            <Route path="/author" component={AuthorBox} />
            <Route path="/book" component={AuthorBox} />
          </div>
        </div>
    );
  }
}

export default App;
