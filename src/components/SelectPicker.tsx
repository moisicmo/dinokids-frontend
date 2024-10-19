import { DayOfWeek } from '@/models';
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers/icons';

interface selectProps {
  isMultiple?:boolean;
  label: string;
  handleSelect: (value: any) => void;
  options: any[];
  value: any;
  onClear?: () => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}
export const ComponentSelectPicker = (props: selectProps) => {
  const {
    isMultiple = false,
    label,
    handleSelect,
    options,
    value,
    onClear,
    disabled = false,
    error,
    helperText,
  } = props;

  const onChange = (event: SelectChangeEvent<any>) => {
    let objSelected = event.target.value;
    handleSelect(objSelected);
  };

  return (
    <>
      <FormControl
        sx={{
          mr: 5,
          mb: 0.5,
          width: '100%',
          color: 'red',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'red' : 'black',
          },
        }}
        size="small"
      >
        <InputLabel id="select">{label}</InputLabel>
        <Select
          labelId="select"
          id="select"
          multiple={isMultiple}
          // value={value}
          value={value??''}
          label="select"
          onChange={onChange}
          sx={{
            borderRadius: 2,
            display: 'flex',
            padding: '8px',
            margin: '0px',
            '& label.Mui-focused': {
              color: 'black',
            },
            '& label:not(.Mui-focused)': {
              color: 'black',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              height: 'fit-content',
              '& fieldset': { borderColor: '#2F3746' },
              '&:hover fieldset': { borderColor: '#0B815A' },
            },
          }}
          componentsProps={{}}
          slotProps={{}}
          disabled={disabled}
          endAdornment={
            onClear &&
            value != '' && (
              <InputAdornment position="end">
                <IconButton onClick={onClear} color="secondary">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
          renderValue={(selected) => (
            isMultiple?<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={Object.entries(DayOfWeek).find(key => value == key[1])?.[0]} />
              ))}
            </Box>:<>{selected}</>
          )}
          MenuProps={{
            style: {
              zIndex: 9999,
            },
          }}
        >
          {options.map((value: any) => (
            <MenuItem key={value.id} value={value.id}>
              {value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && (
        <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }}>
          {helperText}
        </Typography>
      )}
    </>
  );
};
