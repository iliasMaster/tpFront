import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

export default class Bienvenue extends React.Component {
    render() {
        return (
        <div className=" jumbotron bg-dark text-white">
            <h1>Bienvenue dans votre liste de modules</h1>
            <blockquote className= "blockquote mb-0">
            <p>
                Tous les modules sont affichés dans la liste ci-dessous.
            </p>
            <footer className="blockquote-footer">
                Filière IWIN
            </footer>
            </blockquote>
        </div>
        );
    }
}