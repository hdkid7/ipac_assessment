import ClockLoader from "react-spinners/ClockLoader";

export default function Spinner(loading) {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
        marginTop: "3em"
    };

    return (
        <>
            <ClockLoader
                color="#ffffff"
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                cssOverride={override}
            />

            <p className="text-lg mt-5 text-white">
                Loading Your Content...
            </p>
        </>
    )
}
