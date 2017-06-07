import { createStore } from 'hacksaw';
import { listener } from '../../src';
import React, { Component } from 'react';

describe('listener', () => {
  it('re-render the component correctly', () => {
    const store = createStore({ tables: { products: {} } });

    @listener(store.view('search'))
    class MyComponent extends Component {
      render() {
        return <span />
      }
    }

    sinon.spy(MyComponent.prototype, 'setState');
    const wrapper = mount(<MyComponent />);
    expect(MyComponent.prototype.setState).to.have.property('callCount', 0);

    store.view('search').products.put({ id: 1, name: 'test' });
    expect(MyComponent.prototype.setState).to.have.property('callCount', 1);

    wrapper.unmount();
    store.view('search').products.put({ id: 2, name: 'test2' });
    expect(MyComponent.prototype.setState).to.have.property('callCount', 1);
  });

  it ('allows function arguments', () => {
    const store = createStore({ tables: { products: {} } });

    @listener(props => ({
      viewStore: store.view(props.query)
    }))
    class MyComponent extends Component {
      render() {
        const { viewStore } = this.props;
        return (
          <div>
            {viewStore.products.all.map((item, index) => (
              <span key={`i${index}`}>{item.name}</span>
            ))}
          </div>
        )
      }
    }

    const wrapper = mount(<MyComponent query="query1" />);

    store.view('query1').products.put({ id: 1, name: 'q1' });
    store.view('query2').products.put({ id: 2, name: 'q2' });
    expect(wrapper.html()).to.eq('<div><span>q1</span></div>');

    wrapper.setProps({ query: 'query2' });
    store.view('query2').products.put({ id: 3, name: 'q3' });
    expect(wrapper.html()).to.eq('<div><span>q2</span><span>q3</span></div>');
    expect(store.view('query1').callbacks).to.eql([]);
    wrapper.unmount();
    expect(store.view('query2').callbacks).to.eql([]);
  });
});
