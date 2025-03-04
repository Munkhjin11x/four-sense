import { IconPropsType } from "..";

export const HamburgerIcon = ({
  width = 24,
  height = 24,
  color = "#D9864E",
}: IconPropsType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.957275 6.83672H17.5314M0.957275 1.31201H17.5314M0.957275 12.3614H17.5314"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
