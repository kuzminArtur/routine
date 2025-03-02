import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Brand } from '@prisma/client';
import { PrismaService } from '../src/prisma.service';

describe('BrandController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const basePath = '/brand';
  const brandCreateData: Partial<Brand> = {
    name: 'Brand1',
  };
  let createdBrand: Brand;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
  });

  it('create (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post(basePath)
      .send(brandCreateData);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('name', brandCreateData.name);
    expect(response.body).toHaveProperty('id');

    createdBrand = response.body as Brand;
  });

  it('list (GET)', async () => {
    const response = await request(app.getHttpServer()).get(basePath);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(1);
    expect(response.body).toContainEqual(createdBrand);
  });

  it('get (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      `${basePath}/${createdBrand.id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(createdBrand);
  });

  it('delete (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      `${basePath}/${createdBrand.id}`,
    );
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await prisma.brand.deleteMany({});
    await app.close();
  });
});
