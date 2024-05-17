import dbClient from '../utils/db';

const waitConnection = () => new Promise((resolve, reject) => {
  let j = 0;
  const repF = async () => {
    await setTimeout(() => {
      j += 1;
      if (j >= 10) {
        reject();
      } else if (!dbClient.isAlive()) {
        repF();
      } else {
        resolve();
      }
    }, 1000);
  };
  repF();
});

(async () => {
  console.log(dbClient.isAlive());
  await waitConnection();
  console.log(dbClient.isAlive());
  console.log(await dbClient.nbUsers());
  console.log(await dbClient.nbFiles());
})();
