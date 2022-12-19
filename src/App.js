import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import './App.css';
import Navigationbar from './Components/Navigationbar'
import Bienvenue from './Components/Bienvenue';
import Moduleliste from './Components/Moduleliste';
import Module from './Components/Module';

class App extends Component {
  render(){
    const marginTop = { marginTop:"20px"}
    return (
    <Router>
      <Navigationbar/>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Routes>
              <Route path="/"  element={<Bienvenue/>}/>
              <Route path="/add"  element={<Module/>}/>
              <Route path="/list"  element={<Moduleliste/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
    );
  }
}

export default App;
