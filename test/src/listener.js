import { store } from 'hacksaw';
import { listener } from '../../src';
import React, { Component } from 'react';

describe('listener', () => {
  it('re-render the component correctly', () => {
    @store class ProductStore {}

    @listener(ProductStore.context('search'))
    class MyComponent extends Component {
      render() {
        return <span></span>
      }
    }

    sinon.spy(MyComponent.prototype, 'setState');
    const wrapper = mount(<MyComponent />);
    expect(MyComponent.prototype.setState).to.have.property('callCount', 0);

    ProductStore.context('search', 'hey').put({ id: 1, name: 'test' });
    expect(MyComponent.prototype.setState).to.have.property('callCount', 1);

    wrapper.unmount();
    ProductStore.context('search', 'hey').put({ id: 2, name: 'test2' });
    expect(MyComponent.prototype.setState).to.have.property('callCount', 1);
  });
});
