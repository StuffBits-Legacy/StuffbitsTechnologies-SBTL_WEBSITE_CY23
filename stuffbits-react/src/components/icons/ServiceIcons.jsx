function StrokeIcon({ size = 24, strokeWidth = 1.5, className, children, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  )
}

/** PCB with IC and traces — embedded hardware / electronics design. */
export function EmbeddedHardwareIcon(props) {
  return (
    <StrokeIcon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
      <path d="M10.5 8V3.5M13.5 8V3.5M10.5 16v4.5M13.5 16v4.5" />
      <path d="M8 10.5H3.5M8 13.5H3.5M16 10.5h4.5M16 13.5h4.5" />
      <circle cx="10" cy="10" r="0.7" fill="currentColor" stroke="none" />
    </StrokeIcon>
  )
}

/** Microcontroller with firmware code lines. */
export function EmbeddedFirmwareIcon(props) {
  return (
    <StrokeIcon {...props}>
      <rect x="7" y="6" width="10" height="12" rx="1.25" />
      <path d="M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3" />
      <path d="M10 10h4.2M10 12.5h2.6M10 15h4.2" />
    </StrokeIcon>
  )
}

/** Assembled board with quality check — electronics production. */
export function ProductionIcon(props) {
  return (
    <StrokeIcon {...props}>
      <rect x="2.5" y="3.5" width="12.5" height="17" rx="1.5" />
      <rect x="5" y="7.5" width="7.5" height="4.5" rx="0.6" />
      <path d="M6.2 15.8h1.2M8.7 15.8h1.2M11.2 15.8h1.2" />
      <circle cx="17.5" cy="16" r="4" />
      <path d="M15.7 16.1l1.35 1.35 2.7-2.9" />
    </StrokeIcon>
  )
}

/** Application window with code — software development. */
export function SoftwareDevelopmentIcon(props) {
  return (
    <StrokeIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18" />
      <circle cx="6.2" cy="6.25" r="0.65" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="6.25" r="0.65" fill="currentColor" stroke="none" />
      <circle cx="10.8" cy="6.25" r="0.65" fill="currentColor" stroke="none" />
      <path d="M8.2 12.2 6.5 14.2 8.2 16.2" />
      <path d="M15.8 12.2 17.5 14.2 15.8 16.2" />
      <path d="M12.6 11.8 11.4 16.6" />
    </StrokeIcon>
  )
}

/** Side-profile vehicle — automotive vertical. */
export function AutomotiveIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M3.5 13.5 5.4 8.2A1.8 1.8 0 0 1 7.1 7h9.8a1.8 1.8 0 0 1 1.7 1.2l1.9 5.3" />
      <path d="M3 13.5h18v2.8a1.2 1.2 0 0 1-1.2 1.2H19" />
      <circle cx="7.2" cy="17.4" r="1.85" />
      <circle cx="16.8" cy="17.4" r="1.85" />
      <path d="M9 7.2 10 11h4.1l1-3.8" />
    </StrokeIcon>
  )
}

/** Plant silhouette — industrial vertical. */
export function IndustrialIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M3.5 20.5V11l4.5-2.5V20.5" />
      <path d="M8 20.5V8l7-3.5V20.5" />
      <path d="M17.5 20.5V5.5h3V20.5" />
      <path d="M5.2 14h1.4M5.2 16.6h1.4M10.4 11.2h1.6M10.4 14h1.6M10.4 16.6h1.6" />
    </StrokeIcon>
  )
}

/** Connected device mesh — IIoT vertical. */
export function IiotIcon(props) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="6.2" r="2.15" />
      <circle cx="5.8" cy="17.4" r="2.15" />
      <circle cx="18.2" cy="17.4" r="2.15" />
      <path d="M10.4 7.8 7.3 15.5M13.6 7.8l3.1 7.7M8 17.4h8.1" />
    </StrokeIcon>
  )
}

export const SERVICE_ICONS = {
  'embedded-hardware': EmbeddedHardwareIcon,
  'embedded-firmware': EmbeddedFirmwareIcon,
  'component-assembly': ProductionIcon,
  'it-development': SoftwareDevelopmentIcon,
}

export const VERTICAL_ICONS = {
  automotive: AutomotiveIcon,
  industrial: IndustrialIcon,
  iot: IiotIcon,
  'digital-services': SoftwareDevelopmentIcon,
}
