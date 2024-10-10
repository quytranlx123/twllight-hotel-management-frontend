import React, { useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import PaymentComponent from "./PaymentComponent";
import AvailableRooms from "./AvailableRoom";
import { UserIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { calculateDaysBetween } from "../Recycle_Function/calculateDaysBetween";
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
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="border rounded p-2 w-full"
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
      required={true}
    />
    {errors.guest_firstname && (
      <p className="text-red-500">{errors.guest_firstname}</p>
    )}

    <InputField
      label="Tên"
      name="guest_lastname"
      type="text"
      value={formData.guest_lastname}
      onChange={onChange}
      placeholder="Tên"
      required={true}
    />
    {errors.guest_lastname && (
      <p className="text-red-500">{errors.guest_lastname}</p>
    )}

    <InputField
      label="Địa chỉ email"
      name="guest_email"
      type="email"
      value={formData.guest_email}
      onChange={onChange}
      placeholder="Địa chỉ email"
      required={true}
    />
    {errors.guest_email && <p className="text-red-500">{errors.guest_email}</p>}

    <InputField
      label="Số điện thoại"
      name="guest_phone"
      type="tel"
      value={formData.guest_phone}
      onChange={onChange}
      placeholder="Số điện thoại"
      required={true}
    />
    {errors.guest_phone && <p className="text-red-500">{errors.guest_phone}</p>}

    <textarea
      name="notes"
      placeholder="Yêu cầu đặc biệt (không bắt buộc)"
      value={formData.notes}
      onChange={onChange}
      className="border rounded p-2 w-full mb-4"
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
    <h2 className="text-lg font-semibold">Xác nhận</h2>
    <p>Vui lòng xem lại thông tin của bạn trước khi gửi.</p>
    <pre className="overflow-x-auto">{JSON.stringify(formData, null, 2)}</pre>
  </div>
);

// Step 3: Payment Component
const Step3 = () => <PaymentComponent />;

// Step 4: Success Component
const Step4 = () => <div>Thanh toán thành công</div>;

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
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const numberOfDays = calculateDaysBetween(startDate, endDate);
  console.log(startDate)
  console.log(endDate)
  console.log(numberOfDays)
  const [formData, setFormData] = useState({
    ...initialFormData,
    check_in_date: startDate,
    check_out_date: endDate,
    stay_price: Number(numberOfDays) * Number(price),
    roomType: room.room_type,
    room_code: room.name,
    id,
  });

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
        // Gửi formData đến server
        try {
          const response = await fetch("http://localhost:8000/api/bookings/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            setSuccessMessage("Đặt phòng thành công!");
            setActiveStep(3); // Chuyển sang bước 4
          } else {
            // Xử lý lỗi nếu có
            setSuccessMessage("Đã xảy ra lỗi khi đặt phòng.");
          }
        } catch (error) {
          console.error("Error:", error);
          setSuccessMessage("Đã xảy ra lỗi khi kết nối đến server.");
        }
      } else {
        setActiveStep((cur) => cur + 1);
        setErrors({});
      }
    }
  };

  const handlePrev = () => setActiveStep((cur) => cur - 1);

  // Form validation function
  const validateForm = (data) => {
    const errors = {};
    if (!data.guest_firstname) errors.guest_firstname = "Tên là bắt buộc.";
    if (!data.guest_lastname) errors.guest_lastname = "Họ là bắt buộc.";
    if (!data.guest_email) {
      errors.guest_email = "Email là bắt buộc.";
    } else if (!/\S+@\S+\.\S+/.test(data.guest_email)) {
      errors.guest_email = "Email không hợp lệ.";
    }
    if (!data.guest_phone) {
      errors.guest_phone = "Số điện thoại là bắt buộc.";
    } else if (!/^\d{10}$/.test(data.guest_phone)) {
      errors.guest_phone = "Số điện thoại phải có 10 chữ số.";
    }
    return errors;
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 py-4">
      <h1 className="text-center font-bold text-3xl pb-12">
        Thông tin đặt phòng
      </h1>
      <Stepper activeStep={activeStep} className="mb-28">
        <StepLabel
          stepIcon={<UserIcon className="h-5 w-5" />}
          stepTitle="Bước 1"
          stepSubTitle="Thông tin cá nhân"
          isActive={activeStep === 0}
        />
        <StepLabel
          stepIcon={<BuildingLibraryIcon className="h-5 w-5" />}
          stepTitle="Bước 2"
          stepSubTitle="Xác nhận thông tin"
          isActive={activeStep === 1}
        />
        <StepLabel
          stepIcon={<BuildingLibraryIcon className="h-5 w-5" />}
          stepTitle="Bước 3"
          stepSubTitle="Thông tin thanh toán"
          isActive={activeStep === 2}
        />
        <StepLabel
          stepIcon={<BuildingLibraryIcon className="h-5 w-5" />}
          stepTitle="Bước 4"
          stepSubTitle="Hoàn thành"
          isActive={activeStep === 3}
        />
      </Stepper>

      <div>
        {activeStep === 0 && (
          <Step1
            formData={formData}
            onChange={handleChange}
            errors={errors}
            onSelectRoom={handleSelectRoom}
          />
        )}
        {activeStep === 1 && <Step2 formData={formData} />}
        {activeStep === 2 && <Step3 />}
        {activeStep === 3 && <Step4 />}
      </div>

      <div className="flex justify-between mt-6">
        {activeStep > 0 && (
          <Button variant="outlined" onClick={handlePrev}>
            Quay lại
          </Button>
        )}
        {activeStep < 3 ? (
          <Button variant="contained" onClick={handleNext}>
            {activeStep === 2 ? "Đặt phòng" : "Tiếp theo"}
          </Button>
        ) : (
          <Button variant="contained" onClick={onExit}>
            Đóng
          </Button>
        )}
      </div>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
}
