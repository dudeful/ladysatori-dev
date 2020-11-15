import React from 'react';
import { Link } from 'react-router-dom';

function Header(props){

    return (
        <nav className="navbar navbar-expand-md navbar-light mt-2">
            <Link to={'/'}className="navbar-brand">Lady Satori</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                    <li className={props.current === 'home' ? "nav-item active mr-4" : "nav-item mr-4"}>
                        <Link to={'/'} className="nav-link">Home </Link>
                    </li>
                    <li className={props.current === 'blog' ? "nav-item active mr-4" : "nav-item mr-4"}>
                        <Link to={'/blog'} className="nav-link">Blog </Link>
                    </li>
                    <li className={props.current === 'aulas' ? "nav-item active mr-4" : "nav-item mr-4"}>
                        <Link to={'/aulas-yoga'} className="nav-link">Aulas de Yoga </Link>
                    </li>
                    <li className={props.current === 'sobre' ? "nav-item active" : "nav-item"}>
                        <Link to={'/sobre'} className="nav-link">Sobre </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default Header;