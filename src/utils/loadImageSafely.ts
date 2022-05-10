export default function loadImageSafely(image: string[] | null) {
  if (!image || !image[0]) return 'https://source.unsplash.com/random';

  return image[0];
}
