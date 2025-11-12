import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";

interface CustomSelectProps {
  label: string;
  options: { value: string; label: string }[];
  handleChange?: (event: SelectChangeEvent) => void;
  selectedOption?: string;
  className?: string;
}

export const CustomSelect = ({
  label,
  options,
  handleChange,
  selectedOption,
  className,
}: CustomSelectProps) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${label}-select`}>{label}</InputLabel>
        <MuiSelect
          labelId={`${label}-select`}
          id={label}
          value={selectedOption || ""}
          label={label}
          onChange={handleChange}
          className={className}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
};
