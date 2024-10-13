import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
//components
import AdultsDropdown from "../components/AdultsDropdown";
import KidsDropdown from "../components/KidsDropdown";
import CheckIn from "../components/CheckIn";
import CheckOut from "../components/CheckOut";
//scroll top component
import ScrollToTop from "../components/ScrollToTop";
//context
import { RoomContext } from "../context/RoomContext";
//icons
import { FaCheck } from "react-icons/fa";
import { BookingStep } from "../components/BookingStep";
//FormatDate
import { formatDateToDDMMYYYY } from "../Recycle_Function/FormantDateToDDMMYYYY";

const RoomDetails = () => {
  const { rooms } = useContext(RoomContext);
  const { id } = useParams();
  const [roomDetail, setRoomDetail] = useState(true);
  const [bookingStep, setBookingStep] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  if (!rooms || rooms.length === 0) {
    return <></>;
  }

  // Lấy thông tin phòng
  const room = rooms.find((room) => {
    return room.id === Number(id);
  });

  // Destructuring các thuộc tính của phòng
  const { room_type, description, facilities, imageLg, price } = room;

  // Hàm xử lý khi nhấn nút đặt phòng (Kiểm tra ngày nhận và trả phòng)
  const toggleVisibility = (startDate, endDate) => {
    if (!startDate || !endDate || startDate === endDate) {
      alert("Ngày trả phòng phải sau ngày nhận phòng");
      return; // Không thực hiện tiếp nếu chưa chọn đủ ngày
    }
    setRoomDetail(!roomDetail);
    setBookingStep(!bookingStep);
  };

  // Hàm xử lý khi chọn ngày nhận phòng (Check-In)
  const handleCheckInChange = (startDate) => {
    const formattedStartDate = formatDateToDDMMYYYY(startDate); // Định dạng lại ngày nhận phòng
    setStartDate(formattedStartDate);
  };

  // Hàm xử lý khi chọn ngày trả phòng (Check-Out)
  const handleCheckOutChange = (endDate) => {
    const formattedEndDate = formatDateToDDMMYYYY(endDate); // Định dạng lại ngày trả phòng
    setEndDate(formattedEndDate);
  };

  const handleExit = () => {
    setRoomDetail(!roomDetail);
    setBookingStep(!bookingStep);
  };

  return (
    <section>
      <ScrollToTop />
      <div className="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center">
        <div className="absolute w-full h-full bg-black/70"></div>
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          Details {room_type}
        </h1>
      </div>
      {roomDetail && (
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row h-full py-24">
            <div className="w-full h-full lg:w-[60%] px-6">
              <h2 className="h2">{room_type}</h2>
              <p className="mb-8">{description}</p>
              <div className="mb-8 w-[400px] max-h-auto max-w-full flex justify-center mx-auto">
                <img className="w-full h-auto" src={imageLg} alt="" />
              </div>
              <div className="mt-12 block">
                <h3 className=" mb-3 text-3xl font-serif">Tiện nghi phòng</h3>
                <p className="mb-12 font-serif text-base">
                  Phòng tại khách sạn của chúng tôi được trang bị đầy đủ tiện
                  nghi nhằm đảm bảo sự thoải mái và tiện lợi tối đa cho quý
                  khách. Dưới đây là một số tiện ích nổi bật trong phòng.
                </p>
                <div className="grid grid-cols-3 gap-6 mb-12">
                  {facilities.map((item, index) => {
                    const { name, icon } = item;
                    return (
                      <div
                        className="flex items-center gap-x-3 flex-1"
                        key={index}
                      >
                        <div className="text-5xl text-accent ">{icon}</div>
                        <div className="text-xl text-accent ">{name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full h-full lg:w-[40%]">
              <div className="py-8 px-6 bg-accent/20 mb-12">
                <div className="flex flex-col space-y-4 mb-4">
                  <h3 className="font-serif">Đặt phòng của bạn</h3>
                  <div className="h-[60px]">
                    <CheckIn onDateChange={handleCheckInChange} />
                  </div>
                  <div className="h-[60px]">
                    <CheckOut onDateChange={handleCheckOutChange} />
                  </div>
                  <div className="h-[60px]">
                    <AdultsDropdown />
                  </div>
                  <div className="h-[60px]">
                    <KidsDropdown />
                  </div>
                </div>
                <button
                  onClick={() => toggleVisibility(startDate, endDate)} // Truyền giá trị ngày
                  className="btn btn-lg btn-primary w-full"
                >
                  Đặt ngay với giá {price}VND
                </button>
              </div>
              <div>
                <h3 className="text-3xl font-serif mb-3">Quy định khách sạn</h3>
                <p className="mb-6 text-base font-serif">
                  Khi đến với khách sạn của chúng tôi, chúng tôi luôn mong muốn
                  mang lại cho quý khách một trải nghiệm nghỉ dưỡng tuyệt vời và
                  thoải mái. Để đảm bảo điều đó, chúng tôi đề nghị tất cả khách
                  hàng tuân thủ các quy định chung.
                </p>
                <ul className="flex flex-col gap-y-4">
                  <li className="flex items-center gap-x-4">
                    <FaCheck className="text-accent" />
                    Nhận phòng: 3:00PM - 9:00PM
                  </li>
                  <li className="flex items-center gap-x-4">
                    <FaCheck className="text-accent" />
                    Trả phòng: 10:30 AM
                  </li>
                  <li className="flex items-center gap-x-4">
                    <FaCheck className="text-accent" />
                    Không nuôi thú cưng
                  </li>
                  <li className="flex items-center gap-x-4">
                    <FaCheck className="text-accent" />
                    Không hút thuốc
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {bookingStep && (
        <div className="flex items-center justify-center px-56 py-10 ">
          <BookingStep
            onButtonClick={() => toggleVisibility(startDate, endDate)} // Đảm bảo ngày được cập nhật
            startDate={startDate}
            endDate={endDate}
            room={room}
            roomType={room_type}
            price={price}
            id={id}
            onExit={handleExit}
          />
        </div>
      )}
    </section>
  );
};

export default RoomDetails;
