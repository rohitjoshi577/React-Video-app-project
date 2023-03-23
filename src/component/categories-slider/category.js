import React from "react";
import "./category.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 } from 'uuid';
import { setFetchApi } from "../../redux/apiSlice";
import { addToHistory } from "../../redux/historyslice";
import { useDispatch } from "react-redux";


function OneButton(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <button className="buttons-inactive" onClick={() => { 
        dispatch(setFetchApi(props.category)) ;
        dispatch(addToHistory({id: v4() ,search :props.category}));
      }}>
        {props.category}
      </button>
    </div>
  )
}

function Category(){
  


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
              <OneButton category={category} index={index}   key={v4()}/>
            )
          })}
        </Slider>
      </div>
    </>
  )
};


export default Category;