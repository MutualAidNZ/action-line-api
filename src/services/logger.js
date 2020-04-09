import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'app',
  streams: [
    {
      level: process.env.MIN_LOG_LEVEL || 'info',
      stream: process.stdout,
    },
  ],
});

export default logger;
