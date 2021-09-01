export const App = {
  Port: 3031,
  ServiceName: 'rabbitmq-consumer'
};

export const RabbitMQ = {
  ConnectionUrl: 'amqp://localhost:5672',
  QueueName: 'test-queue'
};

export enum Environments {
  LOCAL = 'local',
  DEV = 'development',
  PROD = 'production'
}

export enum LogLevels {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose'
}
