export const pickRandomIndex = (size, currentIndex) => {
  if (size <= 1) {
    return currentIndex >= 0 ? currentIndex : 0;
  }

  let nextIndex = currentIndex;

  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * size);
  }

  return nextIndex;
};

export const getValidatedCurrentIndex = (currentIndex, queueSize) => {
  if (currentIndex >= 0 && currentIndex < queueSize) {
    return currentIndex;
  }

  return 0;
};