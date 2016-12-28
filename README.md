hacksaw-react
=============

Hacksaw React enables react components to update theirselves automatically.
See more about hacksaw: http://hacksaw.open.buildize.com

### Installation

```
npm install hacksaw-react
```

### Usage
```javascript
import { listener } from 'hacksaw-react';

@listener(props => ({
  store1: Store1.context(...),
  store2: Store2.context(...),
  ...
}))
class AComponent extends Compoent {
  render() {
    const { store1, store2 } = this.props;
    const items = store1.all;
    ...
  }
}
```

or

```javascript
import { listener } from 'hacksaw-react';

@listener(context1, context2, ...)
class AComponent extends Compoent {
  // ....
}
```

### Example
```javascript
import React, Component from 'react';
import { listener } from 'hacksaw-react';
import { ProductStore } from '../stores';

@listener(ProductStore.context('search'))
class Search extends Component {
  get store() {
    const { query } = this.props.location;
    return ProductStore.context('search', query);
  }

  componentWillMount() {
    const { query } = this.props.location;
    this.store.fetch(query);
  }

  render() {
    const products = this.store.all;

    return products.map(product => <span>{product.name}</span>)
  }
}
```
