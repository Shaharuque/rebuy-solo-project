import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
// import { priceExtraction } from "../../utils/priceExtraction";
// import { pricePrediction } from "../../utils/pricePrediction";
import BoxOptionButton from "../../components/BoxOption/BoxOption";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Back from "../../components/Back/Back";
import { pricePrediction } from "../../utils/pricePRediction";
import { priceExtraction } from "../../utils/priceExtraction";
import axios, { AxiosResponse } from 'axios';
import { toast } from "react-toastify";
import { descriptionGenerator } from "../../utils/productDescriptionGenerate";
import { BiHelpCircle } from "react-icons/bi";
import SmallLoader from "../../components/Loading/SmallLoader";
import { ItemDetailsGenerate } from "../../utils/ItemDetailsGenerate";

interface Inputs {
    type: string,
    status: number,
    title: string
    brand: string,
    model: string,
    description: string,
    price: string,
    fileList: UploadFile[]

};

interface Payload {
    type: string,
    status: string,
    title: string
    brand: string,
    model: string,
    description: string,
    price: string,
    images: string[],
    category?: string

}

interface SellingPostProps { }

const SellingPost: React.FC<SellingPostProps> = () => {
    const [type, setType] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("")
    const [predictedPrice, setPredictedPrice] = useState<string | number>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [pLoading, setPLoading] = useState<boolean>(false);
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();

    console.log(category)

    //converted underscore to space
    // useEffect(()=>{
    //     setSelectedCategory(convertUnderscoresToSpaces(category))
    // },[])


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



    const handleType = (option: string): void => {
        setType(option);
    };

    const handleStatus = (option: string): void => {
        setStatus(option);
    };

    const predictPrice = async (): Promise<void> => {
        if (category) {
            setPLoading(true)
            const text = await pricePrediction(title, category);
            console.log(text)
            if (text) {
                const price = priceExtraction(text);
                setPredictedPrice(price);
                setPLoading(false)
            }
        }

    };

    //auto generating the product description

    const generateDescription = async () => {
        setLoading(true)
        // const result = await descriptionGenerator(category, title)
        // if (result) {
        //     setDesc(result)
        //     setLoading(false)
        // }
        if (category && title) {
            const result = await ItemDetailsGenerate(title, category)
            if (result) {
                setDesc(result)
                setLoading(false)
            }
        }

    }


    const { reset, register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    useEffect(() => {
        setTimeout(() => {
            reset({
                description: desc
            });
        }, 0);
    }, [desc, reset]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const imageArray: string[] = [];
        const url = 'http://localhost:9100/api/product/add';

        fileList?.forEach((file) => {
            if (file?.response?.url) {
                imageArray.push(file.response.url);
            }
        });

        const payload: Payload = {
            type, // Make sure you have defined type somewhere
            status, // Make sure you have defined status somewhere
            title, // Make sure you have defined title somewhere
            brand: data.brand,
            description: data.description,
            model: data.model,
            category: category, // Make sure you have defined category somewhere
            price: data.price,
            images: imageArray,
        };

        console.log(payload);

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        try {
            const response: AxiosResponse = await axios.post(url, payload, { headers });
            console.log('Response:', response.data);

            if (response?.data?.success) {
                toast.success("successfully advertisement posted", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    style: { fontSize: "12px" },
                });
                reset();
                setTitle("")
                setPredictedPrice("")
                setDesc("")
                setStatus("")
                setFileList([]);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    console.log(type, status, title)


    return (
        <div>
            <Back></Back>
            <div>
                <h1 className="mt-2 text-center text-[18px] font-semibold font-[cursive] text-primary">POST AN AD</h1>
                <form
                    className="mx-4 md:m-20 rounded-md"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    
                    <div className="p-4">

                        {/* Box Options */}
                        <label className="label">
                            <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                Choose Type
                            </span>
                        </label>
                        <div className="flex space-x-2 my-2">
                            <BoxOptionButton
                                type="button"
                                text="Sell"
                                value={type}
                                onClick={() => handleType("Sell")}
                            />
                            <BoxOptionButton
                                type="button"
                                text="Auction"
                                value={type}
                                onClick={() => handleType("Auction")}
                            />
                        </div>

                        {/* Product Status */}
                        {/* Box Options */}
                        <label className="label">
                            <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                Status
                            </span>
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:w-[500px] my-2">
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
                                className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-12"
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
                                className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-12"
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
                                className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-12"
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
                            <textarea
                                disabled={loading}
                                placeholder="write up some features about the product..."
                                className=" focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-full md:w-[500px] h-12"
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

                            <div className="flex gap-2">
                                <button type="button" onClick={generateDescription} className="text-[14px] bg-black text-white p-[5px] rounded-sm">Generate</button>
                                {
                                    loading ? <SmallLoader></SmallLoader> : null
                                }
                            </div>
                        </div>

                        {/* image upload */}
                        <div className="mt-10">
                            <ImgCrop rotationSlider>
                                <Upload
                                    action="http://localhost:3001/upload"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 3 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </div>

                        {/* Price Section */}
                        <div className="py-4">
                            <label className="flex justify-between items-end mb-2">
                                <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                    Price
                                </span>
                            </label>

                            <div>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="focus:outline-none border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-[50%] md:w-[280px] h-10"
                                    {...register("price", {
                                        required: {
                                            value: true,
                                            message: "Enter item's price please",
                                        },
                                    })}
                                />
                              
                                <button
                                    type="button"
                                    onClick={predictPrice}
                                    className="bg-black ml-2 p-[5px] rounded-sm text-white text-[14px]"
                                >
                                    Get Price
                                </button>
                                {
                                    pLoading ? <SmallLoader></SmallLoader> : null
                                }
                                
                                <div className="flex items-center">

                                    {
                                        predictedPrice ? <>
                                            <BiHelpCircle className="text-[20px] text-primary" />
                                            <h1 className="text-[13px] font-bold text-primary">price generated from openAI <span>৳{predictedPrice}</span>
                                            </h1>
                                        </> : null
                                    }

                                </div>
                            </div>
                            {/* Error Message */}
                            <label>
                                <span className="label-text-alt">
                                    {errors.price?.type === "required" && (
                                        <p className=" text-xs text-red-500 pl-1 pt-[1px]">
                                            {errors.price.message}
                                        </p>
                                    )}
                                </span>
                            </label>
                        </div>


                        <button
                            className=" rounded-md p-2  text-[14px] font-normal bg-gradient-to-r bg-primary  text-white"
                            type="submit"
                        >
                            Advertise
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellingPost;
