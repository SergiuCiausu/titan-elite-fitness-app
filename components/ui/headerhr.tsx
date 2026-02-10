export function HeaderHr({ color, size }: { color?: string, size?: string }) {

    const sizeClasses: {[key: string]: string} = {
        sm: "w-8 md:w-16 border-b-[2px] md:border-b-[3px]",
        md: "w-16 md:w-24 border-b-[3px] md:border-b-[5px]",
    };

    const colorClass = `hsl(var(--${color}))`;
    
    return (
        <hr 
            className={`${size ? sizeClasses[size] : "w-16 md:w-24 border-b-[3px] md:border-b-[5px]"}  ${!color && "border-accent"} rounded-2xl`} 
            style={ color ? { borderColor: `${colorClass}` } : {}}    
        />
    )
}