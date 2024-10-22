// src/test/PaypalCheckout.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { data } from "autoprefixer";

const PaymentSuccess = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/rooms_with_roomtype/"
        ); // URL API của bạn
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
    console.log(products);

  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p.id === parseInt(productId)); // Lưu ý: so sánh với số
    setSelectedProduct(product);
  };

  return (
    <div>
      <h1>Chọn sản phẩm để thanh toán</h1>
      <select onChange={handleProductChange}>
        <option value="">Chọn sản phẩm</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} - ${product.price}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <div>
          <h2>Số tiền thanh toán: ${selectedProduct.price}</h2>

          <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: selectedProduct.price.toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(
                    `Transaction completed by ${details.payer.name.given_name}`
                  );
                  // Gửi thông tin giao dịch tới server Django để xử lý thêm
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
