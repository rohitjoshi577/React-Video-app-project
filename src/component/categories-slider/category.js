import React, { useState } from "react";
import "./category.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 } from 'uuid';
import { useDispatch } from "react-redux";
import { setFetchApi } from "../../redux/apiSlice";
import { addToHistory } from "../../redux/historyslice";



function OneButton(props) {
  let dispatch = useDispatch();
  const{index , activeIndex , setActiveIndex} = props;
  return (
    <div>
      <button className={index==activeIndex? "button-active" : "button-inactive"}onClick={() => { 
        dispatch(setFetchApi(props.category)) ;
        dispatch(addToHistory({id: v4() ,search :props.category}));
        setActiveIndex(index);
      }}>
        {props.category}
      </button>
    </div>
  )
}

function Category(){
  const[activeIndex , setActiveIndex]= useState(-1);

  let categories = ["gaming" ,"Soccer", "Cricket league", "React JS", "Html", "css", "Javascript tutorial", "Web "];

  const settings = {
    className: "slider variable-width",
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 4,
    variableWidth: true,
    infinite: false,
  };


  return (
    <>
      <div className="button-slider">
        <Slider {...settings}>
          {categories.map((category,index) => {
            return (
              <OneButton category={category} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} key={v4()}/>
            )
          })}
        </Slider>
      </div>
    </>
  )
};


export default Category;