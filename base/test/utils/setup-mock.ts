const config = {
  serviceName: 'example-server',
  serviceAuth: {
    secret: 'test',
    allowedServices: ['2C'],
  },
  db: {
    host: 'localhost',
    port: 5432,
    database: 'test',
    username: 'hahow',
    password: '12345',
  },
  gcpPubsub: {
    projectId: 'cool-wharf-784',
  },
};

jest.mock('../../src/config/application.config.ts', () => {
  return {
    appConfig: config,
    configuration: () => {
      return config;
    },
  };
});
