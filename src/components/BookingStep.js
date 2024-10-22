import React, { useContext, useState, useEffect } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import PaymentComponent from "./PaymentComponent";
import AvailableRooms from "./AvailableRoom";
import { UserIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { calculateDaysBetween } from "../Recycle_Function/calculateDaysBetween";
import backendUrl from "../config";
import { CustomerContext } from "../context/CustomerContext";
import ZaloPay from "./ZaloPay";

// Initial form data
const initialFormData = {
  customer: "",
  guest_firstname: "",
  guest_lastname: "",
  guest_email: "",
  guest_phone: "",
  notes: "",
  specialRequests: false,
  stay_price: "",
  roomType: "",
  check_in_date: "",
  check_out_date: "",
  otp: "",
};

// Reusable Input component
const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="border rounded p-2 w-full min-w-[320px] max-w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

// Step 1: Personal Information Component
const Step1 = ({ formData, onChange, errors, onSelectRoom }) => (
  <div className="space-y-4">
    <InputField
      label="Họ"
      name="guest_firstname"
      type="text"
      value={formData.guest_firstname}
      onChange={onChange}
      placeholder="Họ"
      required
    />
    {errors.guest_firstname && (
      <p className="text-red-500 text-sm">{errors.guest_firstname}</p>
    )}

    <InputField
      label="Tên"
      name="guest_lastname"
      type="text"
      value={formData.guest_lastname}
      onChange={onChange}
      placeholder="Tên"
      required
    />
    {errors.guest_lastname && (
      <p className="text-red-500 text-sm">{errors.guest_lastname}</p>
    )}

    <InputField
      label="Địa chỉ email"
      name="guest_email"
      type="email"
      value={formData.guest_email}
      onChange={onChange}
      placeholder="Địa chỉ email"
      required
    />
    {errors.guest_email && (
      <p className="text-red-500 text-sm">{errors.guest_email}</p>
    )}

    <InputField
      label="Số điện thoại"
      name="guest_phone"
      type="tel"
      value={formData.guest_phone}
      onChange={onChange}
      placeholder="Số điện thoại"
      required
    />
    {errors.guest_phone && (
      <p className="text-red-500 text-sm">{errors.guest_phone}</p>
    )}

    <textarea
      name="notes"
      placeholder="Yêu cầu đặc biệt (không bắt buộc)"
      value={formData.notes}
      onChange={onChange}
      className="border rounded p-2 w-full min-w-[320px] max-w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <div className="mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          name="specialRequests"
          checked={formData.specialRequests}
          onChange={onChange}
          className="mr-2"
        />
        Tôi muốn đặt chỗ đậu xe riêng ngay tại chỗ nghỉ miễn phí
      </label>
    </div>

    <AvailableRooms roomType={formData.id} onSelectRoom={onSelectRoom} />
  </div>
);

// Step 2: Confirmation Component
const Step2 = ({ formData }) => (
  <div>
    <h2 className="text-lg font-semibold">Xác nhận thông tin</h2>
    <p>Vui lòng xem lại thông tin của bạn trước khi gửi:</p>
    <div className="bg-gray-100 p-4 rounded-md shadow">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex justify-between py-2">
          <span className="font-medium">
            {key.replace(/([A-Z])/g, " $1")}:{" "}
          </span>
          <span className="text-gray-700">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

// Step 3: Payment Component
const Step3 = ({ formData }) => (
  <div>
    <ZaloPay formData={formData}/>
  </div>
);
// Step 4: Success Component
const Step4 = ({ formData, onChange }) => (
  <div>
    <input
      type="text"
      name="otp"
      value={formData.otp}
      onChange={onChange}
      placeholder="Nhập mã OTP"
      className="border rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

// Step Label Component
const StepLabel = ({
  stepIcon,
  stepTitle,
  stepSubTitle,
  isActive,
  onClick,
}) => (
  <Step onClick={onClick}>
    {stepIcon}
    <div className="absolute -bottom-[4.5rem] w-max text-center">
      <Typography variant="h6" color={isActive ? "blue-gray" : "gray"}>
        {stepTitle}
      </Typography>
      <Typography
        color={isActive ? "blue-gray" : "gray"}
        className="font-normal"
      >
        {stepSubTitle}
      </Typography>
    </div>
  </Step>
);

// Main BookingStep Component
export function BookingStep({
  onButtonClick,
  startDate,
  endDate,
  room,
  price,
  onExit,
  id,
}) {
  const { customer, fetchUser } = useContext(CustomerContext);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const numberOfDays = calculateDaysBetween(startDate, endDate);

  const [formData, setFormData] = useState({
    ...initialFormData,
    customer,
    check_in_date: startDate,
    check_out_date: endDate,
    stay_price: Number(numberOfDays) * Number(price),
    roomType: room.room_type,
    room_code: room.name,
    id,
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (customer && customer.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        customer: customer[0].id,
      }));
    }
  }, [customer]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSelectRoom = (room) => {
    setFormData((prevData) => ({ ...prevData, room_code: room.name }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = async () => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (activeStep === 2) {
        try {
          const response = await fetch(`${backendUrl}/bookings/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone_number: formData.guest_phone,
              guest_phone: formData.guest_phone,
              guest_firstname: formData.guest_firstname,
              guest_lastname: formData.guest_lastname,
              guest_email: formData.guest_email,
            }),
          });

          if (response.ok) {
            setSuccessMessage("Đã gửi yêu cầu xác nhận OTP!");
            setActiveStep(3);
          } else {
            const errorResponse = await response.json();
            console.error("Lỗi từ server:", errorResponse);
            setSuccessMessage("Đã xảy ra lỗi khi gửi yêu cầu OTP.");
          }
        } catch (error) {
          console.error("Error:", error);
          setSuccessMessage("Đã xảy ra lỗi khi kết nối đến server.");
        }
      } else if (activeStep === 3) {
        try {
          const response = await fetch(`${backendUrl}/bookings/complete/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer: formData.customer,
              phone_number: formData.guest_phone,
              guest_firstname: formData.guest_firstname,
              guest_lastname: formData.guest_lastname,
              guest_email: formData.guest_email,
              otp: formData.otp,
              check_in_date: formData.check_in_date,
              check_out_date: formData.check_out_date,
              room_code: formData.room_code,
              stay_price: formData.stay_price,
              guest_phone: formData.guest_phone,
            }),
          });

          if (response.ok) {
            setSuccessMessage("Đặt phòng thành công!");
            setTimeout(() => onExit(), 1000);
          } else {
            const errorResponse = await response.json();
            console.error("Lỗi từ server:", errorResponse);
            setSuccessMessage("Mã OTP không chính xác.");
          }
        } catch (error) {
          console.error("Error:", error);
          setSuccessMessage("Đã xảy ra lỗi khi kết nối đến server.");
        }
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.guest_firstname) errors.guest_firstname = "Họ là bắt buộc!";
    if (!data.guest_lastname) errors.guest_lastname = "Tên là bắt buộc!";
    if (!data.guest_email) errors.guest_email = "Email là bắt buộc!";
    if (!data.guest_phone) errors.guest_phone = "Số điện thoại là bắt buộc!";
    return errors;
  };

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <Stepper
        activeStep={activeStep}
        className="mb-6 flex flex-row items-stretch w-full"
      >
        <StepLabel
          className={`flex-1 min-w-[150px] text-center p-2 transition-colors duration-300 ${
            activeStep === 0 ? "bg-blue-100 rounded-md shadow-md" : ""
          }`}
          stepIcon={<UserIcon className="h-6 w-6" />}
          stepTitle={<span className="hidden sm:block">Thông tin khách</span>} // Ẩn trên màn hình nhỏ
          stepSubTitle={
            <span className="hidden sm:block">
              Vui lòng điền thông tin cá nhân
            </span>
          } // Ẩn trên màn hình nhỏ
          isActive={activeStep === 0}
          onClick={() => setActiveStep(0)}
        />
        <StepLabel
          className={`flex-1 min-w-[150px] text-center p-2 transition-colors duration-300 mx-5 ${
            activeStep === 1 ? "bg-blue-100 rounded-md shadow-md" : ""
          }`}
          stepIcon={<BuildingLibraryIcon className="h-6 w-6" />}
          stepTitle={<span className="hidden sm:block">Xác nhận phòng</span>} // Ẩn trên màn hình nhỏ
          stepSubTitle={
            <span className="hidden sm:block">Chọn phòng bạn muốn đặt</span>
          } // Ẩn trên màn hình nhỏ
          isActive={activeStep === 1}
          onClick={() => setActiveStep(1)}
        />
        <StepLabel
          className={`flex-1 min-w-[150px] text-center p-2 transition-colors duration-300 mx-5 ${
            activeStep === 2 ? "bg-blue-100 rounded-md shadow-md" : ""
          }`}
          stepIcon={<BuildingLibraryIcon className="h-6 w-6" />}
          stepTitle={<span className="hidden sm:block">Thanh toán</span>} // Ẩn trên màn hình nhỏ
          stepSubTitle={
            <span className="hidden sm:block">Hoàn tất đặt phòng</span>
          } // Ẩn trên màn hình nhỏ
          isActive={activeStep === 2}
          onClick={() => setActiveStep(2)}
        />
        <StepLabel
          className={`flex-1 min-w-[150px] text-center p-2 transition-colors duration-300 mx-5 ${
            activeStep === 3 ? "bg-blue-100 rounded-md shadow-md" : ""
          }`}
          stepIcon={<BuildingLibraryIcon className="h-6 w-6" />}
          stepTitle={<span className="hidden sm:block">Xác nhận OTP</span>} // Ẩn trên màn hình nhỏ
          stepSubTitle={
            <span className="hidden sm:block">Nhập mã OTP đã gửi</span>
          } // Ẩn trên màn hình nhỏ
          isActive={activeStep === 3}
          onClick={() => setActiveStep(3)}
        />
      </Stepper>
      <div className="mt-14 flex flex-col items-center">
        {activeStep === 0 && (
          <Step1
            formData={formData}
            onChange={handleChange}
            errors={errors}
            onSelectRoom={handleSelectRoom}
          />
        )}
        {activeStep === 1 && <Step2 formData={formData} />}
        {activeStep === 2 && <Step3 formData={formData}/>}
        {activeStep === 3 && (
          <Step4 formData={formData} onChange={handleChange} />
        )}

        <div className="mt-6 flex flex-col md:flex-row justify-center items-center">
          {activeStep > 0 && (
            <Button variant="outlined" onClick={handleBack} className="mr-2">
              Quay lại
            </Button>
          )}
          <Button onClick={handleNext}>
            {activeStep === 3 ? "Xác nhận" : "Tiếp theo"}
          </Button>
        </div>

        {successMessage && (
          <p className="mt-4 text-green-500 text-center">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default BookingStep;
