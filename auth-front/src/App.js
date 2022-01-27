import React, { Component } from "react";
import "./App.css";
import Logo from "./components/logo/Logo";
import UserForm from "./components/userform/UserForm";
import Particles from "react-tsparticles";
import particlesOptions from "./components/particles/particles.json";
import Modal from "react-modal";
import MyModalInfo from "./components/modal/MyModal.jsx";

import customStyles from "./components/modal/ModalStyle.json";

Modal.setAppElement("#root");

const initialState = {
  username: "",
  openModal: false,
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  onInputChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onButtonSubmit = () => {
    if (this.state.username) {
      this.setState({ openModal: true });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="vh-100 dt w-100">
          <div className="dtc v-mid tc">
            <Particles options={particlesOptions} className="particles" />
            <Logo />
            <UserForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {this.state.openModal ? (
              <Modal
                isOpen={this.state.openModal}
                onRequestClose={() => {
                  this.setState({ openModal: false });
                }}
                style={customStyles}
                contentLabel="AuthTokenModal"
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
              >
                <MyModalInfo
                  user={this.state.username}
                  token={782147}
                  time={Date.now() + 5000}
                />
              </Modal>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
