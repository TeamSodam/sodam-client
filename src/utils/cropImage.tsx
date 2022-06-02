type CropImage = (url: string, aspectRatio?: number) => Promise<HTMLCanvasElement>;

const cropImage: CropImage = async (url, aspectRatio = 1) =>
  new Promise((resolve) => {
    const inputImage = new Image();

    inputImage.onload = () => {
      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;

      const inputImageAspectRatio = inputWidth / inputHeight;

      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (inputImageAspectRatio > aspectRatio) {
        outputWidth = inputHeight * aspectRatio;
      } else if (inputImageAspectRatio < aspectRatio) {
        outputHeight = inputWidth / aspectRatio;
      }

      const outputX = (outputWidth - inputWidth) * 0.5;
      const outputY = (outputHeight - inputHeight) * 0.5;

      const outputImage = document.createElement('canvas');

      outputImage.width = outputWidth;
      outputImage.height = outputHeight;

      const ctx = outputImage.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(inputImage, outputX, outputY);
      resolve(outputImage);
    };

    inputImage.src = url;
  });

export default cropImage;
