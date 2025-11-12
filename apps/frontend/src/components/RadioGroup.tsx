import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export interface RadioGroupProps {
  options: string[];
  label?: string;
  selectedOption?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const RadioButtonsGroup = ({
  options,
  label,
  selectedOption,
  onChange,
  disabled,
  className,
}: RadioGroupProps) => {
  return (
    <FormControl>
      {label && <FormLabel id="radio">{label}</FormLabel>}
      <RadioGroup
        row
        aria-labelledby="radio"
        name="row-radio-buttons-group"
        value={selectedOption}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
            disabled={disabled}
            className={className}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
