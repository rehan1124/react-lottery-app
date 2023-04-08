import "./App.css";
import React, { Component } from "react";
import lottery from "./lottery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { manager: "", players: "" };
  }
  async componentDidMount() {
    // await window.ethereum.request({ method: "eth_requestAccounts" });
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayerList().call();
    this.setState({ manager, players: players.length });
  }
  render() {
    return (
      <div>
        <h1>This is our Lottery game.</h1>
        <p>Contract is managed by {this.state.manager}</p>
        <h3>Number of players joined: {this.state.players}</h3>
      </div>
    );
  }
}

export default App;
