import React, { useState, useEffect } from 'react';
import Back from '../../components/Back/Back';
import { serverUrl } from '../../utils/axiosRelated';
import axios, { AxiosResponse } from 'axios';
import CartCard from './../../components/CartCard/CartCard';
import Loading from '../../components/Loading/Loading';
import { toast } from 'react-toastify';
import { BsBox, BsCartPlus, BsCheck2Circle } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import ShippingPage from '../Shipping/ShippingPage';
import PaymentPage from '../PaymentPage/PaymentPage';
import StripePaymentButton from '../PaymentPage/StripePaymentButton';
import img from '../../assets/pngwing.com.png'
import { SlSocialDropbox } from 'react-icons/sl'
import Navbar from '../../components/Navbar/Navbar';

const MyCartPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false)
  const token = localStorage.getItem('token')

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  //Getting all the cart items for the user
  useEffect(() => {
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
        setLoading(true)
        const response: AxiosResponse = await axios.get(url, { headers });
        if (response.data.success) {
          setCartItems(response?.data);
          setLoading(false)
        }
      } catch (error: any) {
        console.error('Error:', error);
      }
    }
    fetchCartItems();
  }, []);

  console.log('cart items', cartItems)

  //Deleting a cart item
  const deleteCartitem = async (id: string) => {
    let url = `${serverUrl}/cart/item/delete`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const payload: any = {
      productId: id
    }

    try {
      const response: AxiosResponse = await axios.post(url, payload, { headers });
      if (response.data.success) {
        setCartItems(response?.data);
        toast.success("successfully deleted from cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "dark",
          style: { fontSize: "15px" },
        });

      }
    } catch (error: any) {
      console.error('Error:', error);
    }
  }

  //Stripe Payment Button Handler
  const handleCheckout = () => {
    axios
      .post(`${serverUrl}/payment/create-checkout-session`, {
        cartItems: cartItems?.cart,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div>
        <Back></Back>
      </div>
      <div className="max-w-sm mx-auto p-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex">
            {/* Cart Summary */}
            <div className={`flex items-center ${currentStep === 1 ? 'text-white' : 'text-black'}`}>
              <div className={`flex gap-[2px] text-[12px] px-2 py-2 rounded-md ${currentStep === 1 ? 'bg-primary ' : 'bg-gray-200'}`}>
                {currentStep === 1 ?
                  <div className='flex items-center gap-[2px]'>
                    <h1 className='text-[14px]'>Cart</h1>
                    <BsCartPlus className='text-[18px] text-white' />
                  </div>
                  :
                  <div className='flex items-center gap-[2px]'>
                    <h1 className='text-[14px]'>Cart</h1>
                    <BsCheck2Circle className='text-[18px] text-green-500' />
                  </div>
                }
              </div>
            </div>

            <div className="border-t-2 border-gray-300 h-0 w-8 mt-4"></div>

            {/* Order Summary */}
            <div className={`flex items-center ${currentStep === 2 ? 'text-white' : 'text-black'}`}>
              <div className={`flex gap-[2px] text-[12px] px-2 py-2 rounded-md ${currentStep === 2 ? 'bg-primary ' : 'bg-gray-200'}`}>
                {/* {currentStep === 2 ?
                  <div className='flex items-center gap-[2px]'>
                    <h1 className='text-[14px]'>Order Summary</h1>
                    <BsBox className='text-[18px] text-white' />
                  </div>
                  :
                  <div className='flex items-center gap-[2px]'>
                    <h1 className='text-[14px]'>Order</h1>
                    <BsCheck2Circle className='text-[18px] text-green-500' />
                  </div>
                } */}

                <div className='flex items-center gap-[2px]'>
                  <h1 className='text-[14px]'>Shipping</h1>
                  <BsBox className='text-[18px] text-white' />
                </div>

              </div>
            </div>

            <div className="border-t-2 border-gray-300 h-0 w-8 mt-4"></div>

            {/* Payment Summary */}

            {/* <div className={`flex items-center ${currentStep === 3 ? 'text-white' : 'text-black'}`}>
              <div className={`text-[12px] px-4 py-2 rounded-lg ${currentStep === 3 ? 'bg-primary' : 'bg-gray-300'}`}>Payment</div>
            </div> */}
            <div className={`flex items-center ${currentStep === 3 ? 'text-white' : 'text-black'}`}>
              <div className={`flex gap-[2px] text-[12px] px-2 py-2 rounded-md ${currentStep === 3 ? 'bg-primary ' : 'bg-gray-200'}`}>
                {/* {currentStep === 2 ?
                  <div className='flex items-center gap-[2px]'>
                    <h1 className='text-[14px]'>Order Summary</h1>
                    <BsBox className='text-[18px] text-white' />
                  </div>
                  :
                  <div className='flex items-center gap-[2px]'>
                    <h1 className='text-[14px]'>Order</h1>
                    <BsCheck2Circle className='text-[18px] text-green-500' />
                  </div>
                } */}

                <div className='flex items-center gap-[2px]'>
                  <h1 className='text-[14px]'>Payment</h1>
                  <MdPayment className='text-[18px] text-white' />
                </div>

              </div>
            </div>


          </div>
        </div>

        {!isSubmitted ? (
          <div>
            {currentStep === 1 && (
              <div>
                {/* <h1 className='mb-3 text-center text-[24px] font-semibold'>Cart Summary</h1> */}
                {/* Step 1 fields */}
                {/* Form fields */}
                {
                  cartItems?.cart?.length === 0 ?
                    <div className='flex justify-center items-center mt-[50%]'>
                      <h1 className='mr-2 text-tcolor text-[18px]'>Your cart is empty! </h1>
                      <SlSocialDropbox className='text-[45px] text-primary' />
                    </div>
                    :
                    <>
                      {
                        loading ? <Loading></Loading>
                          :
                          cartItems?.cart?.map((item: any, index: any) => {
                            return (
                              <CartCard item={item} deleteCartitem={deleteCartitem} key={index}></CartCard>
                            )
                          })
                      }
                    </>
                }


              </div>
            )}

            {/* Shipping/Order Info Page */}
            {currentStep === 2 && (
              <div>
                <h1 className='text-center text-tcolor text-[16px] mb-4'>Fill out the shipping informations</h1>
                <ShippingPage></ShippingPage>
              </div>
            )}

            {currentStep === 3 && (
              <div className='p-4'>
                {/* Form fields */}
                {/* <PaymentPage cartItems={cartItems}></PaymentPage> */}
                {/* <StripePaymentButton cartItems={cartItems}></StripePaymentButton> */}
                {
                  cartItems?.cart?.map((each:any,index:any) => {
                    return (
                      <div key={index} className='flex justify-between text-[13px] '>
                        <h1>1x ${each?.productInfo?.productName}</h1>
                        <h1>৳ {each?.productInfo?.basePrice}</h1>
                      </div>
                    )
                  })
                }

                {/* SubTotal Showing part */}
                {
                  cartItems?.cart?.length !== 0 ?
                    <>

                      <div className='mt-[2px]'>
                        <div className='mt-4 text-tcolor'>
                          <h1 className='text-[13px]  text-end'>+Vat:<span className='font-extrabold mr-[2px] ml-2'>৳</span>0</h1>
                        </div>

                        <div className='border border-gray-200 w-80% h-0 mt-4 '></div>
                        <h1 className='text-[14px] text-end'>Sub Total:<span className='font-extrabold mr-[2px] ml-2'>৳</span>{cartItems?.totalPrice}</h1>
                      </div>
                    </>
                    :
                    null
                }
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Well Done!</h2>
            <p>Your form has been submitted successfully.</p>
          </div>
        )}
      </div>

      {/* Prev, Next and Finish button here  */}
      <div className='flex justify-between p-8 mb-[25%]'>
        {currentStep !== 1 && (
          <button
            className="px-2 py-1 bg-primary text-white rounded text-[14px]"
            onClick={handlePrev}
          >
            Prev
          </button>
        )}
        {
          cartItems?.cart?.length === 0 ?
            null
            :
            <>
              {!isSubmitted ? (
                <button

                  onClick={currentStep === 3 ? handleCheckout : handleNext}
                >
                  {currentStep === 3 ? <h1 className="px-2 py-1 bg-tcolor text-white rounded text-[14px]">Pay Now</h1> : <h1 className='px-2 py-1 bg-primary text-white rounded text-[14px]'>Next</h1>}
                </button>
              ) : null}
            </>
        }
      </div>
      <Navbar></Navbar>
    </div>
  );
};

export default MyCartPage;

// import React, { useState } from 'react'
// const MyCartPag: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(1);

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   return (
//     <div className=" w-[100vw] flex items-center justify-center">
//       <div className=" p-2 rounded-lg ">
//         {/* Stepper */}
//         <div className="flex justify-between items-center mb-8">
//           {['Order Summary', 'Confirm Order', 'Payment'].map((stepNumber:any) => (
//             <div
//               key={stepNumber}
//               className={`w-16 h-16 ${
//                 currentStep === stepNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
//               }  flex items-center justify-center font-semibold text-[12px]`}
//             >
//               {stepNumber}
//             </div>
//           ))}
//         </div>

//         {/* Form Steps */}
//         <form>
//           {['Step 1 content', 'Step 2 content', 'Step 3 content'].map((stepContent, index) => (
//             <div key={index} className={`mb-6 ${index + 1 !== currentStep ? 'hidden' : ''}`}>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Step {index + 1}
//               </label>
//               <input
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 type="text"
//                 placeholder={stepContent}
//               />
//             </div>
//           ))}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between">
//             <button
//               className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600 ${
//                 currentStep === 1 ? 'hidden' : ''
//               }`}
//               type="button"
//               onClick={prevStep}
//             >
//               Previous
//             </button>
//             <button
//               className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600 ${
//                 currentStep === 3 ? 'hidden' : ''
//               }`}
//               type="button"
//               onClick={nextStep}
//             >
//               Next
//             </button>
//             <button
//               className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600 ${
//                 currentStep !== 3 ? 'hidden' : ''
//               }`}
//               type="submit"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MyCartPage;


