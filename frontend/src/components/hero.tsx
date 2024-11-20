import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Find the Perfect Financial Expert for Your Business
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Simplify your financial operations with top-rated professionals
                tailored to your needs.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Search for accountants, CFOs, AR specialists..."
                  type="text"
                />
                <Button type="submit">Search</Button>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Hero"
              className="aspect-[4/3] overflow-hidden rounded-xl object-cover object-center"
              height="400"
              src="/placeholder.svg"
              width="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
