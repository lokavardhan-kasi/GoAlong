'use client';

import { useEffect, useRef } from 'react';

type CountUpProps = {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export default function CountUp({
  start = 0,
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration * 1000 / frameRate);
  let frame = 0;

  const easeOutExpo = (t: number) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  useEffect(() => {
    const counter = () => {
      frame++;
      const progress = easeOutExpo(frame / totalFrames);
      const current = start + (end - start) * progress;
      
      if (ref.current) {
        ref.current.innerText = `${prefix}${current.toFixed(decimals)}${suffix}`;
      }

      if (frame < totalFrames) {
        requestAnimationFrame(counter);
      }
    };
    
    const timeoutId = setTimeout(() => {
        requestAnimationFrame(counter);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [end, start, duration, decimals, prefix, suffix, totalFrames]);

  return <span ref={ref} className={className} />;
}
