import React from "react";
import "./styles.css";

const options = [
  {
    label: "--Choose an option--",
    value: "0"
  },
  { label: "30%-Outstanding", value: "0.3" },
  {
    label: "20%-Good",
    value: "0.2"
  },
  {
    label: "15%-It was OK",
    value: "0.15"
  },
  {
    label: "10%-Bad",
    value: "0.1"
  },
  {
    label: "5%-Terrible",
    value: "0.05"
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      billAmount: "",
      numPeople: "",
      optionTip: "",
      tip: 0.0,
      each: "each"
    };
  }
  enterAmount = (e) => {
    this.setState({ billAmount: e.target.value });
  };

  enterNumPeople = (e) => {
    const { numPeople, each } = this.state;

    if (numPeople <= 1 || numPeople === "") {
      this.setState({ each: "", numPeople: 1 });
    } else {
      this.setState({ each: each, numPeople: e.target.value });
    }
  };

  calculate = () => {
    const { billAmount, numPeople, optionTip } = this.state;

    if (billAmount === "" || optionTip === 0) {
      return alert("Please enter values");
    }

    let total = (billAmount * optionTip) / numPeople;
    total = (Math.round(total * 100) / 100).toFixed(2);
    this.setState({ tip: total });
  };

  handleChange = (e) => {
    this.setState({ optionTip: e.target.value });
    this.enterNumPeople();
  };

  render() {
    const { billAmount, numPeople, optionTip, tip, each } = this.state;
    return (
      <div className="container">
        <h1>TIP CALCULATOR</h1>
        <div className="calculator">
          <label for="bill">How much was your bill?</label>
          <br />
          $
          <input
            id="bill"
            type="text"
            placeholder="Bill Amount"
            value={billAmount}
            onChange={this.enterAmount}
          />
          <br />
          <label for="option">How was your service?</label>
          <br />
          <select id="option" value={optionTip} onChange={this.handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          <br />
          <label for="people">How many people are sharing the bill?</label>
          <br />
          <input
            id="people"
            placeholder="Number of People"
            value={numPeople}
            onChange={this.enterNumPeople}
          />
          people
          <br />
          <button type="button" onClick={this.calculate}>
            CALCULATE!
          </button>
          <div className="total">
            <sup>$</sup>
            <span id="tip">{tip}</span>
            <small id="each">{each}</small>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
