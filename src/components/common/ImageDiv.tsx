import Image, { ImageProps } from 'next/image';
import React from 'react';

function ImageDiv(props: ImageProps) {
  const { alt = '', className, ...rest } = props;

  return (
    <div className={className}>
      <Image {...rest} alt={alt} />
    </div>
  );
}

export default ImageDiv;
