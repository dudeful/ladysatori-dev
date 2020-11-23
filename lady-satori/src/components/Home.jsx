import Header from './Header';
import Contact from './Contact';
import Footer from './Footer';

function Home() {
  
  return (
    <div className="home">

    <Header 
      current={'home'}
    />

    <div className="card welcome">
      <div className="home-container">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="card-body p-0">
              <h5 className="display-4 mb-3">Yoga que liberta</h5>
              <p className="lead">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi doloremque exercitationem, amet voluptatibus adipisci, iste tempore voluptatum soluta illo eius similique qui? Aliquam alias quas ratione sed nihil eos quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolore suscipit magnam, aut possimus sed non ducimus accusamus ex!</p>
            </div>
          </div>
          <div className="col-md-1" />
          <div className="col-md-3">
            <img src="/images/yoga-1.1.png" className="card-img" alt="..."/>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row">
        <div className="home-info-blocks col-md-3 mr-auto ml-0">
          <hr className="mr-5 ml-5" />
          <img src="/images/yoga-10.png" alt="..." />
          <p className="text-muted text-center mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam possimus veniam earum reprehenderit vel similique quae alias minus adipisci.</p>
        </div>
        <div className="home-info-blocks col-md-3 ml-auto mr-auto">
          <hr className="mr-5 ml-5" />
          <img src="/images/yoga-2.png" alt="..." />
          <p className="text-muted text-center mt-3">Est dolorem ipsa quidem perspiciatis eum. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="home-info-blocks col-md-3 mr-0 ml-auto">
          <hr className="mr-5 ml-5" />
          <img src="/images/yoga-3.png" alt="..." />
          <p className="text-muted text-center mt-3">Cupiditate quos repellendus expedita reiciendis commodi rem magni iste, eveniet provident illum, in totam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, libero.</p>
        </div>
      </div>
    </div>

    <div className="card home-yoga-style">
      <div className="home-container">
        <div className="row no-gutters">
          <div className="col-md-3">
            <img src="/images/yoga-8.png" className="card-img" alt="..."/>
          </div>
          <div className="col-md-1" />
          <div className="col-md-8 mt-auto">
            <div className="card-body p-0 mt-4">
              <h5 className="display-4 mb-3">meu estilo</h5>
              <p className="lead mb-0">Repellat nemo accusantium quod hic, pariatur magni enim possimus perferendis quia. Veniam distinctio quos, eveniet commodi culpa sapiente quae velit voluptatibus, a consequuntur est accusantium vel, repudiandae enim in magni tenetur quibusdam. Maxime? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore at, quaerat veritatis quia quam quo accusamus perferendis, sint assumenda praesentium vel reiciendis provident dolorem laborum, ut dignissimos voluptas unde incidunt?</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="home-sensei-profile row">
      <div className="col-md-3 p-0">
        <img src="/images/dwight.jpg" className="img1" alt="..." />
      </div>
      <div className="col-md-6 home-about-me">
        <h1>Sobre mim</h1>
        <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, ipsam? Temporibus sed, cupiditate harum, quae id voluptate facilis mollitia natus nisi aperiam, est culpa quod minima repellat. Dignissimos, saepe ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quisquam molestiae, fugit pariatur voluptas facere. Voluptates, nisi. Nostrum aperiam veniam dolorem in asperiores? Quibusdam voluptatem ea doloremque eligendi ipsa facilis.</p>
      </div>
      <div className="col-md-1 m-auto">
        <a href="https://youtu.be/g7M3-84jaMQ?t=6" target="_blank" rel="noreferrer"><img src="/images/youtube-icon.svg" className="img2" alt="..." /></a>
      </div>
    </div>

    <div className="home-QA row">
      <img className="question col-md-6" src="/images/Home/question3.png" alt="..." />
      <img className="answer col-md-6" src="/images/Home/answer1.png" alt="..." />
    </div>
    <div className="home-QA row">
      <img className="question col-md-6" src="/images/Home/question1.png" alt="..." />
      <img className="answer col-md-6" src="/images/Home/answer2.png" alt="..." />
    </div>

    <Contact />

    <hr/> 

    <Footer />

    </div>
  
  )};

export default Home;