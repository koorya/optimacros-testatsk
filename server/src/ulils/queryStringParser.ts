export const parseSortStr = (sort: string) => {
  const matchIter = sort.matchAll(/(\+|\-)?(price|name|year),?/g);
  let res = [];
  const parseOrder = (x?: string) =>
    x === "+" ? 1 : x === "-" ? -1 : x == undefined ? 1 : x;
  for (const item of matchIter) {
    res.push(item.slice(1).reverse().map(parseOrder));
  }
  return res;
};
