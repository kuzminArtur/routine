import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Brand, DayPart, Product } from '@prisma/client';
import { PrismaService } from '../src/prisma.service';
import { BrandService } from '../src/brand/brand.service';
import { ProductCreateDto, ProductDto } from '../src/product/dto';

describe('ProductController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let brandService: BrandService;

  const basePath = '/product';
  let createdProduct: Product;
  let brandFixture: Brand;
  let dayParts: Pick<DayPart, 'id' | 'alias'>[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
    brandService = app.get(BrandService);

    brandFixture = await brandService.createBrand({
      name: 'test brand',
    });

    dayParts = await prisma.dayPart.findMany({
      select: {
        id: true,
        alias: true,
        order: true,
      },
    });
  });

  it('create (POST)', async () => {
    const productCreateData: ProductCreateDto = {
      name: 'Product1',
      note: 'Some note',
      brand: { id: brandFixture.id },
      dayParts,
    };

    const response = await request(app.getHttpServer())
      .post(basePath)
      .send(productCreateData);

    expect(response.status).toBe(201);
    const body = response.body as ProductDto;
    expect(body).toBeDefined();
    expect(body).toHaveProperty('name', productCreateData.name);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('note', productCreateData.note);
    expect(body).toHaveProperty('brand', {
      id: brandFixture.id,
      name: brandFixture.name,
    });
    expect(body).toHaveProperty('dayParts');
    expect(Array.isArray(body.dayParts)).toBeTruthy();
    expect(body.dayParts).toEqual(expect.arrayContaining(dayParts));
    createdProduct = response.body as Product;
  });

  it('list (GET)', async () => {
    const response = await request(app.getHttpServer()).get(basePath);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(1);
    expect(response.body).toContainEqual(createdProduct);

    const body = (response.body as ProductDto[])[0];
    expect(body).toHaveProperty('name', createdProduct.name);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('note', createdProduct.note);
    expect(body).toHaveProperty('brand', {
      id: brandFixture.id,
      name: brandFixture.name,
    });
    expect(body).toHaveProperty('dayParts');
    expect(Array.isArray(body.dayParts)).toBeTruthy();
    expect(body.dayParts).toEqual(expect.arrayContaining(dayParts));
  });

  it('get (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      `${basePath}/${createdProduct.id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(createdProduct);
    const body = response.body as ProductDto;
    expect(body).toHaveProperty('name', createdProduct.name);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('note', createdProduct.note);
    expect(body).toHaveProperty('brand', {
      id: brandFixture.id,
      name: brandFixture.name,
    });
    expect(body).toHaveProperty('dayParts');
    expect(Array.isArray(body.dayParts)).toBeTruthy();
    expect(body.dayParts).toEqual(expect.arrayContaining(dayParts));
  });

  it('delete (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      `${basePath}/${createdProduct.id}`,
    );
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await prisma.product.deleteMany({});
    await prisma.brand.deleteMany({});
    await app.close();
  });
});
