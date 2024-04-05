import Slider from '@mui/material/Slider';
import { differenceInCalendarDays, eachDayOfInterval, format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

export const DateRangeTimeline = ({
  overallStart,
  overallEnd,
  start,
  end,
  onChange
}) => {
  const totalDays = useMemo(
    () =>
      differenceInCalendarDays(new Date(overallEnd), new Date(overallStart)) +
      1,
    [overallStart, overallEnd]
  );
  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: new Date(overallStart),
        end: new Date(overallEnd)
      }),
    [overallStart, overallEnd]
  );

  const calculateInitialRange = () => {
    const startIndex = differenceInCalendarDays(
      new Date(start),
      new Date(overallStart)
    );
    const endIndex = differenceInCalendarDays(
      new Date(end),
      new Date(overallStart)
    );
    const startPercent = (startIndex / totalDays) * 100;
    const endPercent = (endIndex / totalDays) * 100;
    return [startPercent, endPercent];
  };

  const [selectedRange, setSelectedRange] = useState(calculateInitialRange);

  useEffect(() => {
    setSelectedRange(calculateInitialRange());
  }, [start, end, totalDays]);

  const handleSliderChange = (event, newValue) => {
    setSelectedRange(newValue);

    const startDayIndex = Math.round((newValue[0] / 100) * (totalDays - 1));
    const endDayIndex = Math.round((newValue[1] / 100) * (totalDays - 1));

    const selectedStartDate = days[startDayIndex];
    const selectedEndDate = days[Math.min(endDayIndex, days.length - 1)];

    onChange(selectedStartDate, selectedEndDate);
  };

  const marks = useMemo(
    () =>
      days.map((day, index) => ({
        value: (index / totalDays) * 100,
        label: ''
      })),
    [days, totalDays]
  );

  const valueLabelFormat = (value) => {
    const dayIndex = Math.round((value / 100) * (totalDays - 1));
    return format(days[dayIndex], 'MMM dd');
  };

  return (
    <div className="flex flex-col space-y-4 mt-10">
      <Slider
        value={selectedRange}
        onChange={handleSliderChange}
        valueLabelDisplay="on"
        valueLabelFormat={valueLabelFormat}
        aria-labelledby="range-slider"
        step={null}
        marks={marks}
        min={0}
        max={100}
        disabled
      />
      <div className="flex justify-between text-sm">
        <span>{format(new Date(overallStart), 'MMM dd, yyyy')}</span>
        <span>{format(new Date(overallEnd), 'MMM dd, yyyy')}</span>
      </div>
    </div>
  );
};
