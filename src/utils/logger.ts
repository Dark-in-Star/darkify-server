import { pino } from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty', // Optional: makes logs human-readable
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

export default logger;