import React from 'react';

import {  ButtonGroup, Button, Card, Table, Form, Col , Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';


import 'bootstrap/dist/css/bootstrap.css';


export default class Moduleliste extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             modules: [],
             edit : false,
             id : '',
             nom : '',
             description : '',

             };
        
        this.moduleChange = this.moduleChange.bind(this);
        this.updateModule = this.updateModule.bind(this);
    }
    
    componentDidMount() {
        fetch('http://localhost:8080/modules')
        .then((response) => {
            return response.json();})
        .then((responseData) => {
            this.setState({
                modules: responseData
            });
        })
        .catch(err => console.error(err));
    }

    deleteModule = (moduleId) => {
        axios.delete("http://localhost:8080/modules/"+moduleId)
        .then(response => {
        if(response.data != null){
            this.setState({show:true});
            setTimeout(() => this.setState({show:false}), 3000);
            this.setState({
                modules: this.state.modules.filter(module => module.id !== moduleId)
            });
        } else {
            this.setState({show:false});
        }
        });
        };

        moduleChange(event) {
            this.setState(
                {[event.target.name] : event.target.value}
            );
        }
    
        redirectUpdateModule = (moduleId) => {
            this.setState({                
                edit : true,
                id : moduleId,
                
            });
        };

        updateModule(event) {

        event.preventDefault();
        const module = {
            id : this.state.id,
            nom: this.state.nom,
            description: this.state.description
        }

        axios.put("http://localhost:8080/modules/"+module.id, module )
        .then(
            
            this.setState({
            edit : false,
            id : '', 
            nom : '',
            description : ''
        }
        ))

    }
    
    render() {

        return (

            
        <>
              
            {!(this.state.edit) && <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast children = {{show:this.state.show, message:"Module supprimé avec succès.",
                    type:"danger"}}/> </div>
                

                
                <Card className= {"border border-dark bg-dark text-white"}>
                
                <Card.Header><FontAwesomeIcon icon={faList} /> Liste des Modules</Card.Header>

                <Card.Body>
                <Table bordered hover striped variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom </th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.modules.length ===0 ?
                        <tr align="center">
                            <td colSpan="6">
                                Aucun module n'est disponible.</td>
                            </tr> :
                            this.state.modules.map((module) => (
                            <tr key={module.id}>
                                <td>{module.id}</td>
                                <td>{module.nom}</td>
                                <td>{module.description}</td>
                            <td>
                            <ButtonGroup>
                                <Button size="sm" variant="outline-primary"
                                onClick={this.redirectUpdateModule.bind(this, module.id)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>{' '}
                                <Button size="sm" variant="outline-danger"
                                onClick={this.deleteModule.bind(this,module.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </ButtonGroup>
                            </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </Table>

                </Card.Body>   
                </Card>
            </div>  } 
            {(this.state.edit) && <div>
            <Card className={"border border-dark bg-dark text-white"}>
            
            <Card.Header>
                Modifier un Module
            </Card.Header>
            
            <Form onSubmit={this.updateModule} id="ModuleFormId">
                <Card.Body>
                    <Row>
                        <Form.Group as={Col} controlId="formGridNom">
                            <Form.Label> Nom </Form.Label>
                            <Form.Control name = "nom" autocomplete="off" required type="text" className={"bg-dark text-white"}
                            value = {this.state.nom} onChange= {this.moduleChange} placeholder = "Entrez le nom du module" />
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label> Description </Form.Label>
                            <Form.Control name = "description" autocomplete="off" required type="text" className={"bg-dark text-white"}
                            value = {this.state.description} onChange= {this.moduleChange} placeholder = "Entrez la description du module"/>
                        </Form.Group>

                    </Row>
                </Card.Body>
                
                <Card.Footer style={{textAlign:"right"}}>
                    <Button size="sm" variant="success" type="submit"> Edit </Button>{' '}
                    <Button size="sm" variant="info" type="reset"> Reset </Button>
                </Card.Footer>
            </Form>
        </Card>
            </div> }  
        </>
        );    
    }
}