import getRandomInt from "./getRandomInt";

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
    takeCount = getRandomInt(count.min, count.max);
  }

  const copy = [...arr];
  const shuffled = copy.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, takeCount);
}
