import { IconPropsType } from "..";

export const TriangleIcon = ({
  size = 24,
  color = "#D9864E",
}: IconPropsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
    >
      <path d="M10.5 22.2998V11.2998H12V22.2998H10.5Z" fill={color} />
      <path
        d="M11.3 12.3002C11.1 12.3002 10.9 12.2335 10.7 12.1002L0.199951 1.2002L1.19995 0.200195L11.3 10.6002L21.5999 0.200195L22.7 1.2002L11.8 12.1002C11.6666 12.2335 11.5 12.3002 11.3 12.3002Z"
        fill={color}
      />
      <path
        d="M0 22.9V0H22.8V11.4C22.8 17.7 17.7 22.9 11.4 22.9H0ZM11.4 21.4C16.9 21.4 21.4 16.9 21.4 11.4V1.5H1.5V21.4H11.4Z"
        fill={color}
      />
    </svg>
  );
};
