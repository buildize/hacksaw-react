import React, { Component } from 'react';

export default (...objects) => {
  return Klass => {
    return class extends Component {
      rerender = () => {
        this.setState({});
      }

      componentWillMount() {
        objects.forEach(obj => {
          obj.listen(this.rerender);
        });
      }

      componentWillUnmount() {
        objects.forEach(obj => {
          obj.unlisten(this.rerender);
        });
      }

      render() {
        return (<Klass {...this.props} />)
      }
    }
  }
}
