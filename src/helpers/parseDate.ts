export const parseDate = (date: string) => {
  var parts = date.match(/(\d+)/g);
  // note parts[1]-1

  if (!parts || parts.length < 3) {
    return new Date();
  }
  return new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0])
  );
};
