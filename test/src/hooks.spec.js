import React from 'react';
import { createStore } from "hacksaw";
import { mount } from 'enzyme';
import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import { Provider, useStore, useView } from '../../src';

describe('hooks', () => {
  let store;

  beforeEach(() => {
    store = createStore({ tables: { products: {} } });
  });

  describe('useStore', () => {
    it('returns store', () => {
      const { result } = renderHook(() => useStore(), {
        wrapper: props => <Provider {...props} store={store} />
      });

      expect(result.current).toEqual(store);
    });

    it('renders the view after update', () => {
      const ids = [];

      const TheComponent = () => {
        const store = useStore();
        ids.push(store.products.all.map(i => i.id));
        return <div />
      };

      mount(<Provider store={store}><TheComponent /></Provider>);

      expect(ids).toEqual([[]]);

      act(() => {
        store.products.put([{ id: 5 }, { id: 10 }]);
      });

      expect(ids).toEqual([[], [5, 10]]);
    });
  });

  describe('useView', () => {
    it('returns correct view', () => {
      const view = store.view('test-view');
      const { result } = renderHook(() => useView('test-view'), {
        wrapper: props => <Provider {...props} store={store} />
      });

      expect(result.current).toEqual(view);
    });

    it('renders the view after update', () => {
      let renderCount = 0;
      const view = store.view('test-view');

      const TheComponent = () => {
        const store = useView('test-view');
        renderCount++;
        return <div />
      };

      mount(<Provider store={store}><TheComponent /></Provider>);

      expect(renderCount).toEqual(1);

      act(() => {
        store.products.put([{ id: 5 }, { id: 10 }]);
      });

      expect(renderCount).toEqual(1);

      act(() => {
        store.view('test-view').products.put([{ id: 6 }, { id: 10 }]);
      });

      expect(renderCount).toEqual(2);
    });
  });
})
