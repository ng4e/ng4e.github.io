import { useRef, useEffect, useState } from "react";
import { LazyMotion, domAnimation, animate } from "motion/react";
import * as m from "motion/react-m";

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
  isYear?: boolean;
}

export default function Counter({
  value,
  suffix,
  label,
  isYear,
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (isYear || reducedMotion) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });

    return () => controls.stop();
  }, [value, isYear, reducedMotion]);

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref}>
        {isYear ? (
          <m.p
            className="text-4xl md:text-5xl font-semibold text-white mb-2"
            initial={{ opacity: reducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </m.p>
        ) : (
          <p className="text-4xl md:text-5xl font-semibold text-white mb-2">
            {displayValue}
            {suffix}
          </p>
        )}
        <p className="text-sm text-white/70">{label}</p>
      </div>
    </LazyMotion>
  );
}
