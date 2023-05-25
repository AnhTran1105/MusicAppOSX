function FormatNumber(number) {
    // Chuyển số thành chuỗi
    const strNumber = String(number);

    if (strNumber.length <= 3) {
        return strNumber; // Giữ nguyên số ban đầu
    }

    // Tìm vị trí của dấu chấm phân cách hàng nghìn
    let dotIndex = strNumber.length - 3;

    // Tạo chuỗi mới với dấu chấm phân cách hàng nghìn
    let formattedNumber = strNumber.slice(0, dotIndex) + '.' + strNumber.slice(dotIndex);

    // Kiểm tra nếu số lớn hơn hoặc bằng 1 triệu
    if (strNumber.length > 6) {
        // Tìm vị trí của dấu chấm phân cách hàng triệu
        dotIndex = strNumber.length - 6;

        // Thêm dấu chấm phân cách hàng triệu vào chuỗi mới
        formattedNumber = formattedNumber.slice(0, dotIndex) + '.' + formattedNumber.slice(dotIndex);
    }

    return formattedNumber;
}

export default FormatNumber;
