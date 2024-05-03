export const locate = (url: string) => {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
};
