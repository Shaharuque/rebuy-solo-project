// import React, { useState } from 'react';
// import Back from '../../components/Back/Back';
// import CartCard from '../../components/CartCard/CartCard';

// const MyCartPage = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     const handleNext = () => {
//         setCurrentStep(currentStep + 1);
//     };

//     const handlePrev = () => {
//         setCurrentStep(currentStep - 1);
//     };

//     const handleSubmit = () => {
//         setIsSubmitted(true);
//     };

//     return (
//         <div>
//             <div>
//                 <Back></Back>
//             </div>
//             <div className="max-w-sm mx-auto p-4">

//                 <div className="flex items-center justify-center mb-4">
//                     <div className="flex space-x-2">
//                         <div className={`w-4 h-4 rounded-full ${currentStep === 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
//                         <div className={`w-4 h-4 rounded-full ${currentStep === 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
//                         <div className={`w-4 h-4 rounded-full ${currentStep === 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
//                     </div>
//                 </div>

//                 {!isSubmitted ? (
//                     <div>
//                         {currentStep === 1 && (
//                             <div>
//                                 {/* Step 1 fields */}
//                                 <h2 className="mb-4 text-lg font-semibold">Cart Summary</h2>
//                                 {/* Form fields */}
//                                 <CartCard></CartCard>
//                             </div>
//                         )}

//                         {currentStep === 2 && (
//                             <div>
//                                 {/* Step 2 fields */}
//                                 <h2 className="mb-4 text-lg font-semibold">Step 2: Address</h2>
//                                 {/* Form fields */}
//                             </div>
//                         )}

//                         {currentStep === 3 && (
//                             <div>
//                                 {/* Step 3 fields */}
//                                 <h2 className="mb-4 text-lg font-semibold">Step 3: Review</h2>
//                                 {/* Form fields */}
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <div className="text-center">
//                         <h2 className="text-lg font-semibold mb-4">Well Done!</h2>
//                         <p>Your form has been submitted successfully.</p>
//                     </div>
//                 )}
//             </div>

//             <div className='flex justify-between'>
//             {currentStep !== 1 && (
//                 <button
//                     className="px-2 py-1 bg-blue-500 text-white rounded"
//                     onClick={handlePrev}
//                 >
//                     Prev
//                 </button>
//             )}
//             {!isSubmitted ? (
//                 <button
//                     className="px-2 py-1 bg-blue-500 text-white rounded"
//                     onClick={currentStep === 3 ? handleSubmit : handleNext}
//                 >
//                     {currentStep === 3 ? 'Submit' : 'Next'}
//                 </button>
//             ) : null}
//             </div>
//         </div>
//     );
// };

// export default MyCartPage;

import React, { useState } from 'react';

const MyCartPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="bg-gray-100 w-[100vw] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* Stepper */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-16 h-16 ${
                currentStep === stepNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
              } rounded-full flex items-center justify-center font-semibold text-xl`}
            >
              {stepNumber}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <form>
          {['Step 1 content', 'Step 2 content', 'Step 3 content'].map((stepContent, index) => (
            <div key={index} className={`mb-6 ${index + 1 !== currentStep ? 'hidden' : ''}`}>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Step {index + 1}
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                placeholder={stepContent}
              />
            </div>
          ))}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600 ${
                currentStep === 1 ? 'hidden' : ''
              }`}
              type="button"
              onClick={prevStep}
            >
              Previous
            </button>
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600 ${
                currentStep === 3 ? 'hidden' : ''
              }`}
              type="button"
              onClick={nextStep}
            >
              Next
            </button>
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600 ${
                currentStep !== 3 ? 'hidden' : ''
              }`}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyCartPage;


