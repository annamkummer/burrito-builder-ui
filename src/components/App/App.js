import React, { Component } from 'react';
import './App.css';
import {getOrders, addOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  submitOrder = (order) => {
    order.id = Date.now()
    addOrder(order)
      .then(res => {
        res.ok && this.setState((prevState) => ({
          orders: [...prevState.orders, order]
        }))
      })
      .catch(res => {this.setState({
        error: res.message
      })})
  }

  componentDidMount() {
    getOrders()
      .then(data => {
        this.setState({
          orders: data.orders
        })
      })
      .catch(err => console.error('Error fetching:', err));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={(order) => this.submitOrder(order)}/>
        </header>

        <Orders orders={this.state.orders} error={this.state.error}/>
      </main>
    );
  }
}


export default App;
