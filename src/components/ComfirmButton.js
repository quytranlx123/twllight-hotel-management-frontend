import React, { useContext } from 'react';
import { BookingContext } from '../context/BookingsContext';
const ConfirmButton = ({ booking }) => {
  const { updateBooking } = useContext(BookingContext);

  const handleConfirm = () => {
    const updatedBooking = {
      ...booking,
      status: 'confirmed', 
    };

    updateBooking(updatedBooking);
  };

  return (
    <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded">
      Xác nhận
    </button>
  );
};

export default ConfirmButton;
