export const arrayWithNoDuplicates = (arr) => {
  const myArrayWithNoDuplicates = arr.reduce(function (accumulator, element) {
    if (accumulator.indexOf(element) === -1) {
      accumulator.push(element);
    }
    return accumulator;
  }, []);
  return myArrayWithNoDuplicates;
};
