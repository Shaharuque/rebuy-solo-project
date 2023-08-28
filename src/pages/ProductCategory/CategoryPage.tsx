import React, { useState } from "react";
import { WiDirectionLeft } from "react-icons/wi";
import { PiGameControllerFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";
import { CgCardClubs } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";

const CategoryPage: React.FC = () => {
  const navigate=useNavigate()

  const handleBack = () => {
    navigate("/");
  }
  
  return (
    <div className="">
      {/* Header */}
      <Header></Header>

      <h1 className="mt-3 text-center text-[20px] font-semibold">Choose One Category</h1>
      {/* Categories part */}
      <div className="   min-h-[75%] mt-10 mx-4 md:mx-[300px] p-2 md:p-8 rounded ">
  
        <div className="grid grid-cols-2 gap-4 lg:gap-12">
          <Link
            to={`/item/selling/post/action_figures`}
            className=" py-5 rounded-md border border-[#FF6779] shadow-md shadow-[#FF6779] bg-[#FF6779] text-white hover:bg-white hover:text-[#FF6779] hover:shadow-white transition duration-300 ease-in-out "
          >
            <div className="flex flex-col items-center">
              <PiGameControllerFill className="text-[40px]" />
              <h1 className="font-semibold mt-3 md:text-[16px] text-[12px] text-center">
                Action Figures
              </h1>
            </div>
          </Link>
          <Link
            to={`/item/selling/post/vintage_collections`}
            className=" py-5 rounded-md border border-[#FF6779] shadow-md shadow-[#FF6779] bg-[#FF6779] text-white hover:bg-white hover:text-[#FF6779] hover:shadow-white transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center">
              <PiGameControllerFill className="text-[40px]" />
              <h1 className="font-semibold mt-3 md:text-[16px] text-[12px] text-center">
                Vintage Collections
              </h1>
            </div>
          </Link>
          <Link
            to={`/item/selling/post/stuffed_toys_plush`}
            className=" py-5 rounded-md border border-[#FF6779] shadow-md shadow-[#FF6779] bg-[#FF6779] text-white hover:bg-white hover:text-[#FF6779] hover:shadow-white transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center">
              <PiGameControllerFill className="text-[40px]" />
              <h1 className="font-semibold mt-3 md:text-[16px] text-[12px] text-center">
                Stuffed Toys & Plush
              </h1>
            </div>
          </Link>
          <Link
            to={`/item/selling/post/games_puzzles`}
            className=" py-5 rounded-md border border-[#FF6779] shadow-md shadow-[#FF6779] bg-[#FF6779] text-white hover:bg-white hover:text-[#FF6779] hover:shadow-white transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center">
              <PiGameControllerFill className="text-[40px]" />
              <h1 className="font-semibold mt-3 md:text-[16px] text-[12px] text-center">
                Games & Puzzles
              </h1>
            </div>
          </Link>
          <Link
            to={`/item/selling/post/trading_cards`}
            className=" py-5 rounded-md border border-[#FF6779] shadow-md shadow-[#FF6779] bg-[#FF6779] text-white hover:bg-white hover:text-[#FF6779] hover:shadow-white transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center">
              <CgCardClubs className="text-[40px]" />
              <h1 className="font-semibold mt-3 md:text-[16px] text-[12px] text-center">
                Trading Cards
              </h1>
            </div>
          </Link>
          <Link
            to={`/item/selling/post/comics`}
            className=" py-5 rounded-md border border-[#FF6779] shadow-md shadow-[#FF6779] bg-[#FF6779] text-white hover:bg-white hover:text-[#FF6779] hover:shadow-white transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center">
              <MdLibraryBooks className="text-[40px]" />
              <h1 className="font-semibold mt-3 md:text-[16px] text-[12px] text-center">
                Comics
              </h1>
            </div>
          </Link>
          <Link
            to={`/item/selling/post/remote_control_toys_vehicles`}
            className=" py-5 rounded-md border border-[#FF6779] shadow-md shadow-[#FF6779] bg-[#FF6779] text-white hover:bg-white hover:text-[#FF6779] hover:shadow-white transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center">
              <MdLibraryBooks className="text-[40px]" />
              <h1 className="font-semibold mt-3 md:text-[16px] text-[12px] text-center">
                Remote Control Toys & Vehicles
              </h1>
            </div>
          </Link>
          <Link
            to={`/item/selling/post/others`}
            className=" py-5 rounded-md border border-[#FF6779] shadow-md shadow-[#FF6779] bg-[#FF6779] text-white hover:bg-white hover:text-[#FF6779] hover:shadow-white transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center">
              <MdLibraryBooks className="text-[40px]" />
              <h1 className="font-semibold mt-3 md:text-[16px] text-[12px] text-center">
                Others...
              </h1>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Navbar */}
      <Navbar></Navbar>
    </div>
  );
};

export default CategoryPage;
