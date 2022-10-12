import Status from "app/components/Status";

export const paymentStatusList = [
  {
    status: 1,
    label: "Chưa thanh toán",
    color: "#E11B1B",
  },
  {
    status: 2,
    label: "Đã thanh toán",
    color: "#00B41D",
  },
];

const PaymentStatus = ({ status, width = "auto" }) => {
  const paymentStatus = paymentStatusList[status - 1];
  return (
    <Status
      label={paymentStatus?.label}
      style={{ color: paymentStatus?.color, width }}
    />
  );
};

export default PaymentStatus;