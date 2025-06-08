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
  lat: z.number(),
  lng: z.number(),
});

export const ListItemSchema = z.object({
  itemId: Reference,
  quantity: z.number(),
});

export const DocumentSchema = z.object({
  _id: Reference,
  createdAt: z.instanceof(Date),
  updatedAt: z.instanceof(Date),
});

export const OrganisationDocumentSchema = DocumentSchema.extend({
  createdBy: Reference,
  name: z.string().min(2),
  domain: z.string().min(2),
  avatar: z.string().min(2),
  properties: z.array(Reference),
});

export const PropertyDocumentSchema = DocumentSchema.extend({
  createdBy: Reference,
  address: AddressSchema,
  name: z.string(),
  avatar: z.string(),
  notes: z.string(),
  rooms: z.array(Reference),
});

export const RoomDocumentSchema = DocumentSchema.extend({
  name: z.string(),
  propertyId: Reference,
  floor: z.number(),
  items: z.array(ListItemSchema),
  tags: TagsArraySchema,
});

export const ItemDocumentSchema = DocumentSchema.extend({
  title: z.string().min(2),
  createdBy: Reference,
  weight: z.number(),
  width: z.number(),
  depth: z.number(),
  height: z.number(),
  carbon: z.number(),
  privateNotes: z.string(),
  productDescription: z.string(),
  floor: z.number(),
  tags: TagsArraySchema,
});
