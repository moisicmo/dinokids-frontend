import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Typography } from '@mui/material';

interface dateProps {
  date: Date;
  title: string;
  onChange: (value: Date) => void;
  error?: boolean;
  helperText?: string;
}

export const ComponentDate = (props: dateProps) => {
  const {
    date,
    title,
    onChange,
    error = false,
    helperText,
  } = props;
  return (
    <>
      <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(date)}
          label={title}
          onChange={(v) => onChange(v!.toDate())}
          slotProps={{
            popper: {
              sx: {
                zIndex: 9999
              }
            },
          }}
          sx={{
            display: 'flex',
            padding: '0px',
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
        />
      </LocalizationProvider>
      {error && (
        <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
      )}
    </>
  )
}
