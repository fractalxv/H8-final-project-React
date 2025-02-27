type ButtonProps = {
    label: string;
    className?: string;
    onClick?: () => void;
  }
  
  export default function Button({ onClick, label, className }: ButtonProps) {
    return (
      <button
        className={"bg-teal-600 hover:bg-teal-700 text-white px-4 py-1 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-95" + className}
        onClick={onClick}
      >
        {label}
      </button>
    )
  }