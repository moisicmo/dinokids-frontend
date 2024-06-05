import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"

interface selectProps {
  title: string;
  value: string|number;
  onChange: (value: any) => void;
  options: any[];
  error?: boolean;
  helperText?: string;
}

export const ComponentSelectPicker = (props: selectProps) => {
  const {
    title,
    value,
    onChange,
    options,
    error,
    helperText,
  } = props;
  return (
    <>
      <FormControl fullWidth style={{ padding: 5 }}>
        <InputLabel>{title}</InputLabel>
        <Select
          value={value}
          label="Sucursal"
          onChange={(e) => onChange(e.target.value as string)}
          style={{ borderRadius: '10px' }}
        >
          {
            options.map((e: any) => (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>))
          }
        </Select>
      </FormControl>

      {
        error && (
          <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
        )
      }
    </>
  )
}
