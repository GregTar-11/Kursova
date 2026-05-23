import clsx from "clsx";

interface ErrorMessageProps {
  children?: React.ReactNode;
  className:string
}

export const ErrorMessage = ({ children ,className}: ErrorMessageProps) => (
     <p className={clsx('absolute text-c-error' ,className)}>{children} </p>
  );