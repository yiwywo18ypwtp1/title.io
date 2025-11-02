type TooltipProps = {
    text: string;
    children: React.ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
    return (
        <div className="relative group inline-block">
            {children}
            <div
                className="invisible opacity-0 group-hover:visible group-hover:opacity-50 absolute left-1/2 -translate-x-1/2 -top-9
                bg-black text-white text-sm whitespace-nowrap px-3 py-1 rounded-md shadow-lg transition-all duration-200"
            >
                {text}
            </div>
        </div>
    );
};

export default Tooltip;