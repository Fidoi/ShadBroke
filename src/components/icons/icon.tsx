const Icon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    width='200'
    height='200'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect x='2' y='7' width='20' height='10' rx='2' fill='#4CAF50' />
    <path
      d='M7 12C7 10.8954 7.89543 10 9 10H10L9 14H10C11.1046 14 12 14.8954 12 16'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M17 12C17 13.1046 16.1046 14 15 14H14L15 10H14C12.8954 10 12 9.10457 12 8'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M12 7V17'
      stroke='gold'
      strokeWidth='2'
      strokeLinecap='round'
      strokeDasharray='4 2'
    />
  </svg>
);

export default Icon;
