import React, { useEffect, useState } from 'react';
import { serverUrl } from '../../utils/axiosRelated';
import useToken from '../../customhooks/useToken';
import axios, { AxiosResponse } from 'axios';

const SuccessPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<[]>([])
    const [cartDelete, setCartDelete] = useState<boolean>(false)
    const { token } = useToken()


    useEffect(() => {
        //1.Getting all the cart items for the user
        async function fetchCartItems(): Promise<void> {
            let url = `${serverUrl}/cart/all/items`;
            if (!token) {
                console.error('Token not found');
                return;
            }
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            try {
                const response: AxiosResponse = await axios.get(url, { headers });

                //2.Cart a items thakley item info and user info with pay amount Payemnt a save hobey
                if (response.data.success) {
                    setCartItems(response?.data?.cart);

                    let url = `${serverUrl}/payment/sold/info`;
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    };

                    const cartProductsArray=response?.data?.cart?.map((each:any)=>each?.productInfo?._id)
                    const payload: any = {
                        cart: cartProductsArray,
                        totalPrice: response?.data?.totalPrice,
                    }

                    try {
                        const response: AxiosResponse = await axios.post(url, payload, { headers });

                        //3.After saving the payment info, cart items will be deleted
                        if (response.data.success) {
                            setCartDelete(true)
                        }
                    } catch (error: any) {
                        console.error('Error:', error);
                    }
                }
            } catch (error: any) {
                console.error('Error:', error);
            }
        }
        fetchCartItems();
    }, []);

    useEffect(() => {
        const deleteCartItemsForUser = async () => {
            let productsId = cartItems?.map((each: any) => each._id)
            let url = `${serverUrl}/cart/bulk/delete`;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const payload: any = {
                cart: productsId,
            }

            try {
                const response: AxiosResponse = await axios.post(url, payload, { headers });

                //After saving the payment info, cart items will be deleted
                if (response.data.success) {

                }
            } catch (error: any) {
                console.error('Error:', error);
            }
        }
        if (cartDelete) {
            deleteCartItemsForUser()
        }
    }, [cartDelete])
    return (
        <div className="bg-white min-h-screen flex flex-col justify-center items-center px-4">
            <div className="bg-white rounded-lg p-8 shadow-md">
                <h1 className="text-xl font-semibold text-green-600 mb-4">Payment Successful</h1>
                <div className="mb-4">
                    <p className="text-gray-700">Order Total: $50.00</p>
                    <p className="text-gray-700">Payment Method: Credit Card (**** **** **** 1234)</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">Your order will be shipped within 2 business days.</p>
                    <p className="text-gray-700">For any questions, please contact our customer support.</p>
                </div>
                <button className="bg-primary hover:bg-green-600 text-white py-2 px-4 rounded-full">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;