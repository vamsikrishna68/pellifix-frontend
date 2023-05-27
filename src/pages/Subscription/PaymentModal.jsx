import React from "react";
import axios from "axios";
import Logo from "../../assets/logo.jpg";
import { fetchRazorPay } from "../../api/api";

class PaymentModal extends React.PureComponent {
  componentWillMount() {
    this.fetchPay();
  }

  fetchPay = async () => {
    const { customer: c } = this.props;
    let formData = {
      amount: Number(c.fare),
      receipt: c.profileId,
      notes: {
        id: c.id,
        name: c.name,
        // email: c.email,
        // phone: c.phone,
      },
    };
    try {
      const response = await fetchRazorPay(formData);
      if (response && response.status == 200) {
        console.log({ response: response.data });
        if (response && response.data) {
          const { id, currency, amount } = response.data;
          console.log({ id, currency, amount });
          // display bold here
          this.launchRazorpay({ id, currency, amount });
        } else {
          this.showError();
        }
      }
    } catch (error) {
      this.showError();
      this.props.handleCancelPayment();
    }
  };

  launchRazorpay = (data) => {
    const {
      customer: c,
      handelPaymentComplete,
      handleCancelPayment,
      closeModalHandler,
    } = this.props;
    let options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: c.pellifixid,
      description: "Pellifix subscription payment",
      image: Logo,
      order_id: data.id,
      handler: function (response) {
        console.log({ response });
        // check and return for success
        if (response.error && response.error.code === "BAD_REQUEST_ERROR") {
          handleCancelPayment();
        } else {
          const { razorpay_signature, razorpay_order_id, razorpay_payment_id } =
            response;
          handelPaymentComplete({
            razorpay_signature,
            razorpay_order_id,
            razorpay_payment_id,
          });
        }
      },
      prefill: {
        name: c.name,
        email: c.email,
        contact: c.phone,
      },
      notes: {
        profileId: c.profileId,
      },
      theme: {
        color: "#222222",
      },
      modal: {
        ondismiss: function () {
          closeModalHandler();
        },
      },
    };
    let rzp = new window.Razorpay(options);
    rzp.open();
  };

  showError = () => {
    alert(
      "Looks like there was a payment issue while processing your card. Please try again with a different card."
    );
  };

  render() {
    return null;
  }
}

export default PaymentModal;
