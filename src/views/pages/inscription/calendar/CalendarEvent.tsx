export const CalendarEvent = ({ event }:{event:any}) => {

  const { title } = event;

  return (
      <>
          <strong>{title}</strong>
      </>
  )
}

export const CustomHeader = ({ label }:any) => {
  return (
    <span>
      {label.split(' ')[1]}
    </span>
  );
};