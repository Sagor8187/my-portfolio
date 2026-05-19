"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: true, wheelMultiplier: 1.5 }}>
      {children}
    </ReactLenis>
  );
}
