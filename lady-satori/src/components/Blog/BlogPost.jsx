import React from 'react';
import { InlineShareButtons } from 'sharethis-reactjs';
import Header from '../Header';
import RecentPosts from './RecentPosts';
import Footer from '../Footer';
// import Test from './Test';

function BlogPost() {
  
  return (

    <div>
        <Header current={'blog'} />
        <div className="blog-post">

            <img className="cover-img" src="https://besthqwallpapers.com/img/original/19526/yoga-woman-sunset-meditation-yoga-poses.jpg" alt="..." />
            
            <div className="post-container">

                <h3 className="tag text-muted font-weight-bold">#hashtag</h3>

                <h1 className="title">7 Posições do Samurai do Yoga</h1>

                <div className="row m-0">
                    <div className="col-md-6 p-0 social-icons only-mobile">
                        <a href="https://twitter.com/SadhguruJV" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.facebook.com/sadhguru" target="_blank" rel="noreferrer"><i className="fab fa-facebook-square"></i></a>
                        <a href="https://wa.me/5521995165858" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp-square"></i></a>
                    </div>
                    <div className="col-md-6 p-0">
                        <h6 className="author-name">John Doe</h6>
                        <h6 className="publish-date muted mb-auto">3 de Novembro, 2020 - 12min de leitura</h6>
                        {/* <h6 className="last-updated mb-auto">Atualizado pela última vez em 11 de Novembro, 2020</h6> */}
                    </div>
                    <div className="col-md-6 p-0 social-icons">
                        <a href="https://twitter.com/SadhguruJV" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.facebook.com/sadhguru" target="_blank" rel="noreferrer"><i className="fab fa-facebook-square"></i></a>
                        <a href="https://wa.me/5521995165858" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp-square"></i></a>
                    </div>
                </div>

                <div className="main-content">
                    <p contenteditable="true">This is an editable paragraph.</p>
                    {/* <Test/> */}
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt accusantium inventore neque, iste ad sapiente dolor. Illo, recusandae odio blanditiis nam consequatur, qui id pariatur, vero atque architecto velit vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa optio hic aspernatur. <br/> <br/> Iste expedita at recusandae error, earum tenetur obcaecati praesentium perspiciatis possimus officiis eaque unde labore sit assumenda nostrum? Consectetur repudiandae incidunt quae iste autem excepturi praesentium a velit at dolorem assumenda dolores modi non, aliquam adipisci quo beatae labore aliquid! <br/> <br/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, ea deleniti repudiandae obcaecati sequi consequuntur, dolor expedita officiis nesciunt facere inventore aut quo, ipsum provident ex molestias nisi rerum nobis. <br/> <br/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, dignissimos fugit est temporibus aliquam praesentium. Explicabo veritatis maxime autem deleniti modi dignissimos in, sapiente a ullam quam consequatur itaque rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt accusantium inventore neque, iste ad sapiente dolor. Illo, recusandae odio blanditiis nam consequatur, qui id pariatur, vero atque architecto velit vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa optio hic aspernatur. <br/> <br/> Iste expedita at recusandae error, earum tenetur obcaecati praesentium perspiciatis possimus officiis eaque unde labore sit assumenda nostrum? Consectetur repudiandae incidunt quae iste autem excepturi praesentium a velit at dolorem assumenda dolores modi non, aliquam adipisci quo beatae labore aliquid! <br/> <br/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, ea deleniti repudiandae obcaecati sequi consequuntur, dolor expedita officiis nesciunt facere inventore aut quo, ipsum provident ex molestias nisi rerum nobis. <br/> <br/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, dignissimos fugit est temporibus aliquam praesentium. Explicabo veritatis maxime autem deleniti modi dignissimos in, sapiente a ullam quam consequatur itaque rerum!</p> */}
                </div>

                <hr/>
                <div className="share-buttons">
                <h6>Gostou? Compartilhe!</h6>
                <InlineShareButtons
                config={{
                    alignment: 'left',  // alignment of buttons (left, center, right)
                    color: 'social',      // set the color of buttons (social, white)
                    enabled: true,        // show/hide buttons (true, false)
                    font_size: 16,        // font size for the buttons
                    labels: 'null',        // button labels (cta, counts, null)
                    language: 'en',       // which language to use (see LANGUAGES)
                    networks: [           // which networks to include (see SHARING NETWORKS)
                    'whatsapp',
                    'facebook',
                    'linkedin',
                    'reddit',
                    'messenger',
                    'twitter'
                    ],
                    padding: 12,          // padding within buttons (INTEGER)
                    radius: 4,            // the corner radius on each button (INTEGER)
                    show_total: false,
                    size: 50,             // the size of each button (INTEGER)
                }}
                />
                </div>

                <div className="desktop-recent-posts">
                    {/* {NewBlogPost} */}
                </div>
            </div>

                <div className="mobile-recent-posts">
                    <RecentPosts />
                </div>

        </div>
        <Footer />
    </div>
  )};

export default BlogPost;