export const formatDateToDDMMYYYY = (date) => {
    if (!date) return ""; // Kiểm tra xem giá trị date có hợp lệ không
    const d = new Date(date); // Tạo một đối tượng Date mới
    const day = String(d.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo luôn có 2 chữ số
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Lấy tháng (lưu ý tháng bắt đầu từ 0)
    const year = d.getFullYear(); // Lấy năm
    return `${day}-${month}-${year}`; // Trả về định dạng dd-mm-yyyy
  };