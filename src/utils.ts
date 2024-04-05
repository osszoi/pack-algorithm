export const sortIntervalsByStart = (intervals) => {
  return intervals.sort((a, b) => a.start - b.start);
};

export const mergeIntervals = (intervals) => {
  console.log(intervals);
  const sortedByStart = sortIntervalsByStart(intervals);

  let i = 0;
  const flat = sortedByStart.reduce((acum, { start, end }) => {
    return [
      ...acum,
      { index: i, date: start },
      { index: i++, date: end, isEnd: true }
    ];
  }, []);

  const sorted = flat.sort((a, b) => a.date - b.date);

  const result: any = [];
  let latestGap = -1;
  for (i = 0; i < sorted.length; i++) {
    if (i + 1 >= sorted.length) continue;

    // We need to check wether this start is not in a gap
    // For that we check that start is not >=allEnd and <=allStart
    let isInGap = false;

    console.log('');
    console.log('');
    console.log('');
    console.log('Checking if', sorted[i].date, 'is in a gap');
    for (let k = 0; k < sortedByStart.length - 1; k++) {
      console.log('');
      console.log('Checking against:');
      console.log('>=', sortedByStart[k].end);
      console.log('<=', sortedByStart[k + 1].start);
      console.log(
        '&&',
        sortedByStart[k].end.toISOString() !==
          sortedByStart[k + 1].start.toISOString()
      );
      console.log(
        'Result:',
        sorted[i].date >= sortedByStart[k].end &&
          sorted[i].date <= sortedByStart[k + 1].start &&
          sortedByStart[k].end.toISOString() !==
            sortedByStart[k + 1].start.toISOString()
      );

      isInGap =
        isInGap ||
        (sorted[i].date >= sortedByStart[k].end &&
          sorted[i].date <= sortedByStart[k + 1].start &&
          sortedByStart[k].end.toISOString() !==
            sortedByStart[k + 1].start.toISOString());
      console.log(
        '---------------------------------------------------------------------'
      );
    }

    console.log('Final result:', isInGap);

    // You can't have 2 followed gaps
    if (isInGap && latestGap + 1 !== i) {
      latestGap = i;
    }

    if (!isInGap || i === sorted.length - 2 || latestGap + 1 === i) {
      result.push({
        start: sorted[i].date,
        end: sorted[i + 1].date,
        index: sorted[i].isEnd ? sorted[i + 1].index : sorted[i].index
      });
    }
  }

  return result;
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
