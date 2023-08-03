import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginHandlerFunc } from '../../../features/login/loginSlice';

//interface
type Inputs = {
    username?: string,
    password: number,
    email: string
};

const ChatForm = () => {
    let location = useLocation();
    const dispatch=useDispatch()
    const currentRoute = location?.pathname;
    console.log("location", currentRoute);
    const navigate=useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        // console.log(data)
        if (currentRoute === '/login') {
            try {
                const response = await axios.post('http://localhost:9000/api/auth/login', data);
                if(response?.data?.success){
                    navigate('/chat')
                    localStorage.setItem('userEmail',response?.data?.data?.email)
                    const {email,status,_id}=response?.data?.data
                    dispatch(loginHandlerFunc({email,status,_id}))
                }

            } catch (error) {
                console.error('Login failed', error);
            }
        }
    };


    return (
        <div className='bg-white w-[300px] md:w-[600px]  h-[400px] md:h-[800px] shadow-lg rounded-md p-8'>
            <h1 className='mt-2 text-center font-mono text-gray-400'>Welcome To MiniChat Mewao</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" grid grid-cols-1 md:grid-cols-1 mb-1 mr-2 gap-y-6">
                    {
                        currentRoute === '/register' &&
                        <div>
                            <label className="label">
                                <span className="modal-label-name">
                                    User Name<span className="text-red-500">*</span>
                                </span>
                            </label>
                            <input className="border border-gray-600 ml-1 w-full mt-2 rounded-md h-[40px]" {...register("username")} required />
                        </div>
                    }
                    <div>
                        <label className="label">
                            <span className="modal-label-name">
                                User Email <span className="text-red-500">*</span>
                            </span>
                        </label>
                        <input className="border border-gray-600 ml-1 w-full mt-2 rounded-md h-[40px]" defaultValue="test@gmail.com" {...register("email")} required />

                    </div>
                    <div>
                        <label className="label">
                            <span className="modal-label-name">
                                User Password<span className="text-red-500">*</span>
                            </span>
                        </label>
                        <input className="border border-gray-600 ml-1 w-full mt-2 rounded-md h-[40px]" {...register("password", { required: true })} />
                    </div>
                </div>

                <input className='bg-teal-600 p-2 rounded-md text-white shadow-md mt-10 w-full' type="submit" />
                <div>
                    {
                        currentRoute === '/register' ? <h1 className='text-center mt-5'>Already have an account? <Link className="text-primary font-bold" to={'/login'}>Sign In</Link></h1> : null
                    }

                </div>

            </form>
        </div>
    );
};

export default ChatForm;