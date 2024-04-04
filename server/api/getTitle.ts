async function sleep() {
  await new Promise((resolve) => {
    setTimeout(resolve, 450);
  });
}
export default defineEventHandler(async () => {
  await sleep();
  return `${Math.random()}`;
});
