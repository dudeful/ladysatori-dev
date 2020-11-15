import React from 'react';
import { Link } from 'react-router-dom';

function Cards() {
  
  return (

    <div className="blog-cards">

        <div className="home-container row row-cols-1 row-cols-md-3">
            <div className="col mb-5">
                <Link to={'/post'} className="blog-card-link lead text-dark text-decoration-none">
                <div className="card h-100">
                    <img src="https://library.kissclipart.com/20180902/zlq/kissclipart-yoga-tree-clipart-yoga-clip-art-f7ad97b25d2d88dc.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <p className="card-text ml-auto p-3"><small className="text-muted">2 de Novembro, 2020 - <span className="font-italic">17min de leitura</span></small></p>
                </div>
                </Link>
            </div>
            <div className="col mb-5">
                <Link to={'/post'} className="blog-card-link lead text-dark text-decoration-none">
                <div className="card h-100">
                    <img src="https://cdn.shopify.com/s/files/1/1728/2157/articles/Kids_zebra_updog_blog.jpg?v=1552668117" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae impedit illo nulla eum nesciunt voluptates repellat officiis!</p>
                    </div>
                    <p className="card-text ml-auto p-3"><small className="text-muted">11 de Outubro, 2020 - <span className="font-italic">9min de leitura</span></small></p>
                </div>
                </Link>
            </div>
            <div className="col mb-5">
                <Link to={'/post'} className="blog-card-link lead text-dark text-decoration-none">
                <div className="card h-100">
                    <img src="https://www.finerminds.com/wp-content/uploads/2015/11/shutterstock_1212549019.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <p className="card-text ml-auto p-3"><small className="text-muted">27 de Setembro, 2020 - <span className="font-italic">22min de leitura</span></small></p>
                </div>
                </Link>
            </div>
            <div className="col mb-5">
                <Link to={'/post'} className="blog-card-link lead text-dark text-decoration-none">
                <div className="card h-100">
                    <img src="https://i.pinimg.com/originals/a2/13/b5/a213b579b0e6826f26a4234b7d4207ff.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a short card.</p>
                    </div>
                    <p className="card-text ml-auto p-3"><small className="text-muted">14 de Setembro, 2020 - <span className="font-italic">13min de leitura</span></small></p>
                </div>
                </Link>
            </div>
            <div className="col mb-5">
                <Link to={'/post'} className="blog-card-link lead text-dark text-decoration-none">
                <div className="card h-100">
                    <img src="/images/dwight.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <p className="card-text ml-auto p-3"><small className="text-muted">5 de Setembro, 2020 - <span className="font-italic">15min de leitura</span></small></p>
                </div>
                </Link>
            </div>
            <div className="col mb-5">
                <Link to={'/post'} className="blog-card-link lead text-dark text-decoration-none">
                <div className="card h-100">
                    <img src="/images/sgt-lincoln-osiris.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <p className="card-text ml-auto p-3"><small className="text-muted">28 de Agosto, 2020 - <span className="font-italic">19min de leitura</span></small></p>
                </div>
                </Link>
            </div>
            <div className="col mb-5">
                <Link to={'/post'} className="blog-card-link lead text-dark text-decoration-none">
                <div className="card h-100">
                    <img src="https://cdn.pixabay.com/photo/2019/12/02/08/37/girl-4667168_960_720.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <p className="card-text ml-auto p-3"><small className="text-muted">20 de Agosto, 2020 - <span className="font-italic">8min de leitura</span></small></p>
                </div>
                </Link>
            </div>
            <div className="col mb-5">
                <Link to={'/post'} className="blog-card-link lead text-dark text-decoration-none">
                <div className="card h-100">
                    <img src="/images/curious-ostrich.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <p className="card-text ml-auto p-3"><small className="text-muted">14 de Agosto, 2019 - <span className="font-italic">16min de leitura</span></small></p>
                </div>
                </Link>
            </div>
            <div className="col mb-5">
                <Link to={'/post'} className="blog-card-link lead text-dark text-decoration-none">
                <div className="card h-100">
                    <img src="https://i.pinimg.com/originals/cf/b6/ea/cfb6eab8f2e452891726fd2a58a4b930.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <p className="card-text ml-auto p-3"><small className="text-muted">5 de Agosto, 2020 - <span className="font-italic">11min de leitura</span></small></p>
                </div>
                </Link>
            </div>
        </div>

    </div>
  )};

export default Cards;