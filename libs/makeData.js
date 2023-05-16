import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newItems = () => {
  const statusChance = faker.number.int({ max: 100 });
  return {
    quantity: faker.number.int({ max: 100 }),
    price: faker.commerce.price({ min: 100000, max: 10000000, dec: 2 }),
    leadtime: faker.number.int({ max: 100 }),
    quantityb: faker.number.int({ max: 100 }),
    priceb: faker.commerce.price({ min: 100000, max: 10000000, dec: 2 }),
    leadtimeb: faker.number.int({ max: 100 }),
    quantityc: faker.number.int({ max: 100 }),
    pricec: faker.commerce.price({ min: 100000, max: 10000000, dec: 2 }),
    leadtimec: faker.number.int({ max: 100 }),
    itemno: faker.number.int({ max: 100 }),
    stockcode: faker.phone.number("###-###-##"),
    partno: faker.phone.imei(),
    description: faker.commerce.product(),
    result:
      statusChance >= 30
        ? "Lowest Price: Supllier A"
        : statusChance >= 60
        ? "Lowest Price: Supllier B"
        : "Lowest Price: Supllier C",
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        idx: d,
        ...newItems(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
