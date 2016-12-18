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

@listener(context1, context2, ...)
class AComponent extends Compoent {
  // ....
}
```

### Example
```javascript
import React, Component from 'react';
import { listener } from 'hacksaw-react';
import { Product } from '../models';

@listener(Product.context('search'))
class Search extends Component {
  get store() {
    const { query } = this.props.location;
    return Product.context('search', query);
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
