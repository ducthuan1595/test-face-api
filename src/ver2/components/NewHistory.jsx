import React from "react";
import Header from "../components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewHistory.scss";

class NewHistory extends React.Component {
     render() {
          const { match } = this.props;

          const settings = {
               dots: true,
               infinite: false,
               speed: 500,
               slidesToShow: 3,
               slidesToScroll: 1
          };
          return (
               <div className="flex flex-col min-h-screen bg-gradient-to-r from-custom-pink to-custom-red p-10">
                    <Header />
                    
                    <Slider {...settings}>
                         <div className="section">
                              <div className="I"></div>
                              <img
                                   className="imgs"
                                   src="https://tse2.mm.bing.net/th?id=OIP.Ytni1HUmOU8qO3VNooA4BAHaEK&pid=Api&P=0&h=180"
                              />
                              <div className="text">text</div>
                         </div>
                         <div className="section">
                              <div className="I">II</div>
                              <img
                                   className="imgs"
                                   src="https://tse2.mm.bing.net/th?id=OIP.Ytni1HUmOU8qO3VNooA4BAHaEK&pid=Api&P=0&h=180"
                              />
                              <div className="text">text</div>
                         </div>
                         <div className="section">
                              <div className="I">III</div>
                              <img
                                   className="imgs"
                                   src="https://tse2.mm.bing.net/th?id=OIP.Ytni1HUmOU8qO3VNooA4BAHaEK&pid=Api&P=0&h=180"
                              />
                              <div className="text">text</div>
                         </div>
                         <div className="section">
                              <div className="I">IV</div>
                              <img
                                   className="imgs"
                                   src="https://tse2.mm.bing.net/th?id=OIP.Ytni1HUmOU8qO3VNooA4BAHaEK&pid=Api&P=0&h=180"
                              />
                              <div className="text">text</div>
                         </div>
                    </Slider>
               </div>
          );
     }
}

export default NewHistory;
