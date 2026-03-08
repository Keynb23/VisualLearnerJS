import { useEffect, useRef, useState } from "react";
import "./bgstyles.css";

// ─── Image Registry ───────────────────────────────────────────────────────────
// To add a new background image: import it here and add it to BACKGROUND_IMAGES.
// Vite resolves these imports to hashed asset URLs at build time.
import img0 from "../../../assets/defaultBG.jpg";
import img1 from "../../../assets/blackBalls.jpg";
import img2 from "../../../assets/darkcubes.jpg";
import img3 from "../../../assets/redFish.jpg";
import img4 from "../../../assets/squirel.jpg";
import img5 from "../../../assets/whiteCircles.jpg";

const BACKGROUND_IMAGES: string[] = [img0, img1, img2, img3, img4, img5];

/** Time each image is visible before crossfading to the next, in milliseconds */
const CYCLE_INTERVAL_MS = 5000;

/** Duration of the crossfade transition between images, in milliseconds */
const FADE_DURATION_MS = 1200;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GifMaskBackground — displays a full-screen background that cycles through
 * multiple images with a smooth crossfade. The inkMask.gif is applied as a
 * CSS mask on the outer container, creating the animated ink-reveal effect.
 *
 * Architecture: double-buffer pattern — two absolutely-positioned layers swap
 * roles each cycle so there is never a flash or blank frame between images.
 */
export function GifMaskBackground() {
  // Index of the image currently fully visible
  const [currentIndex, setCurrentIndex] = useState(0);
  // Index of the image fading in
  const [nextIndex, setNextIndex] = useState(1);
  // Whether a crossfade is actively in progress
  const [isFading, setIsFading] = useState(false);

  // Refs hold timers so cleanup doesn't depend on stale state
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const cycleIntervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    /** Kick off a crossfade: advance next index, trigger opacity transition */
    const triggerFade = () => {
      setNextIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
      setIsFading(true);

      // After the CSS transition completes, finalize the swap and reset fading flag
      fadeTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
        setIsFading(false);
      }, FADE_DURATION_MS);
    };

    // Start the image cycling interval
    cycleIntervalRef.current = setInterval(triggerFade, CYCLE_INTERVAL_MS);

    return () => {
      clearInterval(cycleIntervalRef.current);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, []); // Stable — indexes update via state callbacks, no deps needed

  return (
    // Outer wrapper receives the CSS ink mask defined in bgstyles.css
    <div className="GifMaskBackground fixed inset-0 w-full h-full -z-50 pointer-events-none">

      {/* Layer A — currently visible image, fades out when isFading is true */}
      <div
        className="GifMaskLayerA absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGES[currentIndex]})`,
          opacity: isFading ? 0 : 1,
          transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
        }}
      />

      {/* Layer B — incoming image, fades in when isFading is true */}
      <div
        className="GifMaskLayerB absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGES[nextIndex]})`,
          opacity: isFading ? 1 : 0,
          transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
        }}
      />
    </div>
  );
}
