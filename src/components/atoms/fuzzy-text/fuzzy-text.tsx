'use client';

import React, { useEffect, useRef } from 'react';

export interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
}

export const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = 'oklch(var(--foreground))',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
}) => {
  const canvasRef = useRef<
    HTMLCanvasElement & { cleanupFuzzyText?: () => void }
  >(null);

  useEffect(() => {
    let animationFrameId: number;
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      const computedFontFamily =
        fontFamily === 'inherit'
          ? globalThis.getComputedStyle(canvas).fontFamily || 'sans-serif'
          : fontFamily;

      const fontSizeString =
        typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      let numericFontSize: number;
      if (typeof fontSize === 'number') {
        numericFontSize = fontSize;
      } else {
        const temporary = document.createElement('span');
        temporary.style.fontSize = fontSize;
        document.body.append(temporary);
        const computedSize = globalThis.getComputedStyle(temporary).fontSize;
        numericFontSize = Number.parseFloat(computedSize);
        temporary.remove();
      }

      const text = React.Children.toArray(children).join('');

      const offscreen = document.createElement('canvas');
      const offContext = offscreen.getContext('2d');
      if (!offContext) return;

      offContext.font = `${fontWeight} ${fontSizeString} ${computedFontFamily}`;
      offContext.textBaseline = 'alphabetic';
      const metrics = offContext.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent =
        metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offContext.font = `${fontWeight} ${fontSizeString} ${computedFontFamily}`;
      offContext.textBaseline = 'alphabetic';
      offContext.fillStyle = color;
      offContext.fillText(text, xOffset - actualLeft, actualAscent);

      const horizontalMargin = 50;
      const verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      context.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      const fuzzRange = 30;

      const run = () => {
        if (isCancelled) return;
        context.clearRect(
          -fuzzRange,
          -fuzzRange,
          offscreenWidth + 2 * fuzzRange,
          tightHeight + 2 * fuzzRange,
        );
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let index = 0; index < tightHeight; index++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          context.drawImage(
            offscreen,
            0,
            index,
            offscreenWidth,
            1,
            dx,
            index,
            offscreenWidth,
            1,
          );
        }
        animationFrameId = globalThis.requestAnimationFrame(run);
      };

      run();

      const isInsideTextArea = (x: number, y: number) =>
        x >= interactiveLeft &&
        x <= interactiveRight &&
        y >= interactiveTop &&
        y <= interactiveBottom;

      const handleMouseMove = (event: MouseEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      const handleTouchMove = (event: TouchEvent) => {
        if (!enableHover) return;
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleTouchEnd = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, {
          passive: false,
        });
        canvas.addEventListener('touchend', handleTouchEnd);
      }

      const cleanup = () => {
        globalThis.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
        }
      };

      canvas.cleanupFuzzyText = cleanup;
    };

    init();

    return () => {
      isCancelled = true;
      globalThis.cancelAnimationFrame(animationFrameId);
      if (canvas && canvas.cleanupFuzzyText) {
        canvas.cleanupFuzzyText();
      }
    };
  }, [
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity,
  ]);

  return <canvas ref={canvasRef} />;
};

export default FuzzyText;
