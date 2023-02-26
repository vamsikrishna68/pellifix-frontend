import React from "react";
import { round } from "../../utils/formatter";

class PricingCard extends React.Component {
  render() {
    const { months, price, date, description } = this.props.pricingData;
    const one = description.one;
    const two = description.two;
    const three = description.three;
    let percentage = 8 / 100;
    let discount = round(price * percentage, 0);
    let payAmount = round(price - discount, 0);
    return (
      <div
        className={`pricing-card${this.props.halfYearly ? " halfYearly" : ""}${
          this.props.monthly ? " monthly" : ""
        }${this.props.yearly ? " yearly" : ""}`}
      >
        <div className="pc-first">
          <p>{months} Months</p>
          <p>₹{price}</p>
        </div>
        <div className="pc-second">
          <span>- {one}</span>
          <span>- {two}</span>
          <span>- {three}</span>
        </div>
        <div className="pc-third">
          <div className="pc-prices">
            <p>Total</p>
            <p>₹{price}</p>
          </div>
          <div className="pc-prices">
            <p>Discount (8%)</p>
            <p>₹{discount}</p>
          </div>
          <div className="pc-prices">
            <p>You pay</p>
            <p>₹{payAmount}</p>
          </div>
        </div>
        <div className="pc-fourth">
          <button
            value={payAmount}
            onClick={this.props.handlePay}
          >
            Pay Now ₹{payAmount}
          </button>
          <p>Valid till {date}</p>
        </div>
      </div>
    );
  }
}

export default PricingCard;
