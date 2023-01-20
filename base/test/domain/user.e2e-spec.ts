import * as request from 'supertest';
import TestContainer, { TestAppContainer } from '../utils/setup';
import { UserHelper } from '../utils/test-helper';

describe('User (e2e)', () => {
  let container: TestAppContainer;
  let helper: UserHelper;

  beforeAll(async () => {
    container = await TestContainer.start();
    helper = new UserHelper(container.publicConnection);
  });

  afterAll(async () => {
    await TestContainer.stop();
  });

  describe('Post /users', () => {
    it('should return status code 201', async () => {
      // Arrange
      const [image, permission] = await Promise.all([
        helper.generateImage(),
        helper.generatePermission(),
      ]);

      // Act
      const response = await request(container.app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${container.serviceToken}`)
        .send({
          name: 'mark',
          role: 'STAFF',
          coverImageId: image.id,
          permissionIds: [permission.id],
        });

      // Assert
      expect(response.status).toEqual(201);
    });

    it('should return status code 401, when the Authorization header is empty', async () => {
      const response = await request(container.app.getHttpServer())
        .post('/users')
        .send({ name: 'mark', owner: '2C' });

      expect(response.status).toEqual(401);
    });
  });
});
