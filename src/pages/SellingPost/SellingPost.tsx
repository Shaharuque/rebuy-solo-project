import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
// import { priceExtraction } from "../../utils/priceExtraction";
// import { pricePrediction } from "../../utils/pricePrediction";
import BoxOptionButton from "../../components/BoxOption/BoxOption";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Back from "../../components/Back/Back";
import { pricePrediction } from "../../utils/pricePRediction";
import { priceExtraction } from "../../utils/priceExtraction";
import { convertUnderscoresToSpaces } from "../../utils/convertUnderscores";
import axios, { AxiosResponse } from 'axios';

type Inputs = {
    type: string,
    status: number,
    title: string
    brand: string,
    model: string,
    description: string,
    price: string,
    fileList: UploadFile[]

};

type Payload={
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
    const [predictedPrice, setPredictedPrice] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
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
            const text = await pricePrediction(title, category);
            console.log(text)
            if (text) {
                const price = priceExtraction(text);
                setPredictedPrice(price);
            }
        }

    };

    const { reset, register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    useEffect(() => {
        setTimeout(() => {
            reset({
                price: predictedPrice,
            });
        }, 0);
    }, [predictedPrice, reset]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const imageArray: string[] = [];
        const url = 'http://localhost:9100/api/product/add';
      
        fileList.forEach((file) => {
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
        } catch (error) {
          console.error('Error:', error);
        }
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
                                onClick={() => handleType("Sale")}
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
                                {fileList.length < 3 && '+ Upload'}
                            </Upload>
                        </ImgCrop>

                        {/* Price Section */}
                        <div className="py-4">
                            <label className="flex justify-between items-end mb-2">
                                <span className="label-text font-medium text-[14px] text-gray-600 text-left">
                                    Price
                                </span>
                            </label>
                            <h1 className="text-[10px] font-bold">Enter item's price by own or press get price button please.</h1>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Ex.1000TK"
                                    className="border border-gray-200 rounded-md px-3 py-[5px] text-[14px] w-[50%] md:w-[280px] h-10"
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
                                    className="bg-red-400 ml-2 p-2 rounded-md text-white hover:bg-black hover:text-white transition duration-300 ease-in-out"
                                >
                                    Get Price
                                </button>
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