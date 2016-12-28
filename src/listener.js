import React, { Component } from 'react';

export default (...objects) => {
  return Klass => {
    return class extends Component {
      rerender = () => {
        this.setState({});
      }

      componentWillMount() {
        objects.forEach(obj => {
          if (obj.context) { // it's store
            obj.listen(this.rerender);
          } else { // it's function
            this.storeProps = obj(this.props);

            Object.keys(this.storeProps).forEach(key => {
              this.storeProps[key].listen(this.rerender);
            });
          }
        });
      }

      componentWillReceiveProps(nextProps) {
        objects.forEach(obj => {
          if (obj.context) return;

          Object.keys(this.storeProps).forEach(key => {
            this.storeProps[key].unlisten(this.rerender);
          });

          this.storeProps = obj(nextProps);

          Object.keys(this.storeProps).forEach(key => {
            this.storeProps[key].listen(this.rerender);
          });
        })
      }

      componentWillUnmount() {
        objects.forEach(obj => {
          if (obj.context) { // it's store
            obj.unlisten(this.rerender);
          } else { // it's function
            this.storeProps = obj(this.props);

            Object.keys(this.storeProps).forEach(key => {
              this.storeProps[key].unlisten(this.rerender);
            });
          }
        });
      }

      render() {
        return (<Klass {...this.props} {...this.storeProps} />)
      }
    }
  }
}
