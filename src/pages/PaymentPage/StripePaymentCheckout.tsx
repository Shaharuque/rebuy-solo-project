import axios from "axios";


const PayButton = () => {

  const handleCheckout = () => {
    axios
      .post(`https://rebuy-solo-server-production.up.railway.app/api/payment/create-checkout-session`, {
        cartItems:[
            {id:1,name:'apple',price:120},
            {id:2,name:'orange',price:120},
            {id:3,name:'grape',price:120}
        ],
        userId: '013',
      })
      .then((response) => {
        if (response.data.url) {
        window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="flex justify-end">
      <button className="bg-black text-white p-[5px] rounded text-[14px]" onClick={() => handleCheckout()}>Pay Now</button>
    </div>
  );
};

export default PayButton;