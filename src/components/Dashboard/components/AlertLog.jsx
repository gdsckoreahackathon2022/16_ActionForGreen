import React from "react";

// eslint-disable-next-line react/prop-types
const AlertLog = ({ date, content }) => {
  return (
    <div className="alert-log">
      <span className="date">{date}</span>
      <span className="content">{content}</span>
    </div>
  );
};

export default AlertLog;
