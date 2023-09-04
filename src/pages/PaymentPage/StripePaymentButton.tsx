import React from "react";
import PayButton from "./StripePaymentCheckout";


interface PaymentProps {
    cartItems: ICartDetails;
}

interface ICartDetails{
    cart: [{}];
    success: boolean;
    totalPrice: number;
}


const StripePaymentButton: React.FC<PaymentProps> = ({cartItems}) =>{
    const {cart,totalPrice}=cartItems
    
    console.log(cart)

  return (
    <div>
        <div>
            <h1 className="font-bold text-[18px] mb-2">Payment Details</h1>
            <div className="ml-4 mb-8 mr-[100px]">
                <div className="flex justify-between gap-2 mb-2 text-tcolor">
                    <h1>Product Cost:</h1>
                    <h1>৳ {totalPrice}</h1>
                </div>
                <div className="flex justify-between gap-2 mb-2 text-tcolor">
                    <h1>Delivery Fee:</h1>
                    <h1>৳ 100</h1>
                </div>
                <div className="flex justify-between gap-2 mb-2">
                    <h1 className="font-bold">Total(Inc.Vat):</h1>
                    <h1>৳ {totalPrice}</h1>
                </div>
            </div>
        </div>
        <PayButton></PayButton>
  </div>
  );
}

export default StripePaymentButton;
