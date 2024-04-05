import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import { animate, motion, stagger } from 'framer-motion';
import { useEffect } from 'react';

export const Demo = ({ onClose }) => {
  useEffect(() => {
    animate([
      ['#zero', { opacity: [0, 0.5, 1, 1, 1] }, { duration: 2 }],
      ['#zero', { opacity: 0 }, { duration: 0.3 }],
      ['#one', { opacity: 1, color: 'black' }],
      ['#trip-description', { opacity: 1, y: 0 }, { duration: 1 }],
      ['#pack-bar, #pack-name', { opacity: 1 }, { delay: stagger(0.5) }],
      ['#trip-description', { opacity: 0, y: 20 }, { duration: 0.3 }],
      // ['#pack-name', { opacity: 1 }, { delay: stagger(0.5) }],
      [
        '#pack-bar',
        { y: 0, x: 0 },
        {
          delay: stagger(0.5),
          duration: 0.8,
          type: 'spring',
          damping: 10,
          mass: 0.95,
          stiffness: 80
        }
      ],
      ['#pack-name', { opacity: 0, width: 0 }, { delay: stagger(0.1) }],
      ['#pack-kms', { opacity: 1 }, { delay: stagger(0.1) }],
      ['#pack-kms', { opacity: 0 }, { delay: 1 }],
      ['#full-bar', { opacity: 1 }, { delay: 1 }],
      ['#remaining-bar', { opacity: 1 }, { delay: 1 }],
      ['.final p', { opacity: 1, y: 0 }, { delay: stagger(0.5) }],
      ['#close', { visibility: 'visible' }, { delay: 2 }]
    ]);
  }, []);

  return (
    <motion.div className="fixed top-0 left-0 w-full h-full bg-white z-40 justify-center grid place-content-center">
      <div className="w-[800px] h-[380px]">
        <motion.div
          id="zero"
          className="text-4xl"
          initial={{ opacity: 0, y: 20 }}>
          Veamos como funciona un viaje con múltiples packs
        </motion.div>
        <motion.div
          id="one"
          className={`w-full h-[84px] bg-slate-200 grid place-content-center relative`}
          initial={{
            opacity: 0
          }}>
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            id="trip-description"
            className="flex justify-between w-[800px] px-4">
            <span>
              Inicio <br />
              14/02/2024
            </span>
            <span>
              Viaje de
              <br /> 1000km
            </span>
            <span>
              Fin <br />
              19/03/2024
            </span>
          </motion.div>

          <div className="bars">
            <motion.div
              id="pack-bar"
              className={`bg-red-600 h-[80px] absolute top-0 left-0 w-[100px] flex justify-center items-center font-bold text-xl`}
              initial={{
                y: 100,
                opacity: 0
              }}>
              <div className="relative">
                <motion.div
                  id="pack-name"
                  className="absolute top-[-25px] left-[-15px]"
                  initial={{ opacity: 0, width: 0 }}>
                  Pack #1
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  className="absolute top-[-25px] left-[-15px]"
                  id="pack-kms">
                  200 km
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              id="pack-bar"
              className={`bg-blue-400 h-[80px] absolute top-0 left-[100px] w-[400px] flex justify-center items-center font-bold text-xl`}
              initial={{
                y: 200,
                x: -100,
                opacity: 0
              }}>
              <div className="relative">
                <motion.div
                  id="pack-name"
                  className="absolute top-[-25px] left-[-15px]"
                  initial={{ opacity: 0, width: 0 }}>
                  Pack #2
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  className="absolute top-[-25px] left-[-15px]"
                  id="pack-kms">
                  100 km
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              id="pack-bar"
              className={`bg-green-500 h-[80px] absolute top-0 left-[500px] w-[200px] flex justify-center items-center font-bold text-xl`}
              initial={{
                y: 300,
                x: -500,
                opacity: 0
              }}>
              <div className="relative">
                <motion.div
                  id="pack-name"
                  className="absolute top-[-25px] left-[-15px]"
                  initial={{ opacity: 0, width: 0 }}>
                  Pack #3
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  className="absolute top-[-25px] left-[-15px]"
                  id="pack-kms">
                  600 km
                </motion.div>
              </div>
            </motion.div>
            {/* Full bar */}
            <motion.div
              id="full-bar"
              className={`bg-green-800 text-gray-200 h-[80px] absolute top-0 left-0 w-[700px] flex justify-center items-center font-bold text-xl z-80`}
              initial={{
                opacity: 0
              }}>
              900 km
            </motion.div>
            <motion.div
              id="remaining-bar"
              className={`bg-red-700 text-gray-200 h-[80px] absolute top-0 left-[700px] w-[100px] flex justify-center items-center font-bold text-xl z-80`}
              initial={{
                opacity: 0
              }}>
              100 km
            </motion.div>
          </div>
        </motion.div>

        <div className="final mt-[30px] text-4xl">
          <motion.p
            id="final-data"
            initial={{ y: 20, opacity: 0 }}>
            200 km (pack #1) +<br /> 100 km (pack #2) +<br /> 600 km (pack
            #3)&nbsp;&nbsp;&nbsp;&nbsp;
          </motion.p>

          <motion.p
            id="final-data"
            className="mt-4 border-t-2 border-gray-900 pt-4"
            initial={{ y: 20, opacity: 0 }}>
            Total kms con pack: 900 km
          </motion.p>

          <motion.p
            id="final-data"
            className="mt-4"
            initial={{ y: 20, opacity: 0 }}>
            Total kms fuera de pack: 100 km
          </motion.p>

          <Button
            size="small"
            onClick={onClose}
            sx={{ position: 'absolute', top: 10, right: 20 }}>
            <Close />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
