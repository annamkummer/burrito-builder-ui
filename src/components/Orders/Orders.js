import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map((order) => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, i) => {
            return <li key={order.id + i}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section className='orders-section'>
      {props.error && <p>Oops! There was an issue. Please check your internet and try again!</p>}
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;