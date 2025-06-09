import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

import type { Organisation, Property, Room } from '../lib';

function random(multiplier: number): number {
  return Math.ceil(Math.random() * multiplier);
}

export const organisations = new Array(random(5)).fill(0).map((): Organisation => ({
  _id: new ObjectId(),
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 'auth0',
  name: faker.company.name(),
  domain: faker.internet.domainName(),
  avatar: null,
  properties: [],
}));

export const properties = organisations.reduce((properties, organisation) => {
  const orgProperties = new Array(random(5)).fill(0).map(_ => {
    const property = {
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'auth0',
      name: 'Property' + faker.person.lastName(),
      organisationId: organisation._id,
      address: {
        line_1: '',
        line_2: '',
        line_3: '',
        town: '',
        county: '',
        postcode: '',
        country: '',
        lat: 0,
        lng: 0,
      },
      avatar: '',
      notes: '',
      rooms: [],
    };

    organisation.properties.push(property._id);

    return property;
  });

  properties.push(...orgProperties);

  return properties;
}, [] as Array<Property>);

export const rooms = properties.reduce((rooms, property) => {
  const propertyRooms = new Array(random(15)).fill(0).map(_ => ({
    _id: new ObjectId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'auth0',
    name: 'Room' + faker.animal.petName(),
    organisationId: property.organisationId,
    propertyId: property._id,
    floor: -1,
    items: [],
    tags: [
      faker.helpers.arrayElement([
        'meeting',
        'kitchen',
        'office',
        'lounge',
        'hallway',
      ]),
    ],
  }));

  rooms.push(...propertyRooms);

  return rooms;
}, [] as Array<Room>);
