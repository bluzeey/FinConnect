import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-background">
      <div className="container mx-auto flex justify-between px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Image
              alt="Logo"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2023 Finder Service. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              About Us
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Contact
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex gap-4">
            <Link className="rounded-full" href="#">
              <Image
                alt="LinkedIn"
                className="h-6 w-6"
                height="24"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "24/24",
                  objectFit: "cover",
                }}
                width="24"
              />
            </Link>
            <Link className="rounded-full" href="#">
              <Image
                alt="Twitter"
                className="h-6 w-6"
                height="24"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "24/24",
                  objectFit: "cover",
                }}
                width="24"
              />
            </Link>
            <Link className="rounded-full" href="#">
              <Image
                alt="Facebook"
                className="h-6 w-6"
                height="24"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "24/24",
                  objectFit: "cover",
                }}
                width="24"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
