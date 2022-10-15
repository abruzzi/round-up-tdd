import notebook from '../assets/notebook.jpg';
import pen from '../assets/pen.jpg';

import './orderdetails.css'
export const OrderDetails = () => {
  return (
    <div className="container">
      <h3>Order Details</h3>
      <ul>
        <li className="flex item">
          <div className="img">
            <img src={notebook} alt="note book"/>
          </div>
          <div>
            <h4>Notebook</h4>
            <p>Moleskine S04894 Cahier Notebook</p>
          </div>
        </li>
        <li className="flex item">
          <div className="img">
            <img src={pen} alt="pen"/>
          </div>
          <div>
            <h4>Pen</h4>
            <p>HONGDIAN Matte Black Forest Fountain Pen Extra Fine</p>
          </div>
        </li>
      </ul>
    </div>
  )
}