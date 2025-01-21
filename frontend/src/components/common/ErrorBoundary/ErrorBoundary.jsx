import React, { Component } from "react"
import { ErrorDisplay } from "./ErrorDisplay"

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: {
        code: "RUNTIME_ERROR",
        message: "Something went wrong",
        timestamp: new Date().toISOString(),
      }
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          error={this.state.error}
          onClose={() => this.setState({ hasError: false, error: null })}
        />
      )
    }

    return this.props.children
  }
}