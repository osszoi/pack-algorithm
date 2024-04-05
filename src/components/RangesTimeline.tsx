import { Tooltip } from '@mui/material';
import { differenceInCalendarDays } from 'date-fns';

export const RangesTimeline = ({ ranges, start, end }) => {
  const totalDays =
    differenceInCalendarDays(new Date(end), new Date(start)) + 1;

  const calculateStyle = (range) => {
    const startDiff = differenceInCalendarDays(
      new Date(range.start),
      new Date(start)
    );
    const endDiff = differenceInCalendarDays(
      new Date(range.end),
      new Date(start)
    );
    const left = (startDiff / totalDays) * 100;
    const width = ((endDiff - startDiff) / totalDays) * 100;
    return {
      left: `${left}%`,
      width: `${width}%`,
      backgroundColor: range.color || 'blue',
      position: 'absolute',
      height: '100%'
    };
  };

  return (
    <div className="relative h-10 w-full bg-gray-200 rounded">
      {ranges.map((range, index) => (
        <Tooltip title={`Pack ${index + 1}`}>
          <div
            key={index}
            style={calculateStyle(range) as any}></div>
        </Tooltip>
      ))}
    </div>
  );
};
