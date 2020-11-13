import React from 'react';
import { Link } from 'react-router-dom';

function Header(props){

    return (
        <nav class="navbar navbar-expand-md navbar-light mt-2">
            <Link to={'/'}class="navbar-brand">Lady Satori</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ml-auto">
                    <li class={props.current === 'home' ? "nav-item active mr-4" : "nav-item mr-4"}>
                        <Link to={'/'} class="nav-link">Home </Link>
                    </li>
                    <li class={props.current === 'blog' ? "nav-item active mr-4" : "nav-item mr-4"}>
                        <Link to={'/blog'} class="nav-link">Blog </Link>
                    </li>
                    <li class={props.current === 'aulas' ? "nav-item active mr-4" : "nav-item mr-4"}>
                        <Link to={'/aulas-yoga'} class="nav-link">Aulas de Yoga </Link>
                    </li>
                    <li class={props.current === 'sobre' ? "nav-item active" : "nav-item"}>
                        <Link to={'/sobre'} class="nav-link">Sobre </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default Header;