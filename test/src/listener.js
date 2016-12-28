import { store } from 'hacksaw';
import { listener } from '../../src';
import React, { Component } from 'react';

describe('listener', () => {
  it('re-render the component correctly', () => {
    @store class ProductStore {}

    @listener(ProductStore.context('search'))
    class MyComponent extends Component {
      render() {
        return <span />
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

  it ('allows function arguments', () => {
    @store class ProductStore {}

    @listener(props => ({
      productStore: ProductStore.context(props.query)
    }))
    class MyComponent extends Component {
      render() {
        const { productStore } = this.props;
        return (
          <div>
            {productStore.all.map((item, index) => (
              <span key={`i${index}`}>{item.name}</span>
            ))}
          </div>
        )
      }
    }

    const wrapper = mount(<MyComponent query="query1" />);

    ProductStore.context('query1').put({ id: 1, name: 'q1' });
    ProductStore.context('query2').put({ id: 2, name: 'q2' });
    expect(wrapper.html()).to.eq('<div><span>q1</span></div>');

    wrapper.setProps({ query: 'query2' });
    ProductStore.context('query2').put({ id: 3, name: 'q3' });
    expect(wrapper.html()).to.eq('<div><span>q2</span><span>q3</span></div>');
    expect(ProductStore.context('query1').callbacks).to.eql([]);
    wrapper.unmount();
    expect(ProductStore.context('query2').callbacks).to.eql([]);
  });
});
