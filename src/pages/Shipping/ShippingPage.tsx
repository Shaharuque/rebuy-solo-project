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

const { Option } = Select;

const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
};

const ShippingPage: React.FC = () => (
    <Form
        className="px-4"
        name="complex-form"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
    >
        <Form.Item label="Username">
            <Space>
                <Form.Item
                    name="username"
                    noStyle
                    rules={[{ required: true, message: 'Username is required' }]}
                >
                    <Input style={{ width: 160 }} placeholder="Please input" />
                </Form.Item>
                <Tooltip title="Useful information">
                    <Typography.Link href="#API">Need Help?</Typography.Link>
                </Tooltip>
            </Space>
        </Form.Item>

        <Form.Item label="City">
            <Space.Compact>
                <Form.Item
                    name={['address', 'province']}
                    noStyle
                    rules={[{ required: true, message: 'City is required' }]}
                >
                    <Select placeholder="Select city">
                        <Option value="Zhejiang">Zhejiang</Option>
                        <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                </Form.Item>
                
            </Space.Compact>
        </Form.Item>

        <Form.Item label="Address">
            <Space.Compact>
                <Form.Item
                    name={['address', 'province']}
                    noStyle
                    rules={[{ required: true, message: 'Province is required' }]}
                >
                    <Select placeholder="Select province">
                        <Option value="Zhejiang">Zhejiang</Option>
                        <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
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

        <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
            <Form.Item
                name="year"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
                <Input placeholder="Input birth year" />
            </Form.Item>
            <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
            >
                <Input placeholder="Input birth month" />
            </Form.Item>
        </Form.Item>
        <Form.Item label=" " colon={false}>
            <Button className='bg-primary' type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);

export default ShippingPage;