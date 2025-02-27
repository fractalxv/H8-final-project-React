interface LabelProps {
    htmlFor: string;
    children: React.ReactNode;
  }
  
  export default function Label({ htmlFor, children }: LabelProps) {
    return (
      <label htmlFor={htmlFor} className=" mb-2 block">
        {children}
      </label>
    )
  }