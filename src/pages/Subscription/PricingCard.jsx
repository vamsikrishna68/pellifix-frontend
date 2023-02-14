import React from "react";

class PricingCard extends React.Component {
  render() {
    const price = this.props.pricingData.price.toString().split("."),
      rupee = price[0];

    let paisa = price[1] || "00";

    return (
      <div
        className={`pricingCard${this.props.halfYearly ? " halfYearly" : ""}${
          this.props.monthly ? " monthly" : ""
        }${this.props.yearly ? " yearly" : ""}`}
      >
        <div className="title">{this.props.pricingData.title}</div>
        <div className="card">
          <h2 className="price">
            <span className="price__currency">₹</span>
            <span className="price__dollar">{rupee}</span>.
            <span className="price__cent">{paisa}</span>
          </h2>

          <p className="price-desc">{this.props.generic.priceDesc}</p>

          <p className="price-overview">
            {this.props.pricingData.priceOverview}
          </p>

          <p className="description">{this.props.common.description}</p>
        </div>
        <button
          value={this.props.pricingData.price}
          className={"bttn bttn-" + this.props.btnClass}
          onClick={this.props.handlePay}
        >
          Try Now for {this.props.pricingData.days}
        </button>
      </div>
    );
  }
}

export default PricingCard;
