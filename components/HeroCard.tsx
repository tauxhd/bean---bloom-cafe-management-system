import Link from "next/link"
import Image from "next/image"

interface HeroCardProps {
  id?: number | string
  name?: string
  flavour?: string
  price?: number
  image?: string
  badge?: string
  roast?: "Light" | "Medium" | "Medium-Dark" | "Dark"
  weight?: string
}

export default function HeroCard({
  id = 1,
  name = "Highland Blend",
  flavour = "Smooth chocolate notes with hints of caramel and toasted hazelnut",
  price = 38,
  image = "/images/BlueberryCheescake.png",
  badge,
  roast = "Medium",
  weight = "250g",
}: HeroCardProps) {
  return (
    <div className="group bg-mainWhite w-72 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col border border-mainGreen/5">

      {/* Image */}
      <div className="relative w-full h-60 overflow-hidden bg-secondaryWhite">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="288px"
        />

        {/* Optional badge */}
        {badge && (
          <span className="absolute top-3 left-3 bg-mainYellow text-secondaryYellow text-[0.65rem] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
            {badge}
          </span>
        )}

        {/* Roast pill */}
        <span className="absolute top-3 right-3 bg-mainWhite/90 backdrop-blur-sm text-textBlack/70 text-[0.65rem] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {roast} Roast
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">

        {/* Name + weight */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-secondaryYellow text-base leading-tight">
            {name}
          </h3>
          <span className="text-[0.65rem] text-textBlack/40 font-medium tabular-nums shrink-0 mt-1">
            {weight}
          </span>
        </div>

        {/* Flavour description */}
        <p className="text-secondaryYellow/70 text-xs leading-relaxed mb-3 line-clamp-2">
          {flavour}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-black/10 mb-3" />

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.6rem] text-textBlack/40 uppercase tracking-wider mb-0.5">From</p>
            <p className="text-lg font-bold text-mainGreen leading-none tabular-nums">
              RM{price.toFixed(2)}
            </p>
          </div>
          <Link href={`/order?product=${id}`} className="flex-1">
            <button className="w-full cursor-pointer bg-mainYellow h-9 text-secondaryYellow font-medium px-3 rounded-full hover:bg-secondaryYellow hover:text-mainYellow transition-colors duration-300 text-sm">
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}