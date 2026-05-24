export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const img = new Image();

    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const dimensions = { width: img.width, height: img.height };
      URL.revokeObjectURL(objectUrl);
      resolve(dimensions);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('validation.IMAGE_INVALID'));
    };

    img.src = objectUrl;
  });
