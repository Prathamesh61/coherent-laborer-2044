import React, { useEffect, useState } from "react";
import "./CarousalProductDetails.css"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartData, postCartData } from "../../Redux/ProfileRedux/action";


const CarousalProductDetails = ({ props }) => {
  const [data, setData] = useState([]);
  const toast = useToast();
  const dispatch = useDispatch();
 
  useEffect(() => {
    axios.get("https://dilicious-adm-api.onrender.com/fooditems/get").then((res) => {
      let newdata=res.data.data
      setData(newdata)
    })
    
  }, []);
  // console.log(data);

  const slideLeft1 = () => {
    var slider1 = document.getElementById("slider1");
    slider1.scrollLeft = slider1.scrollLeft - 600;
  };

  const slideRight1 = () => {
    var slider1 = document.getElementById("slider1");
    slider1.scrollLeft = slider1.scrollLeft + 600;
  };

  const addToCart = (item, name) => {
    if (localStorage.getItem("token") == undefined) {
      toast({
        position: 'top',
        title: `Not Logged in.`,
        description: `Login first to add item into cart`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }else{
      dispatch(postCartData(item))
      dispatch(getCartData());
      toast({
        position: 'top',
        title: `${name} added Successfully.`,
        description: `Check your cart`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  };

  return (
    <div className="main_slider_container1">
      <MdKeyboardArrowLeft
        size={40}
        className="slider_icon_left1"
        onClick={slideLeft1}
      />
      <div id="slider1">
        {data.map((slide) => {
          return (
            <div key={slide._id} className="slider_card1">
            <Link to={`/productdetails/${slide._id}`} >  <div id="image">
                <img src={slide.imgUrl} alt="image" />
              </div></Link>
              <div id="heading" style={{overflow:"hidden"}}>
                <p>{slide.name}</p>
              </div>
              <div id="para" style={{overflow:"hidden"}}>
                <p>{slide.desc}</p>
              </div>
              <div id="wt">
                <p>{slide.net}</p>
              </div>
              <div id="blook">
                <p style={{ color: "#e1003e", fontWeight: "700",textAlign:"left" }}>
                  MRP: ₹{slide.price}
                </p><p style={{ color: "gray", textAlign:"left" }}>
                  MRP: <s>₹{slide.price+Math.floor(slide.price*0.13)}</s>
                </p>
                <Button 
                onClick={() => addToCart(slide, slide.name)}
                 style={{
        
                  fontSize: "10px",
                  fontWeight: "600",
                  height: "30px",
                  width: "100px",
                }}
                bg={"#D11243"} 
                color="white"
                _hover={{ color: "black" }}
                >
                  ADD TO CART
                  </Button>
              </div>
              <Flex style={{ textAlign: "center", alignItems: "center",  marginTop: "1%" }}>
                      <div style={{display:"flex",margin: "auto",}}> <Image width="20px" src="https://www.licious.in/img/rebranding/express_delivery.svg" />
                        <Text fontSize="sm" color='gray'>&nbsp;&nbsp;Today in &nbsp;</Text>
                        <Text fontSize="sm" style={{ color: "gray", fontWeight: "600" }}> 90 min</Text>
                        </div>
                      </Flex>
            </div>
          );
        })}
      </div>
      <MdKeyboardArrowRight
        size={40}
        className="slider_icon_right1"
        onClick={slideRight1}
      />
    </div>
  );
};

export default CarousalProductDetails;



