import React, { useState } from "react";

import "./error-button.css";

const ErrorButton = () => {
  const [renderError, setRenderError] = useState(false);
  return (
    <button
      className="error-button btn btn-danger btn-lg"
      onClick={() => setRenderError(true)}
    >
      Throw Error
    </button>
  );
};

export default ErrorButton;
