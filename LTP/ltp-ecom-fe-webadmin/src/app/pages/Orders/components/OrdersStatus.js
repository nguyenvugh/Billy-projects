import Status from "app/components/Status";

export const ordersStatusList = [
  {
    status: 1,
    label: "Đã xác nhận",
    color: "#383838",
  },
  {
    status: 2,
    label: "Đang lấy hàng",
    color: "#F7B611",
  },
  {
    status: 3,
    label: "Đang giao",
    color: "#276EF1",
  },
  {
    status: 4,
    label: "Đã giao",
    color: "#00C537",
  },
  {
    status: 5,
    label: "Giao một phần",
    color: "#46EB72",
  },
  {
    status: 6,
    label: "Trả hàng",
    color: "#DBFF00",
  },
  {
    status: 7,
    label: "Đã hủy",
    color: "#EA403F",
  },
];

const OrdersStatus = ({ status, width = "auto" }) => {
  const ordersStatus = ordersStatusList[status - 1];
  return (
    <Status
      label={ordersStatus?.label}
      style={{ color: ordersStatus?.color, width }}
    />
  );
};

export default OrdersStatus;
