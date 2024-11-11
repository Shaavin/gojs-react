/**
 * Heavy inspiration from https://stackoverflow.com/a/1527820
 */
export default function getRandomInt(min: number, max: number): number {
  if (min > max) {
    throw new Error(
      "Bad call to getRandomInt: param 'min' cannot be larger than param 'max'"
    );
  }

  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}
