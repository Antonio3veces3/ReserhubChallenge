interface CustomLabelProps {
    text: string;
    id: string;
}

const styles = {
    label: "block mb-2.5 text-sm font-medium text-left pl-1"
}
export const CustomLabel = ({ text, id }: CustomLabelProps) => {
    return (
        <label htmlFor={id} className={styles.label}>{text}</label>
    )
}