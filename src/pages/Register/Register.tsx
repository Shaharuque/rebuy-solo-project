import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios';

//interface
type Inputs = {
    name: string,
    password: number,
    email: string
    phone: number,
    adress: string
};

const Register: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            const response = await axios.post(
                'http://localhost:9100/api/auth/register',
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    adress: data.adress
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Response:', response.data);
        } catch (err) {
            console.log('error')
        }
    };

    return (
        <div className='mt-[80px] px-[25px] '>
            <div className='flex justify-between'>
                <Link to='/login' className='border border-gray-300 rounded p-2'><BiChevronLeft className='text-[20px]' /></Link>
                <h1 className='text-[18px] text-[#3C3C3C] font-bold'>ReBuy</h1>
            </div>
            <h1 className='mt-12 text-[25px] text-[#3C3C3C] font-bold'>Sign in</h1>
            <h1 className='text-[12px]'>Register with one of the following option</h1>

            {/* OAuth */}
            <div className='flex justify-evenly'>
                <button className='border border-gray-300 rounded-lg p-2 mt-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="30" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                </button>
                <button className='border border-gray-300 p-2 mt-4 rounded-xl'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="30" viewBox="0 0 48 48">
                    <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                </svg></button>
                {/* <button className='border border-gray-300 rounded-lg p-2 mt-4'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="30" viewBox="0 0 24 24">
                    <path d="M 15.904297 1.078125 C 15.843359 1.06875 15.774219 1.0746094 15.699219 1.0996094 C 14.699219 1.2996094 13.600391 1.8996094 12.900391 2.5996094 C 12.300391 3.1996094 11.800781 4.1996094 11.800781 5.0996094 C 11.800781 5.2996094 11.999219 5.5 12.199219 5.5 C 13.299219 5.4 14.399609 4.7996094 15.099609 4.0996094 C 15.699609 3.2996094 16.199219 2.4 16.199219 1.5 C 16.199219 1.275 16.087109 1.10625 15.904297 1.078125 z M 16.199219 5.4003906 C 14.399219 5.4003906 13.600391 6.5 12.400391 6.5 C 11.100391 6.5 9.9003906 5.5 8.4003906 5.5 C 6.3003906 5.5 3.0996094 7.4996094 3.0996094 12.099609 C 2.9996094 16.299609 6.8 21 9 21 C 10.3 21 10.600391 20.199219 12.400391 20.199219 C 14.200391 20.199219 14.600391 21 15.900391 21 C 17.400391 21 18.500391 19.399609 19.400391 18.099609 C 19.800391 17.399609 20.100391 17.000391 20.400391 16.400391 C 20.600391 16.000391 20.4 15.600391 20 15.400391 C 17.4 14.100391 16.900781 9.9003906 19.800781 8.4003906 C 20.300781 8.1003906 20.4 7.4992188 20 7.1992188 C 18.9 6.1992187 17.299219 5.4003906 16.199219 5.4003906 z"></path>
                </svg></button> */}
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" grid grid-cols-1 md:grid-cols-1 mb-1 mr-2 gap-y-2 mt-6">

                    <div>
                        <input className="bg-gray-300 text-[#6F6F6F] border border-gray-300 ml-1 w-full mt-2 rounded-2xl h-[40px] px-3" placeholder='Name' {...register("name")} required />
                    </div>

                    <div>
                        <input className="bg-gray-300 text-[#6F6F6F] border border-gray-300 ml-1 w-full mt-2 rounded-2xl h-[40px] px-3" placeholder='Email' {...register("email")} required />
                    </div>

                    <div>
                        <input className="bg-gray-300 text-[#6F6F6F] border border-gray-300 ml-1 w-full mt-2 rounded-2xl h-[40px] px-3" placeholder='Password' {...register("password", { required: true })} />
                    </div>

                    <div>
                        <input className="bg-gray-300 text-[#6F6F6F] border border-gray-300 ml-1 w-full mt-2 rounded-2xl h-[40px] px-3" placeholder='Adress' {...register("adress", { required: true })} />
                    </div>

                    <div>
                        <input className="bg-gray-300 text-[#6F6F6F] border border-gray-300 ml-1 w-full mt-2 rounded-2xl h-[40px] px-3" placeholder='Phone' {...register("phone", { required: true })} />
                    </div>
                </div>

                <input className='bg-gradient-to-r from-[#FF5A5F] to-[#C1839F] p-2 rounded-2xl text-white shadow-md mt-2 w-full' type="submit" />
                <h1 className='mt-2 text-center text-[12px]'>Don't have account?<Link className='text-[#FF5A5F] font-bold px-1' to='/login'>Sign in</Link></h1>
            </form>

        </div>
    );
};

export default Register;