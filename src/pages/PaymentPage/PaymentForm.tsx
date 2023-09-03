import React, { useMemo, useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import './paymentForm.css'
import { serverUrl } from "../../utils/axiosRelated";
import useToken from "../../customhooks/useToken";
import axios, { AxiosResponse } from "axios";


const useOptions = () => {

    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize: '14px',
                    color: "#484845",
                    letterSpacing: "0.025em",
                    fontFamily: "sans-serif",
                    "::placeholder": {
                        color: "black"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        []
    );

    return options;
};

interface PaymentProps {
    cartItems: ICartDetails;
}

interface ICartDetails {
    cart: [{}];
    success: boolean;
    totalPrice: number;
}

const PaymentForm: React.FC<PaymentProps> = ({ cartItems }) => {
    const { cart, totalPrice } = cartItems
    console.log(cart[0]?.userInfo?._id)

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const [cardError, setCardError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);
    const [transactionId, setTransactionId] = useState<string>("");
    const [clientSecret, setClientSecret] = useState<string>("");
    const {token}=useToken()

    useEffect(() => {
        fetch("http://localhost:9100/api/payment/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: totalPrice }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            });
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardNumberElement);
        if (!card) {
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card
        });
        // console.log("[PaymentMethod]", payload);

        setProcessing(true);

        const { paymentIntent, error: intent_error } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: cart[0]?.userInfo?.name,
                        email: cart[0]?.userInfo?.email
                    },
                },
            }
        );
        console.log(paymentIntent, intent_error)

        if (intent_error) {
            setCardError(intent_error?.message || "");
            setProcessing(false);
        } else {
            setCardError("");
            setTransactionId(paymentIntent.id);
            setSuccess("Your payment is successful");

            const paymentPayload = {
                transactionId: paymentIntent.id,
                amount: paymentIntent.amount,
                buyedProducts: cart,

            };
            // console.log(paymentPayload)
            if (paymentPayload) {
                let url = `${serverUrl}/payment/info/add/to/db`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                };
                const payload: any = {
                    paymentPayload
                }

                try {
                    const response: AxiosResponse = await axios.post(url, payload, { headers });
                    if (response.data.success) {
                        console.log(response.data)
                    }
                } catch (error: any) {
                    console.error('Error:', error);
                }
            }

        }
    };

    // useEffect(() => {
    //     if (success) {
    //         setTimeout(() => {
    //             window.location.replace('/success'); // Replace '/destination' with your desired route
    //         }, 5000);
    //     }
    // }, [success])

    return (
        <form className="payment-form" onSubmit={handleSubmit}>
            <label className="form-label">
                <h1 className="text-tcolor">Card number</h1>
                <CardNumberElement
                    className="form-input"
                    options={options}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                />
            </label>
            <label className="form-label">
                <h1 className="text-tcolor">Expiration date</h1>
                <CardExpiryElement
                    className="form-input"
                    options={options}
                />
            </label>
            <label className="form-label">
                <h1 className="text-tcolor">CVC</h1>
                <CardCvcElement
                    className="form-input"
                    options={options}
                />
            </label>
            <div className="flex justify-end">
                <button className="px-2 py-1 bg-primary text-white rounded text-[14px]" type="submit" disabled={!stripe}>
                    Pay Now
                </button>
            </div>

            {
                cardError && <div className="px-2 py-1 bg-primary text-white rounded">{cardError}</div>   //card error show korbey
            }
            {/*card payment successful holey UI tey user k tar TXT id show korabo */}

        </form>
    );
};

export default PaymentForm;
