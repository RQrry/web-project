import React from 'react'
import './ProductWrap.scss'

// ProductItem 一条产品
class ProductItem extends React.Component {
  render () {
    const item = this.props.item;
    return (
      <div className="product-item">
        <div className={item.stocked ? "" : "name"}>{item.name}</div>
        <div>{item.price}</div>
      </div>
    );
  }
}

// ProductTitle 产品标题
class ProductTitle extends React.Component {
  render () {
    const category = this.props.category;
    return (
      <div className="product-title">
        {category}
      </div>
    );
  }
}

// ProductList 产品列表
class ProductList extends React.Component {
  render () {
    const item = [];
    let title;
    this.props.products.forEach(product => {
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
class SearchTool extends React.Component {
  render () {
    return (
      <div className="search-tool">
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          Only show products in stock
        </p>
      </div>
    );
  }
}

// ProductWrap 组件包裹框
class ProductWrap extends React.Component {
  render () {
    return (
      <div className="product-wrap">
        <SearchTool />
        <ProductList products={this.props.products} />
      </div>
    );
  }
}

export default ProductWrap;