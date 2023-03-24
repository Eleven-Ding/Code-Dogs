import React from "react";
export default class ErrorBoundary extends React.PureComponent {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {}
}
