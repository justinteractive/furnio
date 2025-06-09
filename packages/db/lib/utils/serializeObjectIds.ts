import { ObjectId, SerializeObjectIds } from '../types';

export function serializeObjectIds<T>(input: T): SerializeObjectIds<T> {
  if (input === null || input === undefined) {
    return input as SerializeObjectIds<T>;
  }

  if (input instanceof ObjectId) {
    return input.toHexString() as SerializeObjectIds<T>;
  }

  if (Array.isArray(input)) {
    return input.map(item => serializeObjectIds(item)) as SerializeObjectIds<T>;
  }

  if (typeof input === "object") {
    const output: any = {};
    for (const [key, value] of Object.entries(input)) {
      output[key] = serializeObjectIds(value);
    }
    return output;
  }

  return input as SerializeObjectIds<T>;
}