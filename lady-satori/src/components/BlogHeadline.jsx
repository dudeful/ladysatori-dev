import React from 'react';

function BlogHeadline() {
  
  return (

    <div className="blog-headline jumbotron jumbotron-fluid pt-3 pb-3">
        
        <img src="https://d2l0wy9lsui5uy.cloudfront.net/c/u/f67894297b6134a6b759b3a9ec15b6cb/2020/08/30050033/Hatha-Yoga-Practice.jpg" class="img-fluid cover-img" alt="yoga-cover"/>
        <div className="headline-container row">
            <div className="col-md-6">
                <p className="headline-title">Lorem Ipsum Dolor</p>
                <p className="headline-briefing">Unde dolore sint cum recusandae deleniti lorem ipsum dolor sit amet consectetur adipisicing elit. aspernatur ullam ducimus exercitationem ea delectus voluptas consectetur voluptates iure aperiam quis quas laboriosam, magni tempore.</p>
                <button className="btn btn-outline-light btn-block mb-4">LER POST</button>
            </div>
            <div className="col-md-6">
                <div className="headline-info">
                    <p className="font-weight-light font-italic">mais recente</p>
                    <p className="text-dark">11 de Novembro, 2020 - <span className="font-weight-light">14min de leitura</span></p>
                </div>
            </div>
        </div>

    </div>
  
  )};

export default BlogHeadline;