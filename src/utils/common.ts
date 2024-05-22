export const locate = (url: string) => {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
};

export const getStatus = (error: any): number => {
  const {
    response: { status },
  } = error;

  return status;
};
