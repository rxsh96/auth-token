import React from "react";
import "./UserForm.css";

const UserForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="flex flex-column">
      <p className="black b">{"Generate Authentication Key"}</p>
      <div className="pa3 mr2">
        <div className="form pa4 br2 shadow-5">
          <input
            className="f4 pa2"
            type="text"
            placeholder="username"
            onChange={onInputChange}
          />
          <button
            className="grow f4 link ph3 pv2 dib black my-color"
            onClick={onButtonSubmit}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
