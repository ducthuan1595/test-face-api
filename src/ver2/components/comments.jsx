import React from "react";
import girl from "./image/girl.jpg";

function Comments() {
  return (
    <div className="w-full h-fit bg-yellow-200 rounded-[36px] text-center font-[Montserrat]">
      <ul className="px-14 py-8">
        {[...Array(25)].map((_, index) => (
          <li className="flex flex-row w-full h-32 justify-between" key={index}>
            <img src={girl} alt="" className="w-20 h-20 rounded-[50%]" />
            <span className="text-[16px] max-w-xl">
              Love makes every moment brighter, warmer, and infinitel...
            </span>
            <span className="text-[16px]">1m</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
