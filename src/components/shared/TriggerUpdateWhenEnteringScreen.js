// TriggerUpdateWhenEnteringScreen
//
// Use for trigger content updates when scrolling downwards.
//
// triggerOffsetTop takes a negative px value which decides
// how many pixels of the content should be scrolled down to
// before triggering visibility change.
//
// Passes on a visible bool prop to all children

import React from 'react'

class TriggerUpdateWhenEnteringScreen extends React.Component {
  static defaultProps = {
    triggerOffsetTop: '-100px',
  }

  state = {
    visible: false,
  }

  changeVisibilityStatus = entry => {
    if (entry[0].intersectionRatio > 0) {
      this.setState({
        visible: true,
      })
      // TODO
      // Add option to only run the observer once and then disconnect.
      // Needed for landing
      // }, this.disconnectObserver())
    } else {
      this.setState({
        visible: false,
      })
    }
  }

  disconnectObserver = () => {
    this.observer.disconnect()
    this.observer = null
  }

  componentDidMount() {
    // IntersectionObserver also supports observing multiple elements if we want
    // to have one global instance. No idea if that's more performant.
    require('intersection-observer')
    this.observer = new IntersectionObserver(this.changeVisibilityStatus, {
      root: null,
      rootMargin: `${this.props.triggerOffsetTop} 0px 0px 0px`,
      threshold: [0],
    })
    this.observer.observe(this.wrapperElement)
  }

  componentWillUnmount() {
    this.disconnectObserver()
  }

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { visible: this.state.visible })
    )

    return (
      <div
        ref={div => {
          this.wrapperElement = div
        }}
      >
        {children}
      </div>
    )
  }
}

export default TriggerUpdateWhenEnteringScreen
