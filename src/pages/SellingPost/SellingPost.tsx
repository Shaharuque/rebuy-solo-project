import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { WiDirectionLeft } from "react-icons/wi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
// import { priceExtraction } from "../../utils/priceExtraction";
// import { pricePrediction } from "../../utils/pricePrediction";
import BoxOptionButton from "../../components/BoxOption/BoxOption";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Back from "../../components/Back/Back";

type Inputs = {
    name?: string,
    password: number,
    email: string
    brand: string,
    model: string,
    edition: string,
    description: string,
    age: number,
    color: string,
    price: string,
};

interface SellingPostProps { }

const SellingPost: React.FC<SellingPostProps> = () => {
    const [type, setType] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [predictedPrice, setPredictedPrice] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();

    
    const handleBack = () => {
        navigate("/item/selling/categories");
    };

    //Image upload
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    console.log(fileList[0]?.response?.url)

    const handleGender = (option: string): void => {
        setType(option);
    };

    const handleStatus = (option: string): void => {
        setStatus(option);
    };

    // const predictPrice = async () => {
    //     const text = await pricePrediction(title, category);
    //     setPredictedPrice(priceExtraction(text));
    // };

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    // useEffect(() => {
    //     setTimeout(() => {
    //         reset({
    //             price: predictedPrice,
    //         });
    //     }, 0);
    // }, [predictedPrice, reset]);

    const onSubmit: SubmitHandler<Inputs> = (data: any) => {
        console.log(data);
    };
    console.log(type, status, title)


    return (
        <div>
            <Back></Back>
            <div>
                <h1 className="mt-3 text-center text-[20px] font-semibold ">POST AN AD</h1>
                <form
                    className=" border border-gray-200 m-4 md:m-20 rounded-md shadow-lg shadow-[rgba(0, 0, 0, 0.35) 0px 5px 15px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="border-b border-b-gray-200 py-2">
                        <h1 className="font-bold text-[#262729]  ml-4">
                            SELECTED CATEGORY
                        </h1>
                        <h1 className="font-semibold text-[#7d7f81] text-[12px] ml-4">
                            {`selling/post/${category}`}
                        </h1>
                    </div>
                    <div className="p-4">

                        {/* Box Options */}
                        <label className="label">
                            <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                Choose Type
                            </span>
                        </label>
                        <div className="flex space-x-4 my-2">
                            <BoxOptionButton
                                type="button"
                                text="Sale"
                                value={type}
                                onClick={() => handleGender("Sale")}
                            />
                            <BoxOptionButton
                                type="button"
                                text="Auction"
                                value={type}
                                onClick={() => handleGender("Auction")}
                            />
                        </div>

                        {/* Product Status */}
                        {/* Box Options */}
                        <label className="label">
                            <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                Status
                            </span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:w-[500px] my-2">
                            <BoxOptionButton
                                type="button"
                                text="New"
                                value={status}
                                onClick={() => handleStatus("New")}
                            />
                            <BoxOptionButton
                                type="button"
                                text="Like New"
                                value={status}
                                onClick={() => handleStatus("Like New")}
                            />
                            <BoxOptionButton
                                type="button"
                                text="Good"
                                value={status}
                                onClick={() => handleStatus("Good")}
                            />
                            <BoxOptionButton
                                type="button"
                                text="Resonable"
                                value={status}
                                onClick={() => handleStatus("Resonable")}
                            />
                            <BoxOptionButton
                                type="button"
                                text="Worn"
                                value={status}
                                onClick={() => handleStatus("Worn")}
                            />
                        </div>

                        {/* Product name */}
                        <div className="py-2">
                            <label className="flex justify-between items-end mb-2">
                                <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                    Product Name
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ex. G.I.JOE Snake Eyes Ninja"
                                name="name"
                                className="border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-12"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        {/* Product brand */}
                        <div className="py-2">
                            <label className="flex justify-between items-end mb-2">
                                <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                    Brand
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ex. G.I.JOE"
                                className="border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-12"
                                {...register("brand", {
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
                                    Model
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                className="border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-12"
                                {...register("model")}
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
                                type="text"
                                placeholder="Ex. write up some features about the product..."
                                className="border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-12"
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

                        {/* image upload */}
                        <ImgCrop rotationSlider>
                            <Upload
                                action="http://localhost:3001/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                        </ImgCrop>


                        <button
                            className=" py-2 px-4  text-xs font-normal bg-gradient-to-r bg-red-400 rounded-sm text-white"
                            type="submit"
                        >
                            Add Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellingPost;
