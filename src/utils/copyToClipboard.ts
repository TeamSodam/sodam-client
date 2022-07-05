export const copyToClipboard = async (
  text: string,
  onSuccess?: () => unknown,
  onError?: (err: Error) => unknown,
) => {
  if ('clipboard' in navigator) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        onSuccess && onSuccess();
      })
      .catch((err) => {
        onError && onError(err);
      });
  }
};
