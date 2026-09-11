import React from 'react'

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('CanvasErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-bharatos-bg p-6 text-center">
          <div className="glass-panel p-8 max-w-md">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neon-purple/20 flex items-center justify-center border border-neon-purple/40">
              <span className="text-neon-cyan font-bold font-sora">3D</span>
            </div>
            <h3 className="font-sora text-lg font-semibold text-white mb-2">3D Viewport Notice</h3>
            <p className="font-inter text-white/50 text-sm mb-4">
              The 3D interactive scene encountered a graphics hardware reset. The rest of the page remains fully functional.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn-glass text-xs py-2 px-6"
            >
              Retry Viewport
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default CanvasErrorBoundary
