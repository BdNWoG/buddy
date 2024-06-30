import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="hidden items-center lg:flex">
                <Image src="/buddy.svg" alt="logo" width={28} height={28} />
                <p className="font-semibold text-white text-2xl ml-2.5">
                    Buddy
                </p>
            </div>
        </Link>
    )
}