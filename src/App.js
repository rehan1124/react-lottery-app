import "./App.css";
import React, { Component } from "react";
import lottery from "./lottery";
import web3 from "./web3";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };
  async componentDidMount() {
    // await window.ethereum.request({ method: "eth_requestAccounts" });
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayerList().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players: players.length, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    // Retrieve Metamask user account
    const account = await web3.eth.getAccounts();
    if (account[0] === this.state.manager) {
      this.setState({ message: "Manager cannot enter in Lottery game." });
    } else {
      this.setState({ message: "Waiting on transaction success..." });
      // Send transaction to network
      await lottery.methods.enter().send({
        from: account[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      this.setState({
        message: "Congratulations! You have entered the lottery.",
      });
    }
  };

  render() {
    return (
      <div id="lottery-game" className="">
        <h1 id="game">This is our Lottery game.</h1>
        <p id="contract-manager">Contract is managed by {this.state.manager}</p>
        <h4 id="game-details">
          {this.state.players} players have joined, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </h4>
        <hr></hr>
        <form id="input-game-details" onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter: </label>
            <input
              id="game-amount"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button id="enter-game-button">Enter</button>
        </form>
        <hr></hr>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
