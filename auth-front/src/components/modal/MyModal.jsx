import React, { useState } from "react";
import Countdown from "react-countdown";

const MyModalInfo = (props) => {
  const [timer, setTimer] = useState(props.time);
  const [token, setToken] = useState(props.token);

  const myRenderer = ({ seconds }) => {
    return <h3>{`${seconds}s`}</h3>;
  };

  return (
    <div className="tc ma2 pa2 ba b--mid-gray">
      <h3>Token Virtual para {props.user}</h3>
      <div className="br4">
        <h2 className="b dark-green">{token}</h2>
      </div>
      <Countdown
        date={timer}
        key={timer}
        onComplete={() => {
          setToken("892781");
          setTimer(Date.now() + 5000);
        }}
        renderer={myRenderer}
      />
    </div>
  );
};

export default MyModalInfo;
