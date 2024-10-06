import { useEffect, useState } from 'react';
import {
  FaWifi,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from 'react-icons/fa';

let roomData = [];

// Hàm để lấy dữ liệu từ API
const fetchRoomData = async () => {
  try {
    const response = await fetch('URL_CỦA_API'); // Thay thế với URL của bạn
    const apiData = await response.json();

    roomData = apiData.map(room => ({
      id: room.id,
      name: room.name,
      description: room.description,
      facilities: [
        { name: 'Wifi', icon: <FaWifi /> },
        { name: 'Coffee', icon: <FaCoffee /> },
        { name: 'Bath', icon: <FaBath /> },
        { name: 'Parking Space', icon: <FaParking /> },
        { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
        { name: 'Breakfast', icon: <FaHotdog /> },
        { name: 'GYM', icon: <FaStopwatch /> },
        { name: 'Drinks', icon: <FaCocktail /> },
      ],
      size: room.area,
      maxPerson: room.capacity,
      price: room.price_per_night,
      image: room.image,
      imageLg: room.image_bathroom,
    }));

    console.log('Room Data:', roomData); // Kiểm tra dữ liệu
  } catch (error) {
    console.error('Error fetching room data:', error);
  }
};

// Gọi hàm để lấy dữ liệu
fetchRoomData();

export { roomData };




// export const roomData = [
//   {
//     id: 1,
//     name: 'Superior Room',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
//     facilities: [
//       { name: 'Wifi', icon: <FaWifi /> },
//       { name: 'Coffee', icon: <FaCoffee /> },
//       { name: 'Bath', icon: <FaBath /> },
//       { name: 'Parking Space', icon: <FaParking /> },
//       { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
//       { name: 'Breakfast', icon: <FaHotdog /> },
//       { name: 'GYM', icon: <FaStopwatch /> },
//       { name: 'Drinks', icon: <FaCocktail /> },
//     ],
//     size: 30,
//     maxPerson: 1,
//     price: 115,
//     image: Room1Img,
//     imageLg: Room1ImgLg,
//   },
//   {
//     id: 2,
//     name: 'Signature Room',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
//     facilities: [
//       { name: 'Wifi', icon: <FaWifi /> },
//       { name: 'Coffee', icon: <FaCoffee /> },
//       { name: 'Bath', icon: <FaBath /> },
//       { name: 'Parking Space', icon: <FaParking /> },
//       { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
//       { name: 'Breakfast', icon: <FaHotdog /> },
//       { name: 'GYM', icon: <FaStopwatch /> },
//       { name: 'Drinks', icon: <FaCocktail /> },
//     ],
//     size: 70,
//     maxPerson: 2,
//     price: 220,
//     image: Room2Img,
//     imageLg: Room2ImgLg,
//   },
//   {
//     id: 3,
//     name: 'Deluxe Room',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
//     facilities: [
//       { name: 'Wifi', icon: <FaWifi /> },
//       { name: 'Coffee', icon: <FaCoffee /> },
//       { name: 'Bath', icon: <FaBath /> },
//       { name: 'Parking Space', icon: <FaParking /> },
//       { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
//       { name: 'Breakfast', icon: <FaHotdog /> },
//       { name: 'GYM', icon: <FaStopwatch /> },
//       { name: 'Drinks', icon: <FaCocktail /> },
//     ],
//     size: 50,
//     maxPerson: 3,
//     price: 265,
//     image: Room3Img,
//     imageLg: Room3ImgLg,
//   },
//   {
//     id: 4,
//     name: 'Luxury Room',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
//     facilities: [
//       { name: 'Wifi', icon: <FaWifi /> },
//       { name: 'Coffee', icon: <FaCoffee /> },
//       { name: 'Bath', icon: <FaBath /> },
//       { name: 'Parking Space', icon: <FaParking /> },
//       { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
//       { name: 'Breakfast', icon: <FaHotdog /> },
//       { name: 'GYM', icon: <FaStopwatch /> },
//       { name: 'Drinks', icon: <FaCocktail /> },
//     ],
//     size: 50,
//     maxPerson: 4,
//     price: 289,
//     image: Room4Img,
//     imageLg: Room4ImgLg,
//   },
//   {
//     id: 5,
//     name: 'Luxury Suite Room',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
//     facilities: [
//       { name: 'Wifi', icon: <FaWifi /> },
//       { name: 'Coffee', icon: <FaCoffee /> },
//       { name: 'Bath', icon: <FaBath /> },
//       { name: 'Parking Space', icon: <FaParking /> },
//       { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
//       { name: 'Breakfast', icon: <FaHotdog /> },
//       { name: 'GYM', icon: <FaStopwatch /> },
//       { name: 'Drinks', icon: <FaCocktail /> },
//     ],
//     size: 90,
//     maxPerson: 5,
//     price: 320,
//     image: Room5Img,
//     imageLg: Room5ImgLg,
//   },
//   {
//     id: 6,
//     name: 'Deluxe Room',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
//     facilities: [
//       { name: 'Wifi', icon: <FaWifi /> },
//       { name: 'Coffee', icon: <FaCoffee /> },
//       { name: 'Bath', icon: <FaBath /> },
//       { name: 'Parking Space', icon: <FaParking /> },
//       { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
//       { name: 'Breakfast', icon: <FaHotdog /> },
//       { name: 'GYM', icon: <FaStopwatch /> },
//       { name: 'Drinks', icon: <FaCocktail /> },
//     ],
//     size: 45,
//     maxPerson: 6,
//     price: 344,
//     image: Room6Img,
//     imageLg: Room6ImgLg,
//   },
//   {
//     id: 7,
//     name: 'Luxury Room',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea ccusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
//     facilities: [
//       { name: 'Wifi', icon: <FaWifi /> },
//       { name: 'Coffee', icon: <FaCoffee /> },
//       { name: 'Bath', icon: <FaBath /> },
//       { name: 'Parking Space', icon: <FaParking /> },
//       { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
//       { name: 'Breakfast', icon: <FaHotdog /> },
//       { name: 'GYM', icon: <FaStopwatch /> },
//       { name: 'Drinks', icon: <FaCocktail /> },
//     ],
//     size: 84,
//     maxPerson: 7,
//     price: 389,
//     image: Room7Img,
//     imageLg: Room7ImgLg,
//   },
//   {
//     id: 8,
//     name: 'Deluxe Room',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.',
//     facilities: [
//       { name: 'Wifi', icon: <FaWifi /> },
//       { name: 'Coffee', icon: <FaCoffee /> },
//       { name: 'Bath', icon: <FaBath /> },
//       { name: 'Parking Space', icon: <FaParking /> },
//       { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
//       { name: 'Breakfast', icon: <FaHotdog /> },
//       { name: 'GYM', icon: <FaStopwatch /> },
//       { name: 'Drinks', icon: <FaCocktail /> },
//     ],
//     size: 48,
//     maxPerson: 8,
//     price: 499,
//     image: Room8Img,
//     imageLg: Room8ImgLg,
//   },
// ];
