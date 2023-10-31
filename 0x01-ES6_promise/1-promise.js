export default function getFullResponseFromAPI(success) {
  return new Promise((resolve, reject) => {
    if (success) {
      const successTruthy = {
        status: 200,
        body: 'Success'
      };
      resolve(successTruthy);
    } else {
      const successFalsy = 'The fake API is not working currently';
      reject(new Error(successFalsy));
    }
  });
}
