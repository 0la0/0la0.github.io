import React, { Component } from 'react';

const pageActivation = WrappedComponent => {
  class PageActivation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isActive: false
      };
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({ isActive: true });
      });
    }

    componentWillUnmount() {
      this.setState({ isActive: false });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isActive={this.state.isActive}
        />
      );
    }
  }
  return PageActivation;
}

export default pageActivation;
