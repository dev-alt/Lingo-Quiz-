import { faker } from '@faker-js/faker';

const generateFakeProduct = () => {
    return {
        id: faker.number.int(),
        title: faker.commerce.productName(),
        imageUrl: faker.image.url(),
        description: faker.lorem.paragraph(),
        price: faker.number.int({ min: 10, max: 1000 }),
    };
};

const generateFakeProducts = (count: number) => {
    const products = [];
    for (let i = 0; i < count; i++) {
        products.push(generateFakeProduct());
    }
    return products;
};

export default generateFakeProducts;
