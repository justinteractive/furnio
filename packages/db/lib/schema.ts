import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const Reference = z.instanceof(ObjectId);

export const TagSchema = z.string().min(2);

export const TagsArraySchema = z.array(TagSchema);

export const AddressSchema = z.object({
  line_1: z.string(),
  line_2: z.string(),
  line_3: z.string(),
  town: z.string(),
  county: z.string(),
  postcode: z.string(),
  country: z.string(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const ListItemSchema = z.object({
  itemId: Reference,
  quantity: z.number().min(1),
});

export const DocumentSchema = z.object({
  _id: Reference,
  createdAt: z.instanceof(Date),
  updatedAt: z.instanceof(Date),
  createdBy: z.string().or(Reference),
});

export const OrganisationDocumentSchema = DocumentSchema.extend({
  name: z.string().min(2),
  domain: z.string().min(2),
  avatar: z.string().min(2).nullable(),
  properties: z.array(Reference),
});

export const PropertyDocumentSchema = DocumentSchema.extend({
  name: z.string(),
  organisationId: Reference,
  address: AddressSchema,
  avatar: z.string(),
  notes: z.string(),
  rooms: z.array(Reference),
});

export const RoomDocumentSchema = DocumentSchema.extend({
  name: z.string(),
  organisationId: Reference,
  propertyId: Reference,
  floor: z.number().min(-1), // -1 meaning it's not assigned to a floor
  items: z.array(ListItemSchema),
  tags: TagsArraySchema,
});

export const ItemDocumentSchema = DocumentSchema.extend({
  title: z.string().min(2),
  organisationId: Reference,
  weight: z.number().min(0),
  width: z.number().min(0),
  depth: z.number().min(0),
  height: z.number().min(0),
  carbon: z.number().min(0),
  privateNotes: z.string(),
  productDescription: z.string(),
  floor: z.number().min(-1), // -1 meaning it's not assigned to a floor
  tags: TagsArraySchema,
});
