import "./style.css";

import { useCallback, useState } from "react";

import TreeSelectItem from "./tree-select-item";
import { Grid } from "@material-ui/core";

const TreeSelect = ({ trees, locked }) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const update = () => {
    forceUpdate();
  };
  return (
    <ul
      className="tree-select-menu"
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <Grid container spacing={4}>
        {Array.isArray(trees) &&
          trees.map((tree) => (
            <Grid item xs={12} md={4} key={tree?.id}>
              <TreeSelectItem key={tree?.id} tree={tree} forceUpdate={update} />
            </Grid>
          ))}
      </Grid>
    </ul>
  );
};

export default TreeSelect;
