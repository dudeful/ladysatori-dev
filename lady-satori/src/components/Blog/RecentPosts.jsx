import React from 'react';
import { Link } from 'react-router-dom';

function RecentPosts() {
  
  return (

    <div>

        <h4 className="recent-posts-title">outras publicações recentes</h4>
        <div className="recent-posts row">
            <div className="recent-post-card col-md-4 p-0">
                <Link to={'/post'} className="text-info text-decoration-none">
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col-4">
                            <img src="https://www.finerminds.com/wp-content/uploads/2015/11/shutterstock_1212549019.jpg" className="card-img" alt="..." />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Yoga cósmico</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
            <div className="recent-post-card col-md-4 p-0">
                <Link to={'/post'} className="text-info text-decoration-none">
                <div className="card m-auto">
                    <div className="row no-gutters">
                        <div className="col-4">
                            <img src="https://cdn.shopify.com/s/files/1/1728/2157/articles/Kids_zebra_updog_blog.jpg?v=1552668117" className="card-img" alt="..." />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Yoga quântico</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
            <div className="recent-post-card col-md-4 p-0">
                <Link to={'/post'} className="text-info text-decoration-none">
                <div className="card ml-auto">
                    <div className="row no-gutters">
                        <div className="col-4">
                            <img src="https://i.pinimg.com/originals/a2/13/b5/a213b579b0e6826f26a4234b7d4207ff.jpg" className="card-img" alt="..." />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Yoga místico</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        </div>

    </div>
  )};

export default RecentPosts;