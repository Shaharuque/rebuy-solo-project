import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";


interface PaymentProps {
    cartItems: ICartDetails;
}

interface ICartDetails{
    cart: [{}];
    success: boolean;
    totalPrice: number;
}

const stripePromise = loadStripe(
  "pk_test_51K8U3bA8Wu6mzkGuZsrT10w2wnveRW9iGAKLXMSIaAaiVCbAQWBCTf0hTqOc6KdlyMmOPJkkBO5vyvKzjSRPyLps00DZH6fW4z"
);


const PaymentPage: React.FC<PaymentProps> = ({cartItems}) =>{
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
    <Elements stripe={stripePromise}>
        <PaymentForm cartItems={cartItems}></PaymentForm>
    </Elements>
  </div>
  );
}

export default PaymentPage;
