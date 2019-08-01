import React, { Component } from 'react'

// ProductItem 一条产品
class ProductItem extends Component {
  render () {
    const { item } = this.props;

    return (
      <div className="product-item">
        <div className={item.stocked ? "" : "name"}>{item.name}</div>
        <div>{item.price}</div>
      </div>
    );
  }
}

// ProductTitle 产品标题
class ProductTitle extends Component {
  render () {
    const { category } = this.props;

    return (
      <div className="product-title">
        {category}
      </div>
    );
  }
}

// ProductList 产品列表
class ProductList extends Component {
  render () {
    const { filterText, inStockOnly } = this.props;

    const item = [];
    let title;

    this.props.products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }

      if (product.category !== title) {
        item.push(<ProductTitle category={product.category} key={product.category} />);
      }
      item.push(<ProductItem item={product} key={product.name} />);
      title = product.category;
    });

    return (
      <div className="product-list">
        <div className="title">
          <div>name</div>
          <div>price</div>
        </div>
        <div>{item}</div>
      </div>
    );
  }
}

// SearchTool 搜索
class SearchTool extends Component {
  constructor (props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange (e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange (e) {
    this.props.onInStockChange(e.target.checked);
  }

  render () {
    const { filterText, inStockOnly } = this.props;

    return (
      <div className="search-tool">
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleInStockChange}
          />
          Only show products in stock
        </p>
      </div>
    );
  }
}

// ProductWrap 组件包裹框
class ProductWrap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange (filterText) {
    this.setState({
      filterText: filterText
    })
  }

  handleInStockChange (inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }
 
  render () {
    return (
      <div className="product-wrap">
        <SearchTool
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductList
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

export default ProductWrap;