
import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import { useDispatch } from 'react-redux';
import { currentTagStore } from '../../features/tag/tagSlice';
//import tag.css

const Tags = () => {
    const slides = [{
        text: "Action Figures",
        value: "action_figures"
    },
    {
        text: "Vintage",
        value: "vintage_collections"
    },
    {
        text: "Construction",
        value: "construction_toys"
    },
    {
        text: "Games",
        value: "games_puzzles"
    },
    {
        text: "Puzzles",
        value: "games_puzzles"
    },
    {
        text: "Trading Cards",
        value: "trading_cards"
    }, {
        text: "Comics",
        value: "comics"
    }, {
        text: 'Remote Control',
        value: "remote_control_toys_vehicles"
    },
    {
        text: 'Toys & Vehicles',
        value: "remote_control_toys_vehicles"
    }] // Slide content or data

    const [selectedSlide, setSelectedSlide] = useState(null);
    const dispatch = useDispatch();

    const params = {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    };

    const handleSlideClick = (slideNumber:any) => {
        if (selectedSlide === slideNumber?.text) {
          setSelectedSlide(null); // Unselect the tag
          dispatch(currentTagStore({ tag: null })); // Dispatch an action to clear the current tag
        } else {
          setSelectedSlide(slideNumber?.text); // Select the tag
          dispatch(currentTagStore({ tag: slideNumber })); // Dispatch an action with the selected tag
        }
      };
    
      console.log(selectedSlide);

    return (
        <div className='overflow-x-hidden mx-4 m-4'>
            <Swiper {...params}>
            {slides.map((slide, index) => (
          <button
            key={index}
            className={`${
              selectedSlide === slide?.text
                ? 'bg-primary p-[2px] text-[14px] text-white rounded-lg font-semibold'
                : 'p-[2px] text-[14px] text-white border border-[#3C3C3C] bg-[#3C3C3C] rounded-lg font-semibold'
            }`}
            onClick={() => handleSlideClick(slide)}
          >
            {slide?.text}
          </button>
        ))}
            </Swiper>
        </div>
    );
};

export default Tags;


