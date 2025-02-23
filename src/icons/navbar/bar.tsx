
import { IconPropsType } from "..";
export const BarIcon = ({ size = 24, color = '#D9864E'  }: IconPropsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 23 24"
      fill="none"
    >
      <path
        d="M23 23.4H0.199951V12.3C0.199951 5.79997 5.39994 0.599976 11.7999 0.599976H23V23.4ZM1.59995 22H21.5999V1.99997H11.7999C6.19994 1.99997 1.59995 6.59998 1.59995 12.2V22Z"
        fill={color}
      />
      <path
        d="M12.5999 22.6999H11.0999V4.29993H12.5999V22.6999Z"
        fill={color}
      />
      <path
        d="M16.2999 11.5999H14.8999V8.79994C14.8999 8.09994 14.5999 7.39995 14.0999 6.89995L11.8999 4.69995L9.5999 6.89995C9.0999 7.39995 8.8999 8.09994 8.8999 8.79994V11.4999H7.3999V8.79994C7.3999 7.69994 7.8999 6.69995 8.5999 5.89995L11.8999 2.69995L15.0999 5.89995C15.8999 6.69995 16.2999 7.69994 16.2999 8.79994V11.5999Z"
        fill={color}
      />
      <path
        d="M12.6001 19.6H7.90005C5.60005 19.6 3.80005 17.7 3.80005 15.5V10.9H8.50006V12.3H5.20006V15.5C5.20006 17 6.40005 18.2 7.90005 18.2H11.1001V15H12.6001V19.6Z"
        fill={color}
      />
      <path
        d="M15.8999 19.6H11.2V15H12.5999V18.2H15.8999C17.2999 18.2 18.5 17 18.5 15.5V12.3H15.2999V10.9H20V15.5C20 17.7 18.0999 19.6 15.8999 19.6Z"
        fill={color}
      />
      <path
        d="M11.3 16.1L7.30005 12.1L8.40005 11.1L12.3 15.1L11.3 16.1Z"
        fill={color}
      />
      <path
        d="M12.3999 16.0999L11.3999 15.0999L15.2999 11.2L16.2999 12.2L12.3999 16.0999Z"
        fill={color}
      />
      <path
        d="M6.2999 11.2999H4.8999V7.69995H8.49991V9.19995H6.2999V11.2999Z"
        fill={color}
      />
      <path
        d="M18.9001 11.2999H17.5001V9.19995H15.3V7.69995H18.9001V11.2999Z"
        fill={color}
      />
    </svg>
  );
};
