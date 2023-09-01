import React, { useState, useEffect } from 'react';
import Back from '../../components/Back/Back';
import { serverUrl } from '../../utils/axiosRelated';
import axios, { AxiosResponse } from 'axios';
import CartCard from './../../components/CartCard/CartCard';
import Loading from '../../components/Loading/Loading';
import { toast } from 'react-toastify';

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
          hideProgressBar: true,
          theme: "dark",
          style: { fontSize: "15px" },
        });

      }
    } catch (error: any) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <div>
        <Back></Back>
      </div>
      <div className="max-w-sm mx-auto p-4">

        <div className="flex items-center justify-center mb-8">
          <div className="flex space-x-7">
            <div className={`rounded-full border  p-2 ${currentStep === 1 ? 'border-primary' : 'border-gray-300'}`}>
              <div className={`w-4 h-4 rounded-full ${currentStep === 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            </div>

            <div className="border-t-2 border-gray-300 h-0 w-8 mt-4"></div>

            <div className={`rounded-full border  p-2 ${currentStep === 2 ? 'border-primary' : 'border-gray-300'}`}>
              <div className={`w-4 h-4 rounded-full ${currentStep === 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            </div>

            <div className="border-t-2 border-gray-300 h-0 w-8 mt-4"></div>

            <div className={`rounded-full border  p-2 ${currentStep === 3 ? 'border-primary' : 'border-gray-300'}`}>
              <div className={`w-4 h-4 rounded-full ${currentStep === 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            </div>
          </div>
        </div>

        {!isSubmitted ? (
          <div>
            {currentStep === 1 && (
              <div>
                <h1 className='mb-3 text-center text-[24px] font-semibold'>Cart Summary</h1>
                {/* Step 1 fields */}
                {/* Form fields */}
                {
                  cartItems?.length === 0 ?
                    <div className='flex justify-center items-center'>
                      <h1 className='text-[18px] font-semibold'>Your cart is empty</h1>
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
                <div className='border border-gray-200 w-80% h-0 mt-4 '></div>
                <div className='mt-[3px]'>
                  <h1 className='text-[15px] font-semibold text-tcolor text-end'>Sub total:<span className='font-extrabold mr-[2px] ml-2'>৳</span>{cartItems?.totalPrice}</h1>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                {/* Step 2 fields */}
                <h2 className="mb-4 text-lg font-semibold">Step 2: Address</h2>
                {/* Form fields */}
              </div>
            )}

            {currentStep === 3 && (
              <div>
                {/* Step 3 fields */}
                <h2 className="mb-4 text-lg font-semibold">Step 3: Review</h2>
                {/* Form fields */}
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

      <div className='flex justify-between p-4'>
        {currentStep !== 1 && (
          <button
            className="px-2 py-1 bg-primary text-white rounded"
            onClick={handlePrev}
          >
            Prev
          </button>
        )}
        {!isSubmitted ? (
          <button
            className="px-2 py-1 bg-primary text-white rounded"
            onClick={currentStep === 3 ? handleSubmit : handleNext}
          >
            {currentStep === 3 ? 'Submit' : 'Next'}
          </button>
        ) : null}
      </div>
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


