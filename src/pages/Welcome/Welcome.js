import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import './style.scss'
import "aos/dist/aos.css";



const Welcome = () => {
    const navigate = useNavigate();
    useEffect(() => {

        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: false,
            mirror: true
        });
    })

    useLayoutEffect(() => {
        function updatePosition() {
            let selectHeader = select('#header')

            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
            let backtotop = select('.back-to-top')
            if (backtotop) {
                if (window.scrollY > 100) {
                    backtotop.classList.add('active')
                } else {
                    backtotop.classList.remove('active')
                }
            }
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
    }, []);


    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }
    return (
        <div className='welcome'>

            <header id="header" className="fixed-top  header-transparent ">
                <div className="container d-flex align-items-center justify-content-between">

                    <div className="logo">
                        <h1><a href="index.html">Pellifix</a></h1>


                    </div>

                    <nav id="navbar" className="navbar">
                        <ul>
                            <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                            <li><a className="nav-link scrollto" href="#features">App Features</a></li>
                            {/* <li><a className="nav-link scrollto" href="#gallery">Gallery</a></li> */}
                            <li><a className="nav-link scrollto" href="#faq">F.A.Q</a></li>
                            <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
                            <li>
                                <span onClick={() => navigate('/login')} className="getstarted"> Login</span>
                            </li>
                            <li>
                                <span onClick={() => navigate('/register')} className="getstarted"> Register</span>
                            </li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                </div>
            </header>


            <section id="hero" className="d-flex align-items-center">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1" data-aos="fade-up">
                            <div>
                                <h1>Welcome to Pellifix</h1>
                                <h2>
                                    Life is the greatest gift humanity has been given, and surviving it is the ultimate test. Having a great partner by your side can make this journey much easier and more enjoyable. Here at Pelli fix, we take great pleasure in helping you find the perfect partner to make your life more glorious.
                                </h2>
                                <span onClick={() => navigate('/login')} className="download-btn"> Login</span>
                                <span onClick={() => navigate('/register')} className="download-btn"> Register</span>
                            </div>
                        </div>
                        <div className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img" data-aos="fade-up">
                            <img style={{ width: '140%', height: '600px' }} src={require("../../assets/img/img1.gif")} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>

            </section>

            <main id="main">


                <section id="features" className="features">
                    <div className="container">

                        <div className="section-title">
                            <h2>App Features</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-xl-7 d-flex align-items-stretch order-2 order-lg-1">
                                <div className="content d-flex flex-column justify-content-center">
                                    <div className="row">
                                        <div className="col-md-6 icon-box" data-aos="fade-up">
                                            <i className="bx bx-receipt"></i>
                                            <h4>Corporis voluptates sit</h4>
                                            <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                                        </div>
                                        <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                                            <i className="bx bx-cube-alt"></i>
                                            <h4>Ullamco laboris nisi</h4>
                                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                                        </div>
                                        <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                                            <i className="bx bx-images"></i>
                                            <h4>Labore consequatur</h4>
                                            <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                                        </div>
                                        <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                                            <i className="bx bx-shield"></i>
                                            <h4>Beatae veritatis</h4>
                                            <p>Expedita veritatis consequuntur nihil tempore laudantium vitae denat pacta</p>
                                        </div>
                                        <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
                                            <i className="bx bx-atom"></i>
                                            <h4>Molestiae dolor</h4>
                                            <p>Et fuga et deserunt et enim. Dolorem architecto ratione tensa raptor marte</p>
                                        </div>
                                        <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="500">
                                            <i className="bx bx-id-card"></i>
                                            <h4>Explicabo consectetur</h4>
                                            <p>Est autem dicta beatae suscipit. Sint veritatis et sit quasi ab aut inventore</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="image col-xl-5 d-flex align-items-stretch justify-content-center order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                                <img src={require("../../assets/img/details-1.png")} className="img-fluid" alt="" />
                            </div>
                        </div>

                    </div>
                </section>


                <section id="details" className="details">
                    <div className="container">

                        <div className="row content">
                            <div className="col-md-4" data-aos="fade-right">
                                <img src={require("../../assets/img/details-1.png")} className="img-fluid" alt="" />
                            </div>
                            <div className="col-md-8 pt-4" data-aos="fade-up">
                                <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
                                <p className="fst-italic">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.
                                </p>
                                <ul>
                                    <li><i className="bi bi-check"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                                    <li><i className="bi bi-check"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                                    <li><i className="bi bi-check"></i> Iure at voluptas aspernatur dignissimos doloribus repudiandae.</li>
                                    <li><i className="bi bi-check"></i> Est ipsa assumenda id facilis nesciunt placeat sed doloribus praesentium.</li>
                                </ul>
                                <p>
                                    Voluptas nisi in quia excepturi nihil voluptas nam et ut. Expedita omnis eum consequatur non. Sed in asperiores aut repellendus. Error quisquam ab maiores. Quibusdam sit in officia
                                </p>
                            </div>
                        </div>

                        <div className="row content">
                            <div className="col-md-4 order-1 order-md-2" data-aos="fade-left">
                                <img src={require("../../assets/img/details-2.png")} className="img-fluid" alt="" />
                            </div>
                            <div className="col-md-8 pt-5 order-2 order-md-1" data-aos="fade-up">
                                <h3>Corporis temporibus maiores provident</h3>
                                <p className="fst-italic">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.
                                </p>
                                <p>
                                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum
                                </p>
                                <p>
                                    Inventore id enim dolor dicta qui et magni molestiae. Mollitia optio officia illum ut cupiditate eos autem. Soluta dolorum repellendus repellat amet autem rerum illum in. Quibusdam occaecati est nisi esse. Saepe aut dignissimos distinctio id enim.
                                </p>
                            </div>
                        </div>

                        <div className="row content">
                            <div className="col-md-4" data-aos="fade-right">
                                <img src={require("../../assets/img/details-3.png")} className="img-fluid" alt="" />
                            </div>
                            <div className="col-md-8 pt-5" data-aos="fade-up">
                                <h3>Sunt consequatur ad ut est nulla consectetur reiciendis animi voluptas</h3>
                                <p>Cupiditate placeat cupiditate placeat est ipsam culpa. Delectus quia minima quod. Sunt saepe odit aut quia voluptatem hic voluptas dolor doloremque.</p>
                                <ul>
                                    <li><i className="bi bi-check"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                                    <li><i className="bi bi-check"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                                    <li><i className="bi bi-check"></i> Facilis ut et voluptatem aperiam. Autem soluta ad fugiat.</li>
                                </ul>
                                <p>
                                    Qui consequatur temporibus. Enim et corporis sit sunt harum praesentium suscipit ut voluptatem. Et nihil magni debitis consequatur est.
                                </p>
                                <p>
                                    Suscipit enim et. Ut optio esse quidem quam reiciendis esse odit excepturi. Vel dolores rerum soluta explicabo vel fugiat eum non.
                                </p>
                            </div>
                        </div>

                        <div className="row content">
                            <div className="col-md-4 order-1 order-md-2" data-aos="fade-left">
                                <img src={require("../../assets/img/details-4.png")} className="img-fluid" alt="" />
                            </div>
                            <div className="col-md-8 pt-5 order-2 order-md-1" data-aos="fade-up">
                                <h3>Quas et necessitatibus eaque impedit ipsum animi consequatur incidunt in</h3>
                                <p className="fst-italic">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.
                                </p>
                                <p>
                                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum
                                </p>
                                <ul>
                                    <li><i className="bi bi-check"></i> Et praesentium laboriosam architecto nam .</li>
                                    <li><i className="bi bi-check"></i> Eius et voluptate. Enim earum tempore aliquid. Nobis et sunt consequatur. Aut repellat in numquam velit quo dignissimos et.</li>
                                    <li><i className="bi bi-check"></i> Facilis ut et voluptatem aperiam. Autem soluta ad fugiat.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>


                <section id="faq" className="faq section-bg">
                    <div className="container" data-aos="fade-up">

                        <div className="section-title">

                            <h2>Frequently Asked Questions</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div className="accordion-list">
                            <ul>
                                <li data-aos="fade-up">
                                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#accordion-list-1">Non consectetur a erat nam at lectus urna duis? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                                    <div id="accordion-list-1" className="collapse show" data-bs-parent=".accordion-list">
                                        <p>
                                            Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                                        </p>
                                    </div>
                                </li>

                                <li data-aos="fade-up" data-aos-delay="100">
                                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#accordion-list-2" className="collapsed">Feugiat scelerisque varius morbi enim nunc? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                                    <div id="accordion-list-2" className="collapse" data-bs-parent=".accordion-list">
                                        <p>
                                            Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                                        </p>
                                    </div>
                                </li>

                                <li data-aos="fade-up" data-aos-delay="200">
                                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#accordion-list-3" className="collapsed">Dolor sit amet consectetur adipiscing elit? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                                    <div id="accordion-list-3" className="collapse" data-bs-parent=".accordion-list">
                                        <p>
                                            Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                                        </p>
                                    </div>
                                </li>

                                <li data-aos="fade-up" data-aos-delay="300">
                                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#accordion-list-4" className="collapsed">Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                                    <div id="accordion-list-4" className="collapse" data-bs-parent=".accordion-list">
                                        <p>
                                            Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in.
                                        </p>
                                    </div>
                                </li>

                                <li data-aos="fade-up" data-aos-delay="400">
                                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#accordion-list-5" className="collapsed">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                                    <div id="accordion-list-5" className="collapse" data-bs-parent=".accordion-list">
                                        <p>
                                            Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque.
                                        </p>
                                    </div>
                                </li>

                            </ul>
                        </div>

                    </div>
                </section>

                <section id="contact" className="contact">
                    <div className="container" data-aos="fade-up">

                        <div className="section-title">
                            <h2>Contact</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div className="row">

                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-6 info">
                                        <i className="bx bx-map"></i>
                                        <h4>Address</h4>
                                        <p>A108 Adam Street,<br />New York, NY 535022</p>
                                    </div>
                                    <div className="col-lg-6 info">
                                        <i className="bx bx-phone"></i>
                                        <h4>Call Us</h4>
                                        <p>+1 5589 55488 55<br />+1 5589 22548 64</p>
                                    </div>
                                    <div className="col-lg-6 info">
                                        <i className="bx bx-envelope"></i>
                                        <h4>Email Us</h4>
                                        <p>contact@example.com<br />info@example.com</p>
                                    </div>
                                    <div className="col-lg-6 info">
                                        <i className="bx bx-time-five"></i>
                                        <h4>Working Hours</h4>
                                        <p>Mon - Fri: 9AM to 5PM<br />Sunday: 9AM to 1PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <form action="forms/contact.php" method="post" role="form" className="php-email-form" data-aos="fade-up">
                                    <div className="form-group">
                                        <input placeholder="Your Name" type="text" name="name" className="form-control" id="name" required />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input placeholder="Your Email" type="email" className="form-control" name="email" id="email" required />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input placeholder="Subject" type="text" className="form-control" name="subject" id="subject" required />
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea placeholder="Message" className="form-control" name="message" rows="5" required></textarea>
                                    </div>
                                    <div className="my-3">
                                        <div className="loading">Loading</div>
                                        <div className="error-message"></div>
                                        <div className="sent-message">Your message has been sent. Thank you!</div>
                                    </div>
                                    <div className="text-center"><button type="submit">Send Message</button></div>
                                </form>
                            </div>

                        </div>

                    </div>
                </section>

            </main>


            <footer id="footer">

                <div className="footer-newsletter">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h4>Join Our Newsletter</h4>
                                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                                <form action="" method="post">
                                    <input type="email" name="email" /><input type="submit" value="Subscribe" />
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
                                    Dargamitta<br />
                                    Nellore <br /><br />
                                    <strong>Phone:</strong> +91 **********<br />
                                    <strong>Email:</strong> vamsi68krishna@gmail.com<br />
                                </p>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Matches</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Chat</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Horescope</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Social Networks</h4>
                                <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
                                <div className="social-links mt-3">
                                    <a href="https://twitter.com/home" className="twitter"><i className="bx bxl-twitter"></i></a>
                                    <a href="https://www.facebook.com/profile.php?id=100082580644187" className="facebook"><i className="bx bxl-facebook"></i></a>
                                    <a href="https://instagram.com/pellifix?igshid=YmMyMTA2M2Y=" className="instagram"><i className="bx bxl-instagram"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container py-4">
                    <div className="copyright">
                        &copy; Copyright <strong><span>Pellifix</span></strong>. All Rights Reserved
                    </div>
                </div>
            </footer>
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </div>

    )
}

export default Welcome