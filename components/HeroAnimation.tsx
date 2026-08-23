"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function HeroAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.set(".hero-line", {
        opacity: 1,
      });

      tl.from(".hero-eyebrow", {
        y: 15,
        opacity: 0,
        duration: 0.7,
      });

      tl.from(
        ".hero-line",
        {
          yPercent: 120,
          duration: 1.1,
          stagger: 0.12,
        },
        "-=0.3"
      );

      tl.from(
        ".hero-bottom",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.45"
      );
    });

    return () => ctx.revert();
  }, []);

  return null;
}