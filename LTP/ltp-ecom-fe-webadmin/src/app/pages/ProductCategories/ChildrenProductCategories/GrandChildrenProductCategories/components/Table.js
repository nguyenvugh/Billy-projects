import { Checkbox, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MTable from "@material-ui/core/Table";
import MTableBody from "@material-ui/core/TableBody";
import MTableCell from "@material-ui/core/TableCell";
import MTableContainer from "@material-ui/core/TableContainer";
import MTableHead from "@material-ui/core/TableHead";
import MTableRow from "@material-ui/core/TableRow";
import { Create as CreateIcon } from "@material-ui/icons";
import TableRowDnd from "app/components/TableRowDnd";
import { addNewCate } from "app/services/axios";
import { productCategoryOrders } from "app/services/urlAPI";
import * as Utils from "app/utils";
import lodash from "lodash";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  img: {
    height: "58px",
    width: "58px",
    borderRadius: "100px",
  },
}));

export default function Table({ data, setData, columns, onSelect, onEdit }) {
  const classes = useStyles();

  const handleSelectAllClick = () => {
    if (onSelect.selectedRows.length === data.length) {
      onSelect.setSelectedRows([]);
    } else {
      onSelect.setSelectedRows(data);
    }
  };

  const handleSelectRow = (row) => {
    if (isSelected(row)) {
      const newSelectedRows = onSelect.selectedRows.filter(
        (item) => item.id !== row.id
      );
      onSelect.setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [...onSelect.selectedRows, row];
      onSelect.setSelectedRows(newSelectedRows);
    }
  };

  const isSelected = (row) => {
    return lodash.find(onSelect.selectedRows, { id: row.id }) !== undefined;
  };

  const move = useCallback(
    (dragIndex, hoverIndex) => {
      let newData = [...data];
      let dragCard = data[dragIndex];
      newData[dragIndex] = newData[hoverIndex];
      newData[hoverIndex] = dragCard;
      setData(newData);
    },
    [data, setData]
  );

  const endDrop = () => {
    let items = data.map((item, index) => ({ id: item.id, order: index + 1 }));
    addNewCate(productCategoryOrders, { items })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <div>
      <MTableContainer component={Paper}>
        <MTable>
          <MTableHead>
            <MTableRow>
              <MTableCell>
                <Checkbox
                  indeterminate={
                    onSelect.selectedRows.length > 0 &&
                    onSelect.selectedRows.length < data.length
                  }
                  checked={
                    data.length > 0 &&
                    onSelect.selectedRows.length === data.length
                  }
                  onChange={handleSelectAllClick}
                />
              </MTableCell>
              {columns.map((item) => (
                <MTableCell align="center" key={item.name}>
                  {item.text}
                </MTableCell>
              ))}
            </MTableRow>
          </MTableHead>
          <MTableBody>
            {data.map((row, index) => {
              const image_obj = Utils.getSafeValue(row, "image_obj", {});
              const imageUrl = Utils.getSafeValue(image_obj, "url", "");
              const code = Utils.getSafeValue(row, "code", "");
              const translates = Utils.getSafeValue(row, "translates", []);
              const name = Utils.getSafeValue(
                translates[0],
                "language_value",
                ""
              );
              const count_products = Utils.getSafeValue(
                row,
                "count_products",
                0
              );
              return (
                <TableRowDnd
                  key={row?.id}
                  id={row?.id}
                  index={index}
                  move={move}
                  endDrop={endDrop}
                >
                  <MTableCell>
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </MTableCell>
                  <MTableCell align="center">
                    <img src={imageUrl} className={classes.img} />
                  </MTableCell>
                  <MTableCell align="center">{code}</MTableCell>
                  <MTableCell align="center">{name}</MTableCell>
                  {/* <MTableCell align='center'>{count_products}</MTableCell> */}
                  <MTableCell align="center">
                    <IconButton onClick={() => onEdit(row)}>
                      <CreateIcon />
                    </IconButton>
                  </MTableCell>
                </TableRowDnd>
              );
            })}
          </MTableBody>
        </MTable>
      </MTableContainer>
    </div>
  );
}

Table.defaultProps = {
  data: [],
};