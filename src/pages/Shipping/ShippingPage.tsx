import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ShippingPage: React.FC = () => {

    const { reset, register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
    }

    useEffect(() => {
        setTimeout(() => {
            reset({
            });
        }, 0);
    }, [reset]);

    return (
        <div>
            <form
                className="mx-4 md:m-20 rounded-md"
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className="p-4">

                    {/* Product name */}
                    <div className="py-2">
                        <label className="flex justify-between items-end mb-2">
                            <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                City
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-10"
                            {...register("city")}
                        />
                    </div>
                    {/* Product brand */}
                    <div className="py-2">
                        <label className="flex justify-between items-end mb-2">
                            <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                Area
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-10"
                            {...register("area", {
                                required: {
                                    value: true,
                                    message: "Enter Item's Brand Please",
                                },
                            })}
                        />
                        {/* <BrandOption options={options} selected={selected} handleOptionChange={handleOptionChange}></BrandOption> */}
                        {/* Error Message */}
                        <label>
                            <span className="label-text-alt">
                                {errors.brand?.type === "required" && (
                                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                                        {errors.brand.message}
                                    </p>
                                )}
                            </span>
                        </label>
                    </div>
                    {/* Product Model */}
                    <div className="py-2">
                        <label className="flex justify-between items-end mb-2">
                            <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                Zone
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-10"
                            {...register("zone")}
                        />
                    </div>
                    {/* Product Description */}
                    <div className="py-2">
                        <label className="flex justify-between items-end mb-2">
                            <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                Description
                            </span>
                        </label>
                        <input
                            placeholder="write up some more description"
                            className=" focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-10"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Enter Item's Description Please",
                                },
                            })}
                        />
                        {/* Error Message */}
                        <label>
                            <span className="label-text-alt">
                                {errors.description?.type === "required" && (
                                    <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                                        {errors.description.message}
                                    </p>
                                )}
                            </span>
                        </label>
                    </div>

                    <button
                        className=" rounded-md p-[5px]  text-[14px] font-normal bg-gradient-to-r bg-primary  text-white"
                        type="submit"
                    >
                        Done
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShippingPage;