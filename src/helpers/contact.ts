/** Serialization helpers */
export function serializeSiteraData<T>(data: T): string {
  return JSON.stringify(data);
}

export function deserializeSiteraData<T>(json: string): T {
  return JSON.parse(json) as T;
}
