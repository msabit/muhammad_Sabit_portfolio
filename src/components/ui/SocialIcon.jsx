export default function SocialIcon({ path, className = "h-[18px] w-[18px]" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
