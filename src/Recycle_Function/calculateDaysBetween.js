export const calculateDaysBetween = (startDate, endDate) => {
    // Hàm giúp chuyển đổi định dạng dd-mm-yyyy thành yyyy-mm-dd
    const convertToDateFormat = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`); // Trả về định dạng yyyy-mm-dd
    };

    // Chuyển đổi chuỗi thành đối tượng Date
    const start = convertToDateFormat(startDate);
    const end = convertToDateFormat(endDate);

    // Tính số ngày giữa hai ngày
    const timeDiff = end - start; // Tính hiệu thời gian
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Chuyển đổi từ milliseconds sang ngày
    return daysDiff; // Trả về số ngày
}
