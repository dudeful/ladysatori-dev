import { Link } from "react-router-dom";
import "../styles/YogaClasses.css";
import Header from "./Header";
import Footer from "./Footer";

const YogaClasses = () => {
  return (
    <div>
      <Header current={"aulas"} />
      <div className="yoga_classes row">
        <div className="col-sm-4 complete_course p-0">
          <Link className="text-decoration-none" to={"/curso-completo"}>
            <div className="card border-top-0 border-bottom-0">
              <h5 className="card-title">Curso Completo</h5>
              <p className="card-text card-text-1">
                <span className="card-text-span">Zero to Hero</span>
              </p>
              <div className="card-text-2">
                <p className="card-text">
                  Mollit do dolore et veniam incididunt sint ullamco in magna et
                  qui duis voluptate Lorem. Aliqua do eu reprehenderit.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-4 live_classes p-0">
          <Link className="text-decoration-none" to={"/aulas-ao-vivo"}>
            <div className="card border-top-0 border-bottom-0">
              <h5 className="card-title">Aulas ao Vivo</h5>
              <p className="card-text card-text-1">
                <span className="card-text-span">Lives Semanais</span>
              </p>
              <div className="card-text-2">
                <p className="card-text">
                  Ullamco officia consequat nostrud mollit non ullamco
                  reprehenderit. Pariatur ipsum aute qui ut ut laboris officia.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-4 master_classes p-0">
          <Link className="text-decoration-none" to={"/master-classes"}>
            <div className="card border-top-0 border-bottom-0">
              <h5 className="card-title">Master Classes</h5>
              <p className="card-text card-text-1">
                <span className="card-text-span">Yoginess</span>
              </p>
              <div className="card-text-2">
                <p className="card-text">
                  Ad sunt elit consequat dolor ut aliquip culpa. Consectetur
                  voluptate voluptate proident elit exercitation elit
                  adipisicing.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default YogaClasses;
