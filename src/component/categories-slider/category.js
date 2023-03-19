import React from "react";
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

  return (
    <div>
      <button className="button" onClick={() => { 
        dispatch(setFetchApi(props.category)) ;
        dispatch(addToHistory(props.category));
      }}>
        {props.category}
      </button>
    </div>
  )
}

function Category() {

  let categories = ["Gaming", "Soccer", "Cricket league", "React JS", "Html", "css", "Javascript tutorial", "Web "];

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
          {categories.map(category => {
            return (
              <OneButton category={category} key={v4()} />
            )

          })}

        </Slider>
      </div>
    </>
  )
};


export default Category;