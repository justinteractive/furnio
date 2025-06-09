import { z } from 'zod';

import * as schema from './schema';

export type Document = z.infer<typeof schema.DocumentSchema>;
export type Tag = z.infer<typeof schema.TagSchema>;
export type TagsArray = z.infer<typeof schema.TagsArraySchema>;
export type Address = z.infer<typeof schema.AddressSchema>;
export type ListItem = z.infer<typeof schema.ListItemSchema>;
export type Organisation = z.infer<typeof schema.OrganisationDocumentSchema>;
export type Property = z.infer<typeof schema.PropertyDocumentSchema>;
export type Room = z.infer<typeof schema.RoomDocumentSchema>;
export type Item = z.infer<typeof schema.ItemDocumentSchema>;

export enum MongoCollections {
  Organisations = 'organisations',
  Properties = 'properties',
  Rooms = 'rooms',
  Items = 'items',
}

// export interface Asset extends MongoObject {
//   itemId: string;
//   floorId: string;
//   roomId: string;
//   propertyId: string;
//   createdBy: string;
// }

// export interface floor {
//     "id": "unique_id",
//     "name": "any name",
//     "sequence": "integer to order a list of floors as they are not always numerical and logical",
//     "date_added": "date",
//     "last_updated": "date",
//     "created_by": "user_id foreign key"
// };
// export interface photo {
//     "id": "unique_id",
//     "url": "link to photo",
//     "item_id": "if it is a photo of an item - can be many photos of one item",
//     "asset_id": "if it is a photo of an asset - can be many photos of one asset",
//     "order_id": "if it is a photo of an order collected or delivered - can be many photos of one order",
//     "room_id": "if it is a photo of a room - can be many photos of one room",
//     "catalogue_item_id": "if the photo or image is a catalogue item",
//     "caption": "not required but user can add a label to a photo",
//     "date_added": "date",
//     "last_updated": "date",
//     "created_by": "user_id foreign key"
// };
// export interface tag {
//     "id": "unique_id",
//     "tag_name": "label of the tag",
//     "suggested_tags": "tag_ids of similar tags which you might want to suggest with this tag. If i tag chair then maybe suggest Task Chair or Meeting Chair",
//     "parent_tag": "enables a tag to belong to a parent tag, like a category that does not have to be enforced",
//     "date_added": "date",
//     "last_updated": "date",
//     "created_by": "user_id foreign key"
// };
// export interface list {
//     "id": "unique_id",
//     "title": "a name for the list",
//     "description": "maybe the user wants to say a lot more but this might not be required",
//     "date_added": "date",
//     "last_updated": "date",
//     "created_by": "user_id foreign key"
// };
// export interface list_item {
//     "list_item_id": "unique_id",
//     "list_id": "foregin key",
//     "item_id": "foregin_ley",
//     "quantity": "how many of this item do we want in this list",
//     "date_added": "date",
//     "last_updated": "date",
//     "created_by": "user_id foreign key"
// };
// export interface order {
//     "order_id": "unique_id",
//     "list_id": "foregin key id of the list what has the items for this order - could be like a shopping cart",
//     "order_status": "some kind of ID says incomplete, booked, completed, in transit but not clearly defined yet",
//     "date_added": "date",
//     "last_updated": "date",
//     "created_by": "user_id foreign key"
// };
// export interface move {
//     "move_id": "unique_id",
//     "order_id": "foregin key but shoudl this be a list id and do we need the order object?",
//     "move_date": "date the move should happen",
//     "from": "property_id where the move starts",
//     "to": "property_id of where the move goes to",
//     "contact" : {
//         "contacts": "list of user_ids so we can show more than one contact person for the job"
//     },
//     "notes": "notes text blob"
// };
// export interface catalogue {
//     "id": "unique_id",
//     "org_id": "foreign key for an org",
//     "property_id": "could be null but could be used if an org wants to use a catalogue for one or more specific properties",
//     "date_added": "date",
//     "last_updated": "date",
//     "created_by": "user_id foreign key"
// };
// export interface catalogue_item {
//     "id": "unique_id",
//     "catalogue_id": "foreign key",
//     "title": "name of the item",
//     "link": "link to a pdf or other document that might be the source of the catalogue",
//     "tags": {
//         "tag_id": "123,98,378,90,46,876,31"
//     },
//     "date_added": "date",
//     "last_updated": "date",
//     "created_by": "user_id foreign key"
// };
// export interface events {
//     "id": "unique_id",
//     "description": "not sure how we structure events that can be stored in one object for mongoDB that can be recorded against items, propertie,s users, assets, photos, lists - absolutely everything",
//     "timestamp": "date",
//     "user_id": "user_id who committed them event"
// }
