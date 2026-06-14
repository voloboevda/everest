import { GlobePulse } from "@/components/ui/cobe-globe-pulse";
import { StarsBackground } from "@/components/ui/stars";
import { ShinyButton } from "@/components/ui/shiny-button";
import "@/components/ui/shiny-button.css";

export default function App() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#060608]">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <picture>
          <source media="(min-width: 1200px)" srcSet="/hero-ship-full-desktop.jpg" />
          <source media="(min-width: 980px)" srcSet="/hero-ship-full-tablet.jpg" />
          <source media="(max-width: 979px)" srcSet="/hero-ship-full-mobile.jpg" />
          <img
            className="absolute inset-0 h-full w-full object-cover max-[979px]:object-[50%_72%] min-[980px]:max-[1199px]:object-[56%_48%] min-[1200px]:object-[58%_50%]"
            src="/hero-ship-full-desktop.jpg"
            alt=""
            width={2560}
            height={1441}
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 max-[979px]:[background:linear-gradient(90deg,rgba(4,5,8,0.92)_0%,rgba(4,5,8,0.7)_34%,rgba(4,5,8,0.35)_52%,transparent_68%),linear-gradient(180deg,rgba(4,5,8,0.45)_0%,transparent_32%)]"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,5,8,0.88) 0%, rgba(4,5,8,0.62) 26%, rgba(4,5,8,0.28) 44%, transparent 58%), linear-gradient(180deg, rgba(4,5,8,0.35) 0%, transparent 28%, transparent 72%, rgba(4,5,8,0.2) 100%)",
          }}
        />
      </div>
      <StarsBackground overlay className="absolute inset-0 z-[1] min-h-dvh w-full">
        <div className="relative z-[2] grid min-h-dvh w-full grid-cols-1">
          <div className="flex max-w-[min(560px,46vw)] flex-col justify-center px-6 pb-16 pt-[calc(72px+2rem)] max-[979px]:max-w-none lg:px-10 xl:px-14">
            <p className="mb-7 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/28">
              [01] Everest Trade
            </p>
            <h1
              className="hero-whipped mb-5 font-semibold tracking-[-0.03em] text-white"
              style={{
                fontFamily: '"Switzer", system-ui, sans-serif',
                fontSize: "clamp(2.35rem, 5.6vw, 4.1rem)",
                lineHeight: 1.02,
              }}
            >
              <span className="block whitespace-nowrap">We structure</span>
              <span className="block whitespace-nowrap">
                <em
                  className="font-normal not-italic"
                  style={{ fontFamily: '"Instrument Serif", serif', color: "#72d8f5" }}
                >
                  international
                </em>{" "}
                trade
              </span>
              <span className="block whitespace-nowrap">
                for{" "}
                <em
                  className="font-normal not-italic"
                  style={{ fontFamily: '"Instrument Serif", serif', color: "#c8a45a" }}
                >
                  industrial
                </em>
              </span>
              <span className="block whitespace-nowrap">partners.</span>
            </h1>
            <p className="mb-9 max-w-md text-[1.0625rem] leading-relaxed text-[rgba(232,236,242,0.58)]">
              Commodity trading and operations for energy, metals, and agri markets.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <ShinyButton onClick={() => undefined}>Send request →</ShinyButton>
              <a href="#cooperation" className="outline-cta">
                <span>
                  <span className="outline-cta__dot" aria-hidden="true" />
                  <span>Partnership models</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </StarsBackground>

      <section className="relative z-[3] border-t border-white/10 bg-[#060608] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-lg">
          <p className="mb-6 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/35">
            [05] Geography — GlobePulse lab
          </p>
          <GlobePulse />
        </div>
      </section>
    </div>
  );
}
