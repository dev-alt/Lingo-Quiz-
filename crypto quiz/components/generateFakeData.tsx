import { faker } from '@faker-js/faker';

const generateFakeProduct = () => {
    return {
        id: faker.datatype.number(),
        title: faker.commerce.productName(),
        imageUrl: faker.image.image(),
        description: faker.lorem.paragraph(),
        price: faker.datatype.number({ min: 10, max: 1000 }), 
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
