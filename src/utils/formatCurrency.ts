export const formatCurrency = (money: number) => {
  // Chuyển đổi số thành chuỗi và thêm dấu phẩy sau mỗi 3 chữ số từ phải sang trái
  const parts = money.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Nếu có phần thập phân, thêm vào và làm tròn đến 2 chữ số
  if (parts[1]) {
    parts[1] = parts[1].slice(0, 2);
    return parts.join(".") + " đ";
  } else {
    return parts.join(".") + " đ";
  }
};
