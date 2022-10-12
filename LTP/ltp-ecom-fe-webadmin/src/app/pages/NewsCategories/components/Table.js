import { useState } from "react";
import lodash from "lodash";
import MTable from "@material-ui/core/Table";
import MTableBody from "@material-ui/core/TableBody";
import MTableCell from "@material-ui/core/TableCell";
import MTableContainer from "@material-ui/core/TableContainer";
import MTableHead from "@material-ui/core/TableHead";
import MTableRow from "@material-ui/core/TableRow";
import { Checkbox, Paper, IconButton } from "@material-ui/core";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import { Create as CreateIcon } from '@material-ui/icons';

import * as Utils from 'app/utils';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,

  ...(isDragging && {
    background: "#fff",
    display: 'table',
  }),
});

export default function Table({ data, setData, columns, onSelect, onEdit}) {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      data,
      result.source.index,
      result.destination.index
    );
    setData(items);
  }

  const handleSelectAllClick = () => {
    if (onSelect.selectedRows.length === data.length) {
      onSelect.setSelectedRows([]);
    } else {
      onSelect.setSelectedRows(data);
    }
  };

  const handleSelectRow = (row) => {
    if (isSelected(row)) {
      const newSelectedRows = onSelect.selectedRows.filter((item) => item.id !== row.id);
      onSelect.setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [...onSelect.selectedRows, row];
      onSelect.setSelectedRows(newSelectedRows);
    }
  };

  const isSelected = (row) => {
    return lodash.find(onSelect.selectedRows, { id: row.id }) !== undefined;
  };

  return (
    <div>
      <MTableContainer component={Paper}>
        <MTable aria-label="simple table" padding="none">
          <MTableHead>
            <MTableRow>
              <MTableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    onSelect.selectedRows.length > 0 && onSelect.selectedRows.length < data.length
                  }
                  checked={
                    data.length > 0 && onSelect.selectedRows.length === data.length
                  }
                  onChange={handleSelectAllClick}
                />
              </MTableCell>
              {columns.map((item) => (
                <MTableCell key={item.code}>{item.text}</MTableCell>
              ))}
            </MTableRow>
          </MTableHead>
          <MTableBody component={DroppableComponent(onDragEnd)}>
            {data.map((row, index) => {
              const translates = Utils.getSafeValue(row, "translates", []);
              const vie_category_name = Utils.getField(translates, "vi", "name");
              const eng_category_name = Utils.getField(translates, "en", "name");
              return (
              <MTableRow key={row.id} component={DraggableComponent(row.id.toString(), index)}>
                <MTableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row)}
                    onChange={() => handleSelectRow(row)}
                  />
                </MTableCell>
                <MTableCell>{vie_category_name}</MTableCell>
                <MTableCell>{eng_category_name}</MTableCell>
                <MTableCell>admin</MTableCell>
                <MTableCell>
                  <IconButton onClick={() => onEdit(row)}>
                    <CreateIcon />
                  </IconButton>
                </MTableCell>
              </MTableRow>
            )})}
          </MTableBody>
        </MTable>
      </MTableContainer>
    </div>
  );
}

Table.defaultProps = {
  data: [],
};

const DraggableComponent = (id, index) => (props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <MTableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          {...props}
        >
          {props.children}
        </MTableRow>
      )}
    </Draggable>
  );
};

const DroppableComponent = (onDragEnd) => (
  props
) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"1"} direction="vertical">
        {(provided) => {
          return (
            <MTableBody
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...props}
            >
              {props.children}
              {provided.placeholder}
            </MTableBody>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};