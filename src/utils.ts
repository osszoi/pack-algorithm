import { addDays, differenceInDays } from 'date-fns';

export const sortIntervalsByStart = (intervals) => {
  return intervals.sort((a, b) => a.start - b.start);
};

export const mergeIntervals = (tripStart, intervals) => {
  const sortedByStart = sortIntervalsByStart(intervals);

  const durations = sortedByStart.reduce((acum, curr) => {
    return [...acum, differenceInDays(curr.end.$d, curr.start.$d)];
  }, []);

  let start: any = null;
  let end: any = null;

  return durations.map((d, i) => {
    if (start === null) {
      start = tripStart;
      end = sortedByStart[0].end.$d;
    } else {
      start = end;
      end = addDays(end, d);
    }

    return {
      ...sortedByStart[i],
      start,
      end
    };
  });
};

export const subtractIntervalListFrom = (fullInterval, intervalList) => {
  const { start: fullStart, end: fullEnd } = fullInterval;
  const sortedIntervalList = sortIntervalsByStart(intervalList);

  const result: any[] = [];
  let currentStart = fullStart;

  for (const { start, end } of sortedIntervalList) {
    if (start > currentStart) {
      result.push({ start: currentStart, end: Math.min(start, fullEnd) });
    }
    if (end < fullEnd) {
      currentStart = Math.max(currentStart, end);
    }
  }

  if (currentStart < fullEnd) {
    result.push({ start: currentStart, end: fullEnd });
  }

  return result;
};
