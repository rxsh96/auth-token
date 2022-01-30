import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";

const MyModalInfo = (props) => {
  const [user] = useState(props.user);
  const [token, setToken] = useState("");
  const [remaining, setRemaining] = useState(0);

  const fetchData = () => {
    fetch(`http://127.0.0.1:3000/generarToken/?cliente=${user}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
        setRemaining(Date.now() + data.remaining * 1000);
      });
  };

  useEffect(() => {
    fetchData();
  });

  const myRenderer = ({ seconds }) => {
    return <h3>{`${seconds}s`}</h3>;
  };

  return (
    <div className="tc ma2 pa2 ba b--mid-gray">
      <h3>Token Virtual para {user}</h3>
      <div className="br4">
        <h2 className="b dark-green">{token}</h2>
      </div>
      <Countdown
        date={remaining}
        key={remaining}
        onComplete={fetchData}
        renderer={myRenderer}
      />
    </div>
  );
};

export default MyModalInfo;
