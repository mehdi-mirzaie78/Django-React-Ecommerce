import React from "react";
import { Alert } from "react-bootstrap";
export const Message = ({ variant, children }) => {
  return (
    <Alert className="py-2 px-3" variant={variant}>
      {children}
    </Alert>
  );
};
