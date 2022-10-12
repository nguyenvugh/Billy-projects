import {
  createStyles,
  IconButton,
  InputBase, makeStyles,
  Paper
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "inline-flex",
      alignItems: "center",
      width: "100%",
      maxWidth: 220,
      height: 40,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      fontSize: 14,
    },
    iconButton: {
      padding: 6,
    },
  })
);

const SearchInput = ({
  placeholder,
  defaultValue = "",
  onSubmit,
  type,
  style,
  inputProps,
}) => {
  const classes = useStyles();
  const [search, setSearch] = useState(defaultValue);

  const onSubmitValue = (e) => {
    e.preventDefault();
    onSubmit instanceof Function && onSubmit(search);
  };

  const onChangevalue = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={onSubmitValue}
      style={style}
    >
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ maxLength: 200, ...inputProps }}
        type={type}
        value={search}
        onChange={onChangevalue}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <Search />
      </IconButton>
    </Paper>
  );
};
export default SearchInput;
