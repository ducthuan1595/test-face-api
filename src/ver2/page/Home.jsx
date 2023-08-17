import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import boy from "../components/image/nam1.png";
import girl from "../components/image/nu1.png";
import { BsFillHeartFill } from "react-icons/bs";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getFullFaceDescription,
  loadModels,
  createMatcher,
} from "../../api/face";

const JSON_PROFILE = require("../../descriptors/bnk48.json");

function Home() {
  const Api_key = "4b92af7f16b0fb074cc5e1c7adfa512a";
  const server = "http://14.225.7.221:9090/getdata";

  const [data, setData] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [showImage1, setShowImage1] = useState(null);
  const [showImage2, setShowImage2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [link, setLink] = useState(null);

  const [isFace1, setIsFace1] = useState(false);
  const [isFace2, setIsFace2] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState(null);

  const navigate = useNavigate();

  const uploadImage = async (image, setImage) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      if (image) {
        const input = document.getElementById(
          setImage === setImage1 ? "male" : "female"
        );
        if (input) {
          input.style.display = "none";
        }
        console.log(...formData);
        const apiResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${Api_key}`,
          formData
        );
        setImage(apiResponse.data.data.url);
      }
    } catch (error) {
      throw error;
    }
  };
  const handleChangeImage = async (event, setImage) => {
    event.preventDefault();
    let file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImage = async (image, index) => {
    const res = await getFullFaceDescription(image);
    if (index === "img1") {
      if (res.length > 0) {
        setIsFace1(true);
      } else {
        setIsFace1(false);
      }
    }
    if (index === "img2") {
      if (res.length > 0) {
        setIsFace2(true);
      } else {
        setIsFace2(false);
      }
    }
  };

  useEffect(() => {
    const willMount = async () => {
      await loadModels();
      setFaceMatcher(await createMatcher(JSON_PROFILE));
    };
    willMount();
  });

  useEffect(() => {
    if (image1) {
      setShowImage1(URL.createObjectURL(image1));
      handleImage(URL.createObjectURL(image1), "img1");
    }
  }, [image1]);

  useEffect(() => {
    if (image2) {
      setShowImage2(URL.createObjectURL(image2));
      handleImage(URL.createObjectURL(image2), "img2");
    }
  }, [image2]);

  const fetchData = async () => {
    setIsLoading(true);
    console.log(isFace1, isFace2);
    try {
      if (isFace1 && isFace2) {
        setIsLoading(false);
        toast.success("Upload và lưu dữ liệu thành công");
        navigate("/");
      } else {
        toast.error("Image không hợp lệ vui lòng upload lại ảnh.");
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    uploadImage(image1, setImage1);
    uploadImage(image2, setImage2);
  }, [image1, image2]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-custom-pink to-custom-red p-10 h-screen ">
      <Header />

      <div className="flex flex-row h-4/5  justify-evenly content-center items-center relative top-32">
        <div className="flex flex-col items-center relative">
          <img src={boy} alt="" className="w-300 h-500 static" />
          <input
            onChange={(e) => handleChangeImage(e, setImage1)}
            style={{ backgroundImage: `url(${showImage1})` }}
            type="file"
            className="w-[360px] h-[360px]  rounded-[50%] absolute bottom-8 left-8 z-10 bg-center bg-no-repeat bg-cover bg-[#FFDAB9]"
          />
        </div>

        <div className="flex flex-col items-center transition-transform duration-300 hover:scale-125 ">
          <BsFillHeartFill className="w-48 h-48 text-[#FF9F9F] " />
          <span
            onClick={fetchData}
            className="text-4xl font-bold mt-14 absolute text-[#7A1E3E]"
          >
            Bắt đầu
          </span>
        </div>
        <div className="flex flex-col items-center relative">
          <img src={girl} alt="" className="w-500 h-500 static" />
          <input
            onChange={(e) => handleChangeImage(e, setImage2)}
            style={{ backgroundImage: `url(${showImage2})` }}
            type="file"
            className="w-[360px] h-[360px] rounded-[50%] absolute top-8 right-8  z-10 bg-center bg-no-repeat bg-cover bg-[#FFDAB9] "
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
