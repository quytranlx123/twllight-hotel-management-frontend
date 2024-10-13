import React from "react";
//link
import { Link } from "react-router-dom";
//icons
import { BsArrowsFullscreen, BsPeople } from "react-icons/bs";

const Room = ({ room }) => {
  //destructive room
  const { id, room_type, image, size, maxPerson, description } = room;

  return (
    <div className="bg-white shadow-2xl min-h-[500px] group rounded-md flex flex-col justify-between">
      {/* img */}
      <div className="overflow-hidden rounded-md max-w-[500px] max-h-[300px]">
        <img
          className="group-hover:scale-110 transition-all duration-300 w-full max-h-[250px]"
          src={image}
          alt=""
        />
      </div>
      {/* details */}
      <div
        className="bg-white shadow-lg mx-auto h-[60px] flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base rounded-md"
        style={{
          transform: "translateY(-50%)",
          width: "80%",
          maxWidth: "300px",
        }}
      >
        <div className="flex justify-between w-full">
          {/* size */}
          <div className="flex items-center gap-x-3">
            <div className="text-accent ml-7">
              <BsArrowsFullscreen className="text-[15px]" />
            </div>
            <div className="flex gap-x-1">
              <div>Size</div>
              <div>{size}m²</div>
            </div>
          </div>
          {/* room capacity */}
          <div className="flex items-center gap-x-3">
            <div className="text-accent ml-7">
              <BsPeople className="text-[18px]" />
            </div>
            <div className="flex gap-x-1 mr-7">
              <div>Max People</div>
              <div>{maxPerson}</div>
            </div>
          </div>
        </div>
      </div>
      {/* name & description */}
      <div className="text-center flex-grow flex flex-col justify-center">
        <h3 className="h3">{room_type}</h3>
        <p className="max-w-[300px] mx-auto mb-3 lg:mb-6">
          {description.slice(0, 80)}...
        </p>
      </div>
      {/* btn */}
      <div className="mt-auto">
        <Link
          to={`/room/${id}`}
          className="btn btn-secondary btn-sm max-w-[240px] py-3 mx-auto mb-9 text-center block rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Room;
