import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import './App.css';
import { DateRangeTimeline } from './components/DateRangeTimeline';
import { RangesTimeline } from './components/RangesTimeline';
import { mergeIntervals, subtractIntervalListFrom } from './utils';

function App() {
  const [tripStart] = useState<any>(dayjs('2024-02-13T06:26'));
  const [tripEnd] = useState<any>(dayjs('2024-04-03T06:26'));

  const [selectedCase, setSelectedCase] = useState(0);

  const [packs, setPacks] = useState<any[]>([]);
  const [packsDates, setPacksDates] = useState<any[]>([]);
  const colors = useMemo(
    () => [
      '#6c001f',
      '#00e151',
      '#002dd5',
      '#caff42',
      '#bc4bff',
      '#5cd862',
      '#ea005f',
      '#00ffff',
      '#ff5320',
      '#00aad8',
      '#7a0000',
      '#a5a1ff',
      '#7b7000',
      '#a63784',
      '#00662c',
      '#ff82c4',
      '#001d00',
      '#5d463a',
      '#171f18',
      '#262300'
    ],
    []
  );

  // const outColors = [
  //   '#006bc4',
  //   '#ce0100',
  //   '#00fcff',
  //   '#ff49ff',
  //   '#466b0f',
  //   '#c77af5',
  //   '#00fbff',
  //   '#ff299e',
  //   '#00f8ff',
  //   '#9e0030',
  //   '#00adff',
  //   '#770c00',
  //   '#008c9d',
  //   '#3c005c',
  //   '#7a4000',
  //   '#004797',
  //   '#a6553d',
  //   '#ffb7ff',
  //   '#ff929d',
  //   '#cc7bac'
  // ];

  const applyCase = (i) => {
    setSelectedCase(i);
    const dates = cases[i];
    setPacks(dates);
    setPacksDates(dates);
  };

  const cases = [
    [
      { start: dayjs('2024-02-13'), end: dayjs('2024-02-17') },
      { start: dayjs('2024-02-17'), end: dayjs('2024-02-25') },
      { start: dayjs('2024-02-25'), end: dayjs('2024-03-19') }
    ],
    [
      { start: dayjs('2024-02-13'), end: dayjs('2024-02-25') },
      { start: dayjs('2024-02-13'), end: dayjs('2024-02-18') }
    ],
    [
      { start: dayjs('2024-02-18'), end: dayjs('2024-02-27') },
      { start: dayjs('2024-02-13'), end: dayjs('2024-03-10') }
    ],
    [
      { start: dayjs('2024-02-14'), end: dayjs('2024-03-10') },
      { start: dayjs('2024-02-13'), end: dayjs('2024-02-27') }
    ],
    [
      { start: dayjs('2024-02-14'), end: dayjs('2024-02-23') },
      { start: dayjs('2024-02-28'), end: dayjs('2024-03-19') }
    ],
    [
      { start: dayjs('2024-03-08'), end: dayjs('2024-03-12') },
      { start: dayjs('2024-02-14'), end: dayjs('2024-02-23') },
      { start: dayjs('2024-02-25'), end: dayjs('2024-03-10') },
      { start: dayjs('2024-03-19'), end: dayjs('2024-03-22') }
    ]
  ];

  const mergedIntervals = useMemo(() => {
    return mergeIntervals(packsDates).map(({ start, end, index }: any) => ({
      start: start,
      end: end,
      color: colors[index]
    }));
  }, [packsDates, colors]);

  const substractedIntervals = useMemo(() => {
    return subtractIntervalListFrom(
      { start: tripStart, end: tripEnd },
      mergedIntervals
    ).map(({ start, end }: any) => ({
      start: start,
      end: end,
      color: 'red'
    }));
  }, [tripStart, tripEnd, mergedIntervals]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex gap-4">
        {/* <DateTimePicker
          label="Trip Start"
          value={tripStart}
          onChange={(newValue) => {
            setTripStart(newValue);
          }}
        />

        <DateTimePicker
          label="Trip End"
          value={tripEnd}
          onChange={(newValue) => setTripEnd(newValue)}
        /> */}

        {/* <Button
          onClick={() => {
            setPacks((prev) => [
              ...prev,
              { start: tripStart.$d, end: tripEnd.$d }
            ]);

            setPacksDates((prev) => [
              ...prev,
              { start: tripStart.$d, end: tripEnd.$d }
            ]);
          }}
          variant="contained">
          Add pack
        </Button>

        {!!packs.length && (
          <Button
            onClick={() => {
              setPacks([]);

              setPacksDates([]);
            }}>
            Reset
          </Button>
        )} */}
      </div>

      <div className="flex gap-3 sticky top-0 z-20 bg-slate-200">
        <ToggleButtonGroup
          value={selectedCase}
          exclusive
          onChange={(_, i) => {
            applyCase(i);
          }}
          color="success"
          size="small">
          {cases.map((_case, i) => {
            return (
              <ToggleButton
                key={i}
                value={i}>
                Case {i + 1}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>Packs</AccordionSummary>

        <AccordionDetails>
          <div className="w-full mt-3 flex gap-2 flex-col">
            {packs.map((pack, i) => {
              return (
                <div className="w-full flex gap-1 flex-col border rounded p-4 hover:bg-slate-100 hover:cursor-pointer">
                  <p className="mb-0 text-sm text-left font-bold flex gap-3">
                    <span>Pack {i + 1}</span>
                    <div
                      className="w-[100px] h-[20px]"
                      style={{
                        backgroundColor: colors[i % colors.length],
                        borderColor: `${colors[i % colors.length]} !important`
                      }}></div>
                  </p>

                  <DateRangeTimeline
                    overallStart={tripStart}
                    overallEnd={tripEnd}
                    start={pack.start}
                    end={pack.end}
                    onChange={(start, end) =>
                      setPacksDates((prev) =>
                        prev.map((v, j) => (i === j ? { start, end } : v))
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          Calculations
        </AccordionSummary>

        <AccordionDetails>
          {/* <div className="w-full mt-4 relative box-content">
            <h2 className="font-bold text-xl">raw-Intervals</h2>

            <RangesTimeline
              ranges={packsDates.map(({ start, end }: any, i) => ({
                start: start,
                end: end,
                color: colors[i % colors.length]
              }))}
              start={tripStart}
              end={tripEnd}
            />
          </div> */}

          <div className="w-full mt-4 relative box-content">
            <h2 className="font-bold text-xl">merged-Intervals</h2>

            <RangesTimeline
              ranges={mergedIntervals}
              start={tripStart}
              end={tripEnd}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          Interval results
        </AccordionSummary>

        <AccordionDetails>
          <div className="w-full mt-4 relative box-content">
            <h2 className="font-bold text-xl">IN-Intervals</h2>

            <RangesTimeline
              ranges={mergedIntervals.map((m) => ({
                ...m,
                color: 'darkgreen'
              }))}
              start={tripStart}
              end={tripEnd}
            />
          </div>

          <div className="w-full mt-4 relative box-content">
            <h2 className="font-bold text-xl">OUT-Intervals</h2>

            <RangesTimeline
              ranges={substractedIntervals}
              start={tripStart}
              end={tripEnd}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </LocalizationProvider>
  );
}

export default App;
