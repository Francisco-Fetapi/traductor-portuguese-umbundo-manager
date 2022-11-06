export default function sleep(seconds: number) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(null);
    }, seconds * 1000);
  });
}
