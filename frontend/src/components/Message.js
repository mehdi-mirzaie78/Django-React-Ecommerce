import React from "react";
import { Alert } from "react-bootstrap";
export const Message = ({
  variant,
  children,
  dismissible = false,
  onClose = false,
}) => {
  return (
    <Alert dismissible={dismissible} variant={variant} onClose={onClose}>
      {children}
    </Alert>
  );
};
