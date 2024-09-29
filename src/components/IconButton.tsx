import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonProps = {
  icon: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
function IconButton({ icon, className, ...props }: IconButtonProps) {
  return (
    <button
      className={classNames(
        'inline-flex items-center justify-center rounded-full transition-colors duration-150 bg-turquoise-500 focus:shadow-outline hover:bg-turquoise-600 text-turquoise-50',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

export default IconButton;
