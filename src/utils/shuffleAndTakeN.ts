import { faker } from "@faker-js/faker";

// Ensure the correct type definition for faker.helpers.shuffle
const shuffle: <T>(arr: T[]) => T[] = faker.helpers.shuffle;

export default function shuffleAndTakeN<T>(
  arr: T[],
  count: number | { min: number; max: number }
): T[] {
  if (typeof count === "number" && count > arr.length) {
    throw new Error(
      "Bad call to shuffleAndTakeN: param 'count' cannot be larger than arr.length"
    );
  }

  if (typeof count === "object") {
    if (count.min < 0) {
      throw new Error(
        "Bad call to shuffleAndTakeN: param 'count.min' cannot be less than 0"
      );
    } else if (count.max > arr.length) {
      throw new Error(
        "Bad call to shuffleAndTakeN: param 'count.max' cannot be larger than arr.length"
      );
    } else if (count.min > count.max) {
      throw new Error(
        "Bad call to shuffleAndTakeN: param 'count.min' cannot be larger than 'count.max'"
      );
    }
  }

  let takeCount;
  if (typeof count === "number") {
    takeCount = count;
  } else {
    takeCount = faker.number.int({ min: count.min, max: count.max });
  }

  const shuffled = shuffle(arr);
  return shuffled.slice(0, takeCount);
}
