import { Link } from '@inertiajs/react';
import { SVGAttributes } from 'react';

interface ApplicationLogoProps extends SVGAttributes<SVGElement> {
    width?: string | number;
    height?: string | number;
    fill?: string;
    noLink?: boolean;
}

export default function ApplicationLogo({
    width = "40",  // default width
    height = "38", // default height
    fill = "#FFC926", // default color
    noLink = false,
    ...props
}: ApplicationLogoProps) {
    const Logo = () => (
        <svg
            {...props}
            width={width}
            height={height}
            fill={fill}
            viewBox="0 0 40 38"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer" // Optional: change cursor on hover to indicate clickability
        >
            <path d="M8.074,15.591a14.742,14.742,0,0,1,23.846-.009v-2.7l5.053-1.764v6.121a1.135,1.135,0,1,0,.757,0v-6.47l0.991-.307c1.706-.642,1.706-1.779,0-2.421L21.587,1.779a4.665,4.665,0,0,0-1.594-.285,4.587,4.587,0,0,0-1.581.285L1.28,8.044c-1.706.642-1.706,1.779,0,2.421l6.787,2.421ZM39.9,8.216c0.3-.561-0.095-1.179-1.183-1.593L21.587,0.288A4.622,4.622,0,0,0,19.993,0a4.544,4.544,0,0,0-1.581.288L1.28,6.623C0.192,7.037-.2,7.655.1,8.216A2.158,2.158,0,0,1,1.28,7.36L18.413,1.025A4.544,4.544,0,0,1,19.993.737a4.622,4.622,0,0,1,1.594.288L38.72,7.36A2.157,2.157,0,0,1,39.9,8.216ZM7.73,24.078A12.27,12.27,0,1,1,20,36.333,12.262,12.262,0,0,1,7.73,24.078Zm-1.669,0A13.939,13.939,0,1,0,20,10.155,13.931,13.931,0,0,0,6.061,24.078Zm4.758-4.669V29h2V22.238L18.247,29h2.337V19.409h-2v6.82l-5.425-6.82H10.819Zm10.267,0v2.168h3.088V29h2v-7.42h3.088V19.409h-8.18Z" />
        </svg>
    );

    if (noLink) return (<Logo />);

    return (
        <Link href="/" aria-label="Home">
            <Logo />
        </Link>
    );
}
