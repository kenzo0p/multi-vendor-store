import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppis = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});
const Footer = () => {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex gap-2 items-center h-full px-4 py-6 lg:px-12">
        <p className="text-xl">Powered by</p>
        <Link href={process.env.NEXT_PUBLIC_APP_URL!}>
          <span
            className={cn("text-2xl font-blacksemibold ", poppis.className)}
          >
            neurogum
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
