export default <T>(actions: T, namespace: string): T => {
  const result = { ...actions };
  Object.keys(actions).forEach((key) => {
    result[key] = `${namespace}/${actions[key]}`;
  });
  return result;
};
