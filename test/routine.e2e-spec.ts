import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Brand, DayPart, Product } from '@prisma/client';
import { PrismaService } from '../src/prisma.service';
import { BrandService } from '../src/brand/brand.service';
import { ProductService } from '../src/product/product.service';
import { RoutineDto } from '../src/routine/dto';

describe('RoutineController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let brandService: BrandService;
  let productService: ProductService;

  let morning: DayPart;
  let evening: DayPart;
  let brandFixture: Brand;
  let dayParts: DayPart[];

  let morningProduct: Product;
  let morningAndEveningProduct: Product;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
    brandService = app.get(BrandService);
    productService = app.get(ProductService);

    brandFixture = await brandService.createBrand({
      name: 'test brand',
    });

    dayParts = await prisma.dayPart.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    [morning, , evening] = dayParts;

    morningProduct = await productService.createProduct({
      name: 'morning product',
      dayParts: [morning],
      brand: brandFixture,
    });

    morningAndEveningProduct = await productService.createProduct({
      name: 'morning and evening product',
      dayParts: [morning, evening],
    });
  });

  it('routine (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/routine');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(2);

    const body = response.body as RoutineDto[];

    expect(body[0]).toHaveProperty('id', morning.id);
    expect(body[0]).toHaveProperty('alias', morning.alias);
    expect(body[0]).toHaveProperty('products');
    expect(Array.isArray(body[0].products)).toBeTruthy();
    expect(body[0].products).toHaveLength(2);
    expect(body[0].products[0]).toHaveProperty('id', morningProduct.id);
    expect(body[0].products[0]).toHaveProperty('name', morningProduct.name);
    expect(body[0].products[0]).toHaveProperty('brand', {
      ...brandFixture,
      createdAt: brandFixture.createdAt.toISOString(),
      updatedAt: brandFixture.updatedAt.toISOString(),
    });
    expect(body[0].products[1]).toHaveProperty(
      'id',
      morningAndEveningProduct.id,
    );
    expect(body[0].products[1]).toHaveProperty(
      'name',
      morningAndEveningProduct.name,
    );

    expect(body[1]).toHaveProperty('id', evening.id);
    expect(body[1]).toHaveProperty('alias', evening.alias);
    expect(body[1]).toHaveProperty('products');
    expect(Array.isArray(body[0].products)).toBeTruthy();
    expect(body[1].products).toHaveLength(1);
    expect(body[1].products[0]).toHaveProperty(
      'id',
      morningAndEveningProduct.id,
    );
    expect(body[1].products[0]).toHaveProperty(
      'name',
      morningAndEveningProduct.name,
    );
  });

  it('day-parts (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/day-parts');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(dayParts.length);
    expect(response.body).toEqual(
      expect.arrayContaining(
        dayParts.map((dayPart) => ({
          ...dayPart,
          createdAt: dayPart.createdAt.toISOString(),
          updatedAt: dayPart.updatedAt.toISOString(),
        })),
      ),
    );
  });

  afterAll(async () => {
    await prisma.product.deleteMany({});
    await prisma.brand.deleteMany({});
    await app.close();
  });
});
