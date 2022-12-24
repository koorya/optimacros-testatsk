export const parseSortStr = (sort: string) => {
  const isValid = /^((\+|\-)?(price|name|production_year),?)+$/.test(sort);
  if (!isValid) throw Error("Invalid sort query");
  const matchIter = sort.matchAll(/(\+|\-)?(price|name|production_year),?/g);
  let res = [];
  const parseOrder = (x?: string) =>
    x === "+" ? 1 : x === "-" ? -1 : x == undefined ? 1 : x;
  for (const item of matchIter) {
    res.push(item.slice(1).reverse().map(parseOrder) as [string, 1 | -1]);
  }
  return res;
};
