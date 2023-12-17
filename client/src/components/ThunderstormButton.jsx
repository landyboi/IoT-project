
function ThunderstormButton({ disabled, onClick, label, type }) {

    const buttonStyles = {
        default: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4",
        disabled: "bg-gray-600 text-white font-bold py-2 px-4 rounded m-4",
        returnButton: "bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded shadow m-4 transition-colors duration-300 ease-in-out"
    }

    const style = disabled ? buttonStyles.disabled : (type && buttonStyles[type] ? buttonStyles[type] : buttonStyles.default);

    return (
        <button
            className={`${style}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default ThunderstormButton;