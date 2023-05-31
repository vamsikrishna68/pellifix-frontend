import React from "react";
import PaymentModal from "./PaymentModal";
import PricingCard from "./PricingCard";
import { ls } from "../../utils/localStorage";
import { completeRazorPay } from "../../api/api";
import ThanksPopup from "./ThanksPopup";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "./Subscription.scss";

const pricingDataAll = {
  regular: {
    quarterly: {
      months: 3,
      price: 6900,
      date: "31-Jan-2023",
      description: {
        one: "Send unlimited messages, chat, and make video calls",
        two: "Access 40 verified mobile numbers",
        three: "View unlimited horoscope",
      },
    },
    halfYearly: {
      months: 6,
      price: 13800,
      date: "31-Jan-2023",
      description: {
        one: "Send unlimited messages, chat, and make video calls",
        two: "Access 40 verified mobile numbers",
        three: "View unlimited horoscope",
      },
    },
    yearly: {
      months: 12,
      price: 20700,
      date: "31-Jan-2023",
      description: {
        one: "Send unlimited messages, chat, and make video calls",
        two: "Access 40 verified mobile numbers",
        three: "View unlimited horoscope",
      },
    },
  },

  assistedService: {
    quarterly: {
      months: 3,
      price: 8100,
      date: "31-Jan-2023",
      description: {
        one: "Send unlimited messages, chat, and make video calls",
        two: "Access 40 verified mobile numbers",
        three: "View unlimited horoscope",
      },
    },
    halfYearly: {
      months: 6,
      price: 1500,
      date: "31-Jan-2023",
      description: {
        one: "Send unlimited messages, chat, and make video calls",
        two: "Access 40 verified mobile numbers",
        three: "View unlimited horoscope",
      },
    },
    yearly: {
      months: 12,
      price: 21900,
      date: "31-Jan-2023",
      description: {
        one: "Send unlimited messages, chat, and make video calls",
        two: "Access 40 verified mobile numbers",
        three: "View unlimited horoscope",
      },
    },
  },
};

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    let fields = JSON.parse(ls.getItem("profile_for_reference"));
    this.state = {
      fields,
      openCardDetailModal: false,
      selectedPlan: "regular",
      thanksPopupOpen: false,
    };
  }

  handleThanksPopupOpen = () => {
    this.setState({
      thanksPopupOpen: true,
    });
  };

  handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      this.setState({
        thanksPopupOpen: false,
      });
    }
  };

  togglePromo = (plan) => {
    this.setState({
      selectedPlan: plan,
    });
  };

  componentDidMount() {
    // this.fetchMyProfile();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    // this.handleThanksPopupOpen();
  }

  fetchMyProfile = () => {
    const { fields } = this.state;
    const data = JSON.parse(ls.getItem("profile_for_reference"));
    fields = { ...fields, data };
    this.setState({ fields });
  };

  handleCancelPayment = () => {
    this.setState({ openCardDetailModal: false });
  };

  handlePay = (e) => {
    const { fields } = this.state;
    fields.fare = e.target.value;
    this.setState({ fields, openCardDetailModal: true });
  };

  completePayment = async (data) => {
    try {
      const response = await completeRazorPay(data);
      if (response && response.status === 204) {
        this.handleThanksPopupOpen();
      }
    } catch (error) {
      toast.error(
        error?.message
          ? error.message
          : error?.response?.data?.error?.message || "Something went wrong",
        {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Zoom,
        }
      );
    }
  };

  /**
   * Function to handle after successfull payment
   */
  handelPaymentComplete = (data) => {
    const { razorpay_signature, razorpay_order_id, razorpay_payment_id } =
      data || "";
    this.setState(
      {
        fields: {
          ...this.state.fields,
          payment_info: {
            ...this.state.fields.payment_info,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          },
        },
      },
      () => {
        let { fields } = this.state;
        let data = {
          payment_info: fields.payment_info,
        };
        this.completePayment(data);
        console.log("Payment complete");
      }
    );
  };

  render() {
    const { openCardDetailModal, fields, selectedPlan, thanksPopupOpen } =
      this.state;
    let regularData = pricingDataAll.regular;
    let assistedServiceData = pricingDataAll.assistedService;
    return (
      <div className="subscription">
        {openCardDetailModal && (
          <PaymentModal
            customer={{
              name: fields.name,
              phone: fields.phone,
              email: fields.email,
              fare: fields.fare,
              id: fields.id,
              pellifixid: "Pellifix",
              profileId: fields.profileId,
            }}
            closeModalHandler={() => {
              this.setState({ openCardDetailModal: false });
            }}
            handelPaymentComplete={this.handelPaymentComplete}
            handleCancelPayment={this.handleCancelPayment}
          />
        )}
        <section>
          <h1>Choose your plan!</h1>
          {/* <input type="checkbox" onChange={this.togglePromo.bind(this)} /> */}
          <div className="switch-field">
            <input
              type="radio"
              id="radio-one"
              name="switch-one"
              value="regular"
              checked={selectedPlan === "regular"}
              onChange={() => this.togglePromo("regular")}
            />
            <label htmlFor="radio-one">Regular</label>
            <input
              type="radio"
              id="radio-two"
              name="switch-one"
              value="assistedService"
              checked={selectedPlan === "assistedService"}
              onChange={() => this.togglePromo("assistedService")}
            />
            <label htmlFor="radio-two">Assisted Service</label>
          </div>
          <div className="container">
            {selectedPlan === "regular" ? (
              <>
                <PricingCard
                  pricingData={regularData.quarterly}
                  handlePay={this.handlePay}
                  monthly
                />

                <PricingCard
                  pricingData={regularData.halfYearly}
                  handlePay={this.handlePay}
                  halfYearly
                />

                <PricingCard
                  pricingData={regularData.yearly}
                  handlePay={this.handlePay}
                  yearly
                />
              </>
            ) : (
              <>
                <PricingCard
                  pricingData={assistedServiceData.quarterly}
                  handlePay={this.handlePay}
                  monthly
                />

                <PricingCard
                  pricingData={assistedServiceData.halfYearly}
                  handlePay={this.handlePay}
                  halfYearly
                />

                <PricingCard
                  pricingData={assistedServiceData.yearly}
                  handlePay={this.handlePay}
                  yearly
                />
              </>
            )}
          </div>
        </section>
        <ThanksPopup open={thanksPopupOpen} handleClose={this.handleClose} />
        <ToastContainer />
      </div>
    );
  }
}

export default Subscription;
