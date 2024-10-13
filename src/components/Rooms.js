import React, { useContext } from "react";
// context
import { RoomContext } from "../context/RoomContext";
// components
import Room from "../components/Room";
// loading
import { SpinnerDotted } from "spinners-react";

const Rooms = () => {
  const { rooms, loading } = useContext(RoomContext);

  return (
    <section className="py-24">
      {/* overlay & spinner */}
      {loading && (
        <div className="h-screen w-full fixed top-0 left-0 bg-black/90 z-50 flex justify-center items-center">
          <SpinnerDotted color="white" />
        </div>
      )}
      <div className="container mx-auto lg:px-0">
        <div className="text-center">
          <div className="font-tertiary uppercase text-[17px] tracking-[6px]">Twilight Hotel</div>
          <h2 className="font-primary text-[40px] mb-4">Room & Restaurant</h2>
        </div>
        {/* grid */}
        <div
          className="grid grid-cols-1 max-w-sm mx-auto gap-[30px]
          lg:grid-cols-3 lg:max-w-none lg:mx-0 border-radius"
        >
          {rooms.map((room) => {
            return <Room room={room} key={room.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
