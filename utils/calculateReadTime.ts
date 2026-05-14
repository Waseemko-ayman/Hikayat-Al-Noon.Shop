// It calculates how many minutes the user needs to read the text.
// Text → Count words → Divide by reading speed → Display time in minutes
export const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200; // Assumes reading speed: A human reads approximately 200 words per minute (this is a common standard in applications).
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute); // Rounds up to the nearest whole minute Ex: 350 words → 350 / 200 = 1.75 → becomes 2 minutes
  return `${minutes} min read`;
};
