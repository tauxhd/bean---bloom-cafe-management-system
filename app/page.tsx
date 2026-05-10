import Link from "next/link";
import ItemList from "@/components/list";
import HeroCard from "@/components/HeroCard";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className=" flex flex-col bg-mainGreen justify-center pt-3 h-145">
          <h1 className="text-8xl font-bold flex text-center px-20 text-mainWhite">THE BEST COFFEE IN PAPUA NEW GUINEA</h1>
          <div className="flex flex-row justify-center gap-120 px-20 pt-30">
            <div className="w-70 my-3 flex flex-col justify-center">
              <p className="text-secondaryWhite/80 font-thin text-xs"><span className="font-bold">Bean & Bloom:</span> Karim local i go premium, em i future bilong PNG coffee</p>
              <Link href="/order"><button className="my-3 text-sm  w-50 bg-mainYellow h-7 cursor-pointer rounded-md text-secondaryYellow hover:bg-amber-50 transition">View Our Porducts</button></Link>
            </div>
            <img className="absolute left-1/2.5  translate-x-7 top-76 w-1/5 h-auto z-20" src="/images/Coffee.png" alt="Coffee" />
            <div className="h-110 w-110 absolute translate-y-15 bg-secondaryWhite/40 rounded-full z-10"></div>
            <div className="text-left">
              <ItemList><span className="font-bold">Premium Pastries:</span> No1 Best Cakes in Papua New Guinea, made for Quality</ItemList>
              <ItemList><span className="font-bold">Local Beans:</span> Uses PNGs finest coffee beans to ensure culture is mixed with luxury</ItemList>
              <ItemList><span className="font-bold">Affordable Prices:</span> Bean and Bloom aims to supply quality to all of Papua New Guinea</ItemList>
            </div>
          </div>
        </section>

      {/* ─────────── SPONSORS MARQUEE ─────────── */}
      <section className="relative z-30 bg-mainYellow py-6 overflow-hidden">
        <div className="relative w-full overflow-hidden">

          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 sm:w-50 bg-linear-to-r from-mainYellow to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 sm:w-50 bg-linear-to-l from-mainYellow to-transparent z-10" />

          {/* Scrolling logos */}
          <div className="flex w-max animate-scroll items-center gap-12 sm:gap-20">
            {/* Set 1 */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />

            {/* Duplicate for seamless loop */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition" />
          </div>
        </div>
      </section>

      {/* ─────────── COFFEE BLENDS ─────────── */}
      <section className="relative bg-bgWhite z-40 py-16 px-6">
        <h1 className="text-secondaryYellow/60 font-extralight text-center text-4xl sm:text-5xl lg:text-6xl pb-10">
          Our Finest Coffee Blends
        </h1>
        <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto">
          <HeroCard />
          <HeroCard />
          <HeroCard />
          <HeroCard />
        </div>
        <Link
          href="/order"
          className="block text-center mt-10 text-secondaryYellow/80 hover:text-secondaryYellow transition duration-200 text-sm tracking-wide"
        >
          See All →
        </Link>
      </section>

      {/* ─────────── CAKES PROMO ─────────── */}
      <section className="bg-mainYellow flex flex-col lg:flex-row items-center gap-8 px-6 sm:px-10 lg:px-30 py-12 lg:py-16">
        <div className="flex-1 max-w-xl text-center lg:text-left">
          <h1 className="text-mainWhite/80 font-black text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Eat Our Finest Cakes
          </h1>
          <p className="text-mainWhite/60 text-sm mt-4 leading-relaxed">
            Our Cakes hold some of PNGs most delicate and interesting cultures that shows its uniqueness and tastes from different provinces with a premium modern feel.
          </p>
          <Link href="/order">
            <button className="mt-5 text-sm w-50 bg-mainWhite h-9 cursor-pointer rounded-md text-mainYellow hover:bg-amber-50 transition">
              View Our Products
            </button>
          </Link>
        </div>
        <img
          className="w-full max-w-md lg:max-w-lg h-64 sm:h-80 lg:h-100 rounded-4xl object-cover"
          src="/images/BlueberryCheescake.png"
          alt="Blueberry Cheesecake"
        />
      </section>

      {/* ─────────── WHY CHOOSE US ─────────── */}
      <section className="bg-mainGreen py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <span className="text-mainYellow text-sm font-medium uppercase tracking-widest">
              Why Bean &amp; Bloom
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mainWhite mt-2">
              More Than Just Coffee
            </h2>
            <p className="text-mainWhite/50 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              From seed to cup, we obsess over every detail so you don&apos;t have to.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="bg-mainWhite/5 border border-mainWhite/10 rounded-2xl p-7 hover:bg-mainWhite/10 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-mainYellow/15 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-mainWhite font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-mainWhite/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-mainWhite/5 border border-mainWhite/10 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array(5).fill('★').map((s, i) => (
                    <span key={i} className="text-mainYellow text-sm">{s}</span>
                  ))}
                </div>
                <p className="text-mainWhite/70 text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-mainYellow/30 flex items-center justify-center text-mainYellow font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-mainWhite text-sm font-medium">{t.name}</p>
                    <p className="text-mainWhite/40 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CONTACT ─────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 bg-mainWhite">
        <div className="grid lg:grid-cols-2 gap-12 items-start bg-mainWhite">

          {/* Left info */}
          <div>
            <span className="text-secondaryGreen text-sm font-medium uppercase tracking-widest">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textBlack mt-2 mb-4">
              We&apos;d Love To<br />Hear From You
            </h2>
            <p className="text-textBlack/50 text-base leading-relaxed mb-8">
              Whether it&apos;s a wholesale inquiry, a custom roast request, or just saying hello — our team usually replies within 24 hours.
            </p>

            <div className="flex flex-col gap-5">
              {CONTACT_INFO.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mainGreen/8 rounded-xl flex items-center justify-center text-lg shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-textBlack/40 font-medium uppercase tracking-wider mb-0.5">{c.label}</p>
                    <p className="text-textBlack font-medium text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form (client component) */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}

const WHY_US = [
  { icon: '🌱', title: 'Ethically Sourced', desc: "We work directly with farmers in PNG's highlands to ensure fair wages and sustainable growing practices." },
  { icon: '🔥', title: 'Small-Batch Roasted', desc: 'Every batch is roasted to order in our roastery, ensuring peak freshness from the moment it leaves our hands to yours.' },
  { icon: '🎯', title: 'Precision Profiling', desc: 'Our roasters use data-driven profiles to unlock the unique character of each bean — no guesswork, just great coffee.' },
  { icon: '📦', title: 'Fast Local Delivery', desc: 'Orders placed before 12PM are shipped same-day. Free delivery on orders above K150 anywhere in PNG.' },
  { icon: '☕', title: 'Brew Guides Included', desc: "Every bag comes with a personalised brew guide tailored to the bean's roast level and recommended brewing method." },
  { icon: '♻️', title: 'Eco Packaging', desc: 'Our bags are made from compostable materials. We also offer a 10% discount on your next order when you return your empties.' },
]

const TESTIMONIALS = [
  { name: 'Sarah L.', location: 'Port Moresby', quote: "The highland blend completely changed how I think about coffee. Floral and bright — nothing like I've had before." },
  { name: 'Marcus T.', location: 'Lae', quote: "Finally found a local roastery that takes quality as seriously as the big names. The House Blend is my daily go-to." },
  { name: 'Aisha R.', location: 'Mt. Hagen', quote: "Fast delivery, beautiful packaging, and the coffee is phenomenal. Bean & Bloom has earned a customer for life." },
]

const CONTACT_INFO = [
  { icon: '📍', label: 'Address', value: '12 Coffee Lane, Port Moresby, NCD' },
  { icon: '📞', label: 'Phone', value: '+675 7345 6789' },
  { icon: '✉️', label: 'Email', value: 'hello@beanandbloom.pg' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Fri 8AM–9PM · Sat–Sun 9AM–10PM' },
]