import { getMessagesES, localizer } from "@/helpers";
import { CalendarEvent, CustomHeader } from ".";
import { Calendar, SlotInfo, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './styles.css';
import { useScheduleStore } from "@/hooks";
import { DayOfWeek, RoomModel, ScheduleModel } from "@/models";
import { useCallback } from 'react';

export interface EventsCalendarModel {
  id: number;
  start: Date;
  end: Date;
  product_id: number;
  rental: number
  title: string;
  name_state: string;
}

interface Props {
  onSelect: (data:SlotInfo) => void;
  eventSelects:SlotInfo[];
  room:RoomModel;
}

export const CalendarComponent = (props: Props) => {
  const { onSelect, eventSelects,room } = props;
  
  const { schedules = [] } = useScheduleStore();

  const dayMap = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7
  };

  const setEvent = () => {
    const events: any[] = [];
    const currentDate = new Date(); // Fecha actual para saber la semana en curso

    let i = 0;
    schedules.forEach((element: ScheduleModel) => {
      element.days.forEach((day: DayOfWeek) => {
        // Obtener el número correspondiente al día
        const dayOfWeek = dayMap[day];

        // Encontrar la fecha del próximo día específico de esta semana
        const date = new Date(currentDate);
        const diff = dayOfWeek - date.getDay();
        date.setDate(date.getDate() + diff);

        // Crear los eventos con la hora específica
        const start = new Date(date);
        const end = new Date(date);

        // Asignar las horas de inicio y fin al evento
        const startTime = new Date(element.start);
        const endTime = new Date(element.end);

        // Resta 4 horas
        start.setHours(startTime.getUTCHours() - 4, startTime.getUTCMinutes(), 0, 0);
        end.setHours(endTime.getUTCHours() - 4, endTime.getUTCMinutes(), 0, 0);
        
        // Agregar el evento al calendario
        events.push({
          id: `${room.id}-${i}`,
          idPosition: i,
          day: element.days[i],
          title: `disponible`,
          start: start,
          end: end,
          data: element,
        });
        i++
      });
    });

    return events;
  };

  const eventPropGetter = useCallback(
    (event: any) => {
      const isSelected = eventSelects.map((e: any) => e.id).includes(event.id);
      return {
        style: {
          backgroundColor: isSelected ? '#ac1380' : '#f0f0f0',
          borderColor: isSelected ? '#ac1380' : '#10B981',
          color: isSelected? '#fff' : '#000',
        },
      };
    },
    [eventSelects]
  );
  
  return (
    <Calendar
      culture='es'
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      messages={getMessagesES()}
      defaultView={Views.WEEK}
      components={{ event: CalendarEvent, header: CustomHeader }}
      eventPropGetter={eventPropGetter}
      min={new Date(2024, 0, 1, 8, 0, 0)}
      max={new Date(2024, 0, 1, 21, 0, 0)}
      selectable={true}
      toolbar={false}
      events={setEvent() ?? []}
      onSelectSlot={(data)=>onSelect(data)}
      onSelectEvent={(data)=>onSelect(data)}
      style={{ height: '400px', cursor: 'pointer', width: '100%' }}

    />
  )
}
