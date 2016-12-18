import { model } from 'hacksaw';
import { listener } from '../../src';
import React, { Component } from 'react';

describe('listener', () => {
  it('re-render the component correctly', () => {
    @model class Product {}

    @listener(Product.context('search'))
    class MyComponent extends Component {
      render() {
        return <span></span>
      }
    }

    sinon.spy(MyComponent.prototype, 'setState');
    const wrapper = mount(<MyComponent />);
    expect(MyComponent.prototype.setState).to.have.property('callCount', 0);

    Product.context('search', 'hey').put({ id: 1, name: 'test' });
    expect(MyComponent.prototype.setState).to.have.property('callCount', 1);

    wrapper.unmount();
    Product.context('search', 'hey').put({ id: 2, name: 'test2' });
    expect(MyComponent.prototype.setState).to.have.property('callCount', 1);
  });
});
