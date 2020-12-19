export default function Spinner() {
    return (
        <div className="text-center">
            <div
                className="spinner-border text-info spinner"
                style={{ width: "10rem", height: "10rem" }}
                role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}