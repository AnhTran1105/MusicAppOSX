function FormatNumber(number) {
    // Chuyển số thành chuỗi
    const strNumber = String(number);

    // Tìm vị trí của dấu chấm phân cách hàng nghìn
    const dotIndex = strNumber.length - 3;

    // Tạo chuỗi mới với dấu chấm phân cách hàng nghìn
    const formattedNumber = strNumber.slice(0, dotIndex) + '.' + strNumber.slice(dotIndex);

    return formattedNumber;
}
export default FormatNumber;
