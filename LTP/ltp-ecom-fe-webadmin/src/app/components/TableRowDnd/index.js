import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TableRow } from "@material-ui/core";

const TableRowDnd = ({ id, index, move, endDrop, children }) => {
  const ref = useRef();
  const [{ handlerId }, drop] = useDrop({
    accept: "table-row-dnd",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop(item, monitor) {
      endDrop instanceof Function && endDrop();
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "table-row-dnd",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <TableRow
      innerRef={ref}
      style={{ opacity, cursor: "move", }}
      data-handler-id={handlerId}
      className="move"
    >
      {children}
    </TableRow>
  );
};

export default TableRowDnd;
