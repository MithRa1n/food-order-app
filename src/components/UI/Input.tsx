interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
}


export default function Input({label, id, ...props} :InputProps) {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input name={id} id={id} required {...props} />
        </p>
    )
}