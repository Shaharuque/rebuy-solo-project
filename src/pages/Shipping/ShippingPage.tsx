// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';

// const ShippingPage: React.FC = () => {

//     const { reset, register, handleSubmit, formState: { errors } } = useForm<Inputs>();
//     const onSubmit: SubmitHandler<Inputs> = async (data) => {
//         console.log(data)
//     }

//     useEffect(() => {
//         setTimeout(() => {
//             reset({
//             });
//         }, 0);
//     }, [reset]);

//     return (
//         <div>
//             <form
//                 className="mx-4 md:m-20 rounded-md"
//                 onSubmit={handleSubmit(onSubmit)}
//             >

//                 <div className="px-4">

//                     {/* Product name */}
//                     <div className="py-2">
//                         <label className="flex justify-between items-end mb-2">
//                             <span className="label-text font-medium text-[14px] text-gray-600 text-left">
//                                 City
//                             </span>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder=""
//                             className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-10"
//                             {...register("city")}
//                         />
//                     </div>
//                     {/* Product brand */}
//                     <div className="py-2">
//                         <label className="flex justify-between items-end mb-2">
//                             <span className="label-text font-medium text-[14px] text-gray-600 text-left">
//                                 Area
//                             </span>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder=""
//                             className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-10"
//                             {...register("area", {
//                                 required: {
//                                     value: true,
//                                     message: "Enter Item's Brand Please",
//                                 },
//                             })}
//                         />
//                         {/* <BrandOption options={options} selected={selected} handleOptionChange={handleOptionChange}></BrandOption> */}
//                         {/* Error Message */}
//                         <label>
//                             <span className="label-text-alt">
//                                 {errors.brand?.type === "required" && (
//                                     <p className=" text-xs text-red-500 pl-1 pt-[1px]">
//                                         {errors.brand.message}
//                                     </p>
//                                 )}
//                             </span>
//                         </label>
//                     </div>
//                     {/* Product Model */}
//                     <div className="py-2">
//                         <label className="flex justify-between items-end mb-2">
//                             <span className="label-text font-medium text-[14px] text-gray-600 text-left">
//                                 Zone
//                             </span>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder=""
//                             className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-10"
//                             {...register("zone")}
//                         />
//                     </div>
//                     {/* Product Description */}
//                     <div className="py-2">
//                         <label className="flex justify-between items-end mb-2">
//                             <span className="label-text font-medium text-[14px] text-gray-600 text-left">
//                                 Description
//                             </span>
//                         </label>
//                         <input
//                             placeholder="write up some more description"
//                             className=" focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-10"
//                             {...register("description", {
//                                 required: {
//                                     value: true,
//                                     message: "Enter Item's Description Please",
//                                 },
//                             })}
//                         />
//                         {/* Error Message */}
//                         <label>
//                             <span className="label-text-alt">
//                                 {errors.description?.type === "required" && (
//                                     <p className=" text-xs text-red-500 pl-1 pt-[1px]">
//                                         {errors.description.message}
//                                     </p>
//                                 )}
//                             </span>
//                         </label>
//                     </div>

//                     <button
//                         className=" rounded-md p-[5px]  text-[14px] font-normal bg-gradient-to-r bg-primary  text-white"
//                         type="submit"
//                     >
//                         Done
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ShippingPage;

import React from 'react';
import { Button, Form, Input, Select, Space, Tooltip, Typography } from 'antd';
import e from 'express';




const ShippingPage: React.FC = () => {

    const userInfo = JSON.parse(localStorage.getItem('user'))
    console.log(userInfo?.email)

    const { Option } = Select;

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            className="px-8"
            name="complex-form"
            onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            style={{ maxWidth: 600 }}
            initialValues={{
              ["userEmail"]: userInfo?.email 
            }}
        >
            <Form.Item className='mb-2' label="Name">
                <Form.Item
                    name="userEmail"
                    noStyle
                    rules={[{ required: true, message: 'Username is required' }]}
                    
                >
                    <Input disabled style={{ width: '100%' }} placeholder="Your Name" />
                </Form.Item>
            </Form.Item>

            <Form.Item className='mb-2' label="City">
                <Form.Item
                    name="city"
                    noStyle
                    rules={[{ required: true, message: 'City is required' }]}
                >
                    <Select placeholder="Select city">
                        <Option value="dhaka">Dhaka</Option>
                        <Option value="sylhet">Sylhet</Option>
                        <Option value="chittagong">Chittagong</Option>
                        <Option value="barishal">Barishal</Option>
                        <Option value="khulna">Khulna</Option>
                    </Select>
                </Form.Item>
            </Form.Item>

            <Form.Item className='mb-2' label="Area">
                <Form.Item
                    name="area"
                    noStyle
                    rules={[{ required: true, message: 'Area is required' }]}
                >
                    <Select placeholder="Select Area">
                        <Option value="Dohar">Dohar</Option>
                        <Option value="Keraniganj">Keraniganj</Option>
                        <Option value="Dhamrai">Dhamrai</Option>
                        <Option value="Nawabganj">Nawabganj</Option>
                        <Option value="Savar">Savar</Option>
                    </Select>
                </Form.Item>
            </Form.Item>

            <Form.Item className='mb-2' label="Zone">
                <Form.Item
                    name="zone"
                    noStyle
                    rules={[{ required: true, message: 'Zone is required' }]}
                >
                    <Select placeholder="Select Zone">
                        <Option value="Ramna">Ramna</Option>
                        <Option value="Motijheel">Motijheel</Option>
                        <Option value="Kotwali">Kotwali </Option>
                        <Option value="Dhanmondi">Dhanmondi </Option>
                        <Option value="Mohammadpur">Mohammadpur </Option>
                        <Option value="Sutrapur">Sutrapur </Option>
                        <Option value="Gulshan">Gulshan  </Option>
                        <Option value="Lalbagh">Lalbagh </Option>
                        <Option value="Mirpur">Mirpur</Option>
                        <Option value="Cantonment">Cantonment  </Option>
                        <Option value="Demra">Demra </Option>
                        <Option value="Kafrul">Kafrul</Option>
                    </Select>
                </Form.Item>
            </Form.Item>

            <Form.Item className='mb-2' label="Adress">
                <Space.Compact>
                    <Form.Item
                        name="username"
                        noStyle
                        rules={[{ required: true, message: 'Username is required' }]}
                    >
                        <Input style={{ width: '100%' }} placeholder="Input House No." />
                    </Form.Item>
                    <Form.Item
                        name={['address', 'street']}
                        noStyle
                        rules={[{ required: true, message: 'Street is required' }]}
                    >
                        <Input style={{ width: '50%' }} placeholder="Input street" />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>
        </Form>
    );
};
export default ShippingPage;