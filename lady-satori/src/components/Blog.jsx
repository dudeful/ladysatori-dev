import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Header from './Header';
import BlogHeadline from './BlogHeadline';
import Cards from './Cards';

function Blog() {
  
  return (

    <div>

      <Header current={'blog'} />

      <BlogHeadline />
      
      <Cards />


      <div className="row m-0 p-3 bg-secondary">
        <Link to={'/'} className="col-3 text-center text-light text-decoration-none m-0">Home</Link>
        <Link to={'/aulas-yoga'} className="col-3 text-center text-light text-decoration-none">Aulas</Link>
        <HashLink to="/#get-in-touch" className="col-3 text-center text-light text-decoration-none">Contato</HashLink>
        <Link to={'/sobre'} className="col-3 text-center text-light text-decoration-none">Sobre</Link>
      </div>
    
    </div>
  
  )};

export default Blog;