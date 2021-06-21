export const checkEmptyObject = (target): boolean => {
  if (!target) return false;
  if (!Object.keys(target).length) return false;
  return true;
};
