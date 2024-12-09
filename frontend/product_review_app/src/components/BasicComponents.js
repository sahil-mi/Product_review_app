import * as React from "react";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Checkbox, FormControlLabel } from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function InputBox(props) {
  if (props.data_type === "bool") {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={props.value}
            onChange={(e) => {
              props.onChange(e, props.id);
            }}
            name={props.name}
          />
        }
        label={props.label}
      />
    );
  } else {
    return (
      <TextField
        id="outlined-basic"
        label={props.label}
        variant="outlined"
        onChange={(e) => {
          props.onChange(e, props.id);
        }}
        value={props.value}
        name={props.name}
        type={props.type ? props.type : "text"}
      />
    );
  }
}

export function ToggleComponent(props) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={props.alignment}
      exclusive
      onChange={props.handleChange}
      aria-label="Platform"
    >
      {props.ToggleList.map((item) => (
        <ToggleButton value={item.value}>{item.name}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export function TablePagination(props) {
  let total_count = props.total_count;
  let total_pages = Math.ceil(total_count / 10);
  return (
    <Stack spacing={2}>
      <Pagination
        count={total_pages}
        page={props.page}
        onChange={props.onChange}
      />
    </Stack>
  );
}

export function BasicButton(props) {
  return (
    <Button
      style={{ gap: "5px" }}
      onClick={props.onClick}
      variant={props.variant}
      color={props.color}
    >
      {props.name}
    </Button>
  );
}

export function SelectBox(props) {
  const { value, label, handleChange, fieldList, name } = props;

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

  return (
    <FormControl sx={{ m: 1, minWidth: 235 }}>
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={handleChange}
        name={name}
      >
        {fieldList.map((item) => (
          <MenuItem value={item.value}>{item.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function Snackbars(props) {
  const { open, setOpen, data } = props;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen();
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={data.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {data.message}
        </Alert>
      </Snackbar>
    </div>
  );
}