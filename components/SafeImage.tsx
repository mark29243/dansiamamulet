'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export default function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      {...props}
      unoptimized={failed || props.unoptimized}
      onError={(e) => {
        if (!failed) {
          console.warn(`[SafeImage] Image failed to load via optimization, falling back to direct URL:`, props.src);
          setFailed(true);
        }
        if (props.onError) props.onError(e);
      }}
    />
  );
}
