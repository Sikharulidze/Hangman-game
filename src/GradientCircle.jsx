import React from "react";

function GradientCircle({ size = 160, children, onClick, className }) {
  const radius = size / 2;

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          {/* Main gradient background */}
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FE71FE" />
            <stop offset="100%" stopColor="#7199FF" />
          </linearGradient>

          {/* Black outer drop shadow */}
          <filter id="outerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor="black"
              floodOpacity="0.5"
            />
          </filter>

          {/* Inner purple blur */}
          <filter
            id="innerShadowPurple"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="0" dy="4" />
            <feComposite in2="SourceAlpha" operator="in" result="innerShadow" />
            <feFlood floodColor="#9D2DF5" result="color" />
            <feComposite
              in="color"
              in2="innerShadow"
              operator="in"
              result="final"
            />
            <feComposite in="SourceGraphic" in2="final" operator="over" />
          </filter>
        </defs>

        {/* Main circle with outer shadow */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - 1.5}
          fill="url(#grad1)"
          stroke="black"
          strokeWidth="2"
          filter="url(#outerShadow)"
        />

        {/* Inner bottom purple shadow effect (half-circle blurred mask) */}
        <path
          d={`
            M ${radius - radius * 0.9} ${radius}
            A ${radius * 0.9} ${radius * 0.9} 0 0 1 ${
            radius + radius * 0.9
          } ${radius}
            A ${radius * 0.9} ${radius * 0.9} 0 0 0 ${
            radius - radius * 0.9
          } ${radius}
          `}
          fill="#9D2DF5"
          opacity="0.25"
          filter="url(#innerShadowPurple)"
        />
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default GradientCircle;
