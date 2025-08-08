import { Link } from '@inertiajs/react';
import { ImgHTMLAttributes } from 'react';

interface ApplicationLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
    width?: string | number;
    height?: string | number;
    noLink?: boolean;
}

export default function ApplicationLogo({
    width = 100, // Adjust as needed
    height = 'auto',
    noLink = false,
    ...props
}: ApplicationLogoProps) {
    const logoSrc = '/favicon.png';

    const LogoImage = () => (
        <img
            src={logoSrc}
            width={width}
            height={height}
            alt="أكاديمية الوعي الدعوي"
            {...props}
        />
    );

    if (noLink) return <LogoImage />;

    return (
        <Link href="/" aria-label="Home">
            <LogoImage />
        </Link>
    );
}