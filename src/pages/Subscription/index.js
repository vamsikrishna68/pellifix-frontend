import React from "react";
import PaymentModal from "./PaymentModal";
import PricingCard from "./PricingCard";
import { ls } from "../../utils/localStorage";
import "./Subscription.scss";
const pricingDataAll = {
  generic: {
    priceDesc: "some small print",
    description:
      "This is the most basic package but it's also the cheapest. Great for ordinary use.",
  },

  common: {
    one: {
      description:
        "This is the most basic package but it's also the cheapest. Great for ordinary use.",
    },
    two: {
      description:
        "Best selling option. This is well suited for all around general everything.",
    },
    three: {
      description:
        "Enterprise edition. Heavy duty awesomeness that'll handle just about anything",
    },
  },

  regular: {
    generic: {
      priceOverview: "Standard Version",
    },
    one: {
      title: "Mothly",
      price: 1.45,
      billingCode: "basic-extra",
      priceOverview: "Includes all Extra features",
      days: "30 Days",
    },
    two: {
      title: "Half-yearly",
      price: 2.45,
      billingCode: "advanced-extra",
      priceOverview: "Includes all Extra features",
      days: "6 Months",
    },
    three: {
      title: "Yearly",
      price: 3.45,
      billingCode: "enterprise-extra",
      priceOverview: "Includes all Extra features",
      days: "1 Year",
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
    };
  }
  componentDidMount() {
    // this.fetchMyProfile();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }

  fetchMyProfile = () => {
    const { fields } = this.state;
    const data = JSON.parse(ls.getItem("profile_for_reference"));
    fields = { ...fields, data };
    console.log({ data, fields });
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
          paymentInfo: {
            ...this.state.fields.paymentInfo,
            cardPayment: razorpay_payment_id ? "success" : "",
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          },
        },
      },
      () => {
        consolelog("Payment complete");
      }
    );
  };

  render() {
    const { openCardDetailModal, fields } = this.state;
    let pricingDataCurrent = pricingDataAll.regular;
    let common = pricingDataAll.common;
    pricingDataCurrent = pricingDataAll.regular;

    const generic = pricingDataAll.generic,
      one = pricingDataCurrent.one,
      two = pricingDataCurrent.two,
      three = pricingDataCurrent.three;
    return (
      <div className="subscription">
        {openCardDetailModal && (
          <PaymentModal
            customer={{
              name: fields.name,
              phone: fields.phone,
              email: fields.email,
              fare: fields.fare,
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
          <div className="container">
            <PricingCard
              pricingData={one}
              common={common.one}
              generic={generic}
              handlePay={this.handlePay}
              monthly
            />

            <PricingCard
              pricingData={two}
              common={common.two}
              generic={generic}
              handlePay={this.handlePay}
              halfYearly
            />

            <PricingCard
              pricingData={three}
              common={common.three}
              generic={generic}
              handlePay={this.handlePay}
              yearly
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Subscription;
