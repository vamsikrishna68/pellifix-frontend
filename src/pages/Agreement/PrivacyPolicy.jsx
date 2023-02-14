import { useEffect } from "react";
import Header from "../../ui-components/Header";
import Footer from "../../ui-components/Footer";
import { Typography, Box } from "@mui/material";
import AOS from "aos";
import "../Users/Welcome/style.scss";
import "./Agreement.scss";
import "aos/dist/aos.css";

const PrivayPolicy = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  });

  return (
    <div className="welcome">
      <Header />
      <div className="container">
        <Box className="agreement">
          <Typography variant="h5" component="h1" data-aos="fade-up">
            Privacy Policy of Pellifix Matrimony
          </Typography>
          <Typography variant="subtitle2" component="p" data-aos="fade-up">
            Pellifix.com is an online matrimonial portal endeavouring constantly
            to provide you with matrimonial services. This privacy statement is
            common to all the matrimonial Website/apps operated under
            Pellifix.com Since we are strongly committed to your right to
            privacy, we have drawn out a privacy statement with regard to the
            information we collect from you. You acknowledge that you are
            disclosing information voluntarily. By accessing /using the
            website/apps and/or by providing your information, you consent to
            the collection, use, share, store and process the info you disclose
            on the website/apps in accordance with this Privacy Policy. If you
            do not agree for use of your information, please do not use or
            access this website/apps.
          </Typography>
          <Typography variant="h6" component="h2" data-aos="fade-up">
            What information you need to give in to use this Website/apps?
          </Typography>
          <Typography variant="subtitle2" component="p" data-aos="fade-up">
            The information we gather from members and visitors who apply for
            the various services our Website/Apps offers includes, but may not
            be limited to, photo of the user, email address, name, date of
            birth, educational qualifications, a user-specified password,
            mailing address, zip/pin code and telephone/mobile number or fax
            number.
            <br />
            We use a secure server for credit card transactions to protect the
            credit card information of our users and Cookies are used to store
            the login information. Cookies are small files placed on your hard
            drive that will assist us in providing our services. You may also
            encounter Cookies or identical/related devices on certain pages of
            the website/apps that are placed by third parties. We do not control
            the use of cookies by third parties. If you establish a credit
            account with us to pay the fees we charge, some additional
            information, including a billing address, a credit/debit card number
            and a credit/debit card expiration date and tracking information
            from cheques or demand drafts is collected.
            <br />
            The user information we collect depends on the context of your
            interactions with us and the website or Apps, the choices you make
            and the products and features you use. The User Information is used
            for authentication and account access, If a user registers using
            social networking platforms such as Facebook, Google, LinkedIn and
            others we may collect personal data you choose to allow us to access
            through their APIs. When the user accesses our websites or apps,
            data relating to device ID, log files ,Geographic Location, device
            Information/specification are also collected automatically.
            <br />
            We may use also your personal information for verification, analysis
            of data, usage trends and to evaluate and improve our site/App,
            marketing research , preventing of frauds. In our efforts to
            continually improve our product and service offerings, we collect
            and analyse demographic and profile data about our users' activity
            on our website/apps. We identify and use your IP address to help
            diagnose problems with our server, and to administer our
            website/apps. Your IP address is also used to help identify you and
            to gather broad demographic information.
          </Typography>
          <Typography variant="h6" component="h2" data-aos="fade-up">
            How the website/apps uses the information it collects/tracks?
          </Typography>
          <Typography variant="subtitle2" component="p" data-aos="fade-up">
            Pellifix.com collects information for data analysis, identifying
            usage trends, determining the effectiveness of our promotional
            campaigns and to evaluate and improve our websites or apps,
            products, and services ,marketing research from our users primarily
            to ensure that we are able to fulfil your requirements and to
            deliver Personalised experience.
          </Typography>
          <Typography variant="h6" component="h2" data-aos="fade-up">
            With whom the website/apps shares the information it
            collects/tracks?
          </Typography>
          <Typography variant="subtitle2" component="p" data-aos="fade-up">
            We may share such identifiable information with our
            associates/affiliates/subsidiaries and such
            associates/affiliates/subsidiaries may market to you as a result of
            such sharing. Any information you give us is held with the utmost
            care and security. We are also bound to cooperate fully should a
            situation arise where we are required by law or legal process to
            provide information about a customer/visitor.
            <br />
            Where required or permitted by law, information may be provided to
            others, such as regulators and law enforcement agencies or to
            protect the rights, property or personal safety of other members or
            the general public. We may voluntarily share your information with
            law enforcement agencies / Gateway service providers / anti-fraud
            solution provider(s) if we feel that the transaction is of
            suspicious nature.
            <br />
            From time to time, we may consider corporate transactions such as a
            merger, acquisition, reorganization, asset sale, or similar. In
            these instances, we may transfer or allow access to information to
            enable the assessment and undertaking of that transaction. If we buy
            or sell any business or assets, personal information may be
            transferred to third parties involved in the transaction.
            <br />
            Our website/apps links to other website/apps that may collect
            personally identifiable information about you. We are not
            responsible for the privacy policy or the contents of those linked
            website/apps.
          </Typography>
          <Typography variant="h6" component="h2" data-aos="fade-up">
            How Long Do We Keep Your Information?
          </Typography>
          <Typography variant="subtitle2" component="p" data-aos="fade-up">
            As stipulated in the Privacy Policy we will retain the information
            we collect from users under the following circumstances:
            <br />
            For as long as the users subscribe to our services to meet their
            suitable purpose(s) for which it was collected, for the sake of
            enforcing agreements, for performing audits, for resolving any form
            of disputes, for establishing legal defences, for pursuing
            legitimate businesses and to comply with the relevant applicable
            laws. experience.
          </Typography>
          <Typography variant="h6" component="h2" data-aos="fade-up">
            What are the Security Precautions in respect of your personal
            information?
          </Typography>
          <Typography variant="subtitle2" component="p" data-aos="fade-up">
            We aim to protect your personal information through a system of
            organizational and technical security measures. We have implemented
            appropriate internal control measures designed to protect the
            security of any personal information we process. However, please
            also remember that we cannot guarantee that the internet itself is
            100% secure. Once your information is in our possession, we adhere
            to security guidelines protecting it against unauthorised access.
          </Typography>
          <Typography variant="h6" component="h2" data-aos="fade-up">
            Change of Privacy Policy
          </Typography>
          <Typography variant="subtitle2" component="p" data-aos="fade-up">
            We may change this Privacy Policy from time to time without any
            notice to you. However, changes will be updated in the Privacy
            Policy page.
          </Typography>
          <Typography variant="h6" component="h2" data-aos="fade-up">
            How to address your Grievance :
          </Typography>
          <Typography variant="subtitle2" component="span" data-aos="fade-up">
            The Grievance officer : Mr. M Vamshikrishna. Address; Pellifix.com ,
            Contact details: 9381956441, 16-13-359/1, Near Kalpana Gas Godowns,
            Harinathapuram, Vidhyanagar Layout, Nellore 5240001 ,
            vamshikrishna@pellifix.com
          </Typography>
          <Typography variant="subtitle2" component="p" data-aos="fade-up">
            The Grievance officer shall be available between 10 am to 6 pm IST
            from Monday to Saturday excluding Sunday's and Public Holidays in
            India.
            <br />
            The Grievance officer is appointed as per Section 5 (9) of the
            Information Technology ( Reasonable Security & Procedures and
            Sensitive Personal data or Information ) Rule, 2011.
          </Typography>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default PrivayPolicy;
