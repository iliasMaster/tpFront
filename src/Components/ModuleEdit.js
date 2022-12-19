import React from 'react';

import { Card, Form, Col , Row, Button} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


export default class Moduleliste extends React.Component {


    initialState = {
        id: '',
        nom: '',
        description: ''
    }

    moduleChange(event) {
        this.setState(
            {[event.target.name] : event.target.value}
        );
    }

    submitModule(event) {
        event.preventDefault();
        const module = {
            id: this.state.id,
            nom: this.state.nom,
            description: this.state.description
        }

        axios.put('http://localhost:8080/modules', module)
        .then(response => {
            if(response.data != null) {
                this.setState(this.initialState);
                alert("Module ajouté avec succès");
            }
        });
    }
    
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.moduleChange = this.moduleChange.bind(this);
        this.submitModule = this.submitModule.bind(this);
    }

    render() {

        return (
            <div>
            <Card className={"border border-dark bg-dark text-white"}>
            
            <Card.Header>
                Ajouter un Module
            </Card.Header>
            
            <Form onSubmit={this.submitModule} id="ModuleFormId">
                <Card.Body>
                    <Row>
                        <Form.Group as={Col} controlId="formGridId">
                            <Form.Label> id </Form.Label>
                            <Form.Control name = "id" autocomplete="off" required type="text" className={"bg-dark text-white"}
                            value = {this.state.id} onChange= {this.moduleChange} placeholder = "Entrez l'identifiant du module"/>
                        </Form.Group>
                        
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
            </div>     
        );    
    }
}