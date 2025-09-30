export abstract class Entity {
  static generateId() {
    return crypto.randomUUID();
  }

  // throw domain error if validation fails
  abstract validate(): void;
}
