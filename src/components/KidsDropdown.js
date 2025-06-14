import React, { useContext } from "react";
// room context
import { RoomContext } from "../context/RoomContext";
// headless ui menu
import { Menu } from "@headlessui/react";
// icons
import { BsChevronDown } from "react-icons/bs";

const lis = [
  { name: "0 Trẻ em" },
  { name: "1 Trẻ em" },
  { name: "2 Trẻ em" },
  { name: "3 Trẻ em" },
  { name: "4 Trẻ em" },
];

const KidsDropdown = () => {
  const { kids, setKids } = useContext(RoomContext);
  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      {/* btn */}
      <Menu.Button className="w-full h-full flex items-center justify-between px-8">
        {kids === "0 Kids" ? "No kids" : kids}
        <BsChevronDown className="text-base text-accent-hover" />
      </Menu.Button>
      {/* items */}
      <Menu.Items
        as="ul"
        className="bg-white absolute w-full flex flex-col z-40"
      >
        {lis.map((li, index) => {
          return (
            <Menu.Item
              onClick={() => setKids(li.name)}
              as="li"
              className="border-b last-of-type:boder-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer"
              key={index}
            >
              {li.name}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default KidsDropdown;
