import { useNavigate } from "react-router-dom";
import "../../pages/Users/Welcome/style.scss";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer id="footer">
      <div className="footer-newsletter">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h4>Join Our Newsletter</h4>
              <p>
                Tamen quem nulla quae legam multos aute sint culpa legam noster
                magna
              </p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>Pellifix</h3>
              <p>
                C.C.S Colony <br />
                Dargamitta
                <br />
                Nellore <br />
                <br />
                <strong>Phone:</strong> +91 **********
                <br />
                <strong>Email:</strong> vamsi68krishna@gmail.com
                <br />
              </p>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">Home</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <a href="#">About us</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <a href="#">Services</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <a href="/terms-and-conditions">Terms of service</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <a href="/privacy-policy">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <a href="#">Matches</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">Chat</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <a href="#">Horescope</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Social Networks</h4>
              <p>
                Cras fermentum odio eu feugiat lide par naso tierra videa magna
                derita valies
              </p>
              <div className="social-links mt-3">
                <a href="https://twitter.com/home" className="twitter">
                  <i className="bx bxl-twitter"></i>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100082580644187"
                  className="facebook"
                >
                  <i className="bx bxl-facebook"></i>
                </a>
                <a
                  href="https://instagram.com/pellifix?igshid=YmMyMTA2M2Y="
                  className="instagram"
                >
                  <i className="bx bxl-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="copyright">
          &copy; Copyright
          <strong>
            <span>Pellifix</span>
          </strong>
          . All Rights Reserved
        </div>
      </div>
    </footer>
  );
};
export default Footer;
