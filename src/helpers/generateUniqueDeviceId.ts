import { customAlphabet } from "nanoid";

// Base58 without ambiguius characters (0, O, I, l)
const nanoid = customAlphabet(
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
);

export function generateUniqueDeviceId() {
  return "device_" + nanoid(16);
}
