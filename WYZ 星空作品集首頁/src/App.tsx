import { useEffect, useRef, useState } from "react"
import { portfolioLinks } from "./portfolioLinks"

const navigation = [
  { number: "01", title: "個人簡介", english: "PROFILE", key: "profile" },
  { number: "02", title: "作品成果", english: "WORKS", key: "works" },
  { number: "03", title: "學習與實務經歷", english: "JOURNEY", key: "journey" },
  {
    number: "04",
    title: "專業能力",
    english: "CAPABILITIES",
    key: "capabilities",
  },
  { number: "05", title: "履歷與聯絡", english: "CONTACT", key: "contact" },
] as const

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 7l5 5-5 5" />
    </svg>
  )
}

function OrbitArtwork() {
  return (
    <svg className="orbits" viewBox="0 0 1000 620" aria-hidden="true">
      <g className="orbit orbit-one">
        <ellipse cx="500" cy="310" rx="390" ry="132" />
        <circle className="orbit-star" cx="110" cy="310" r="3.2" />
      </g>
      <g className="orbit orbit-two">
        <ellipse cx="500" cy="310" rx="335" ry="178" />
        <circle
          className="orbit-star orbit-star-gold"
          cx="835"
          cy="310"
          r="2.5"
        />
      </g>
      <g className="orbit orbit-three">
        <ellipse cx="500" cy="310" rx="285" ry="232" />
        <circle className="orbit-star" cx="500" cy="78" r="2.6" />
      </g>
    </svg>
  )
}

function TransitionLine() {
  return (
    <svg
      className="transition-line"
      viewBox="0 0 1000 210"
      preserveAspectRatio="none"
      aria-label="由心電圖轉化為數位節點的線條圖像"
    >
      <path
        className="line-path"
        d="M0 109 H135 L164 108 L183 86 L207 150 L234 26 L263 132 L287 91 L312 109 H430 C462 109 469 77 501 77 H553 C584 77 591 128 622 128 H683 L720 96 L758 127 L801 86 L849 109 H1000"
      />
      <g className="line-nodes">
        <circle cx="720" cy="96" r="6" />
        <circle cx="758" cy="127" r="6" />
        <circle cx="801" cy="86" r="6" />
        <circle cx="849" cy="109" r="6" />
        <path d="M758 127v50m43-91V35m48 74v53" />
        <text x="744" y="196">
          &lt;/&gt;
        </text>
        <text x="787" y="25">
          01
        </text>
        <text x="837" y="188">
          +
        </text>
      </g>
    </svg>
  )
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const [aboutVisible, setAboutVisible] = useState(false)
  const [pendingMessage, setPendingMessage] = useState("")

  useEffect(() => {
    const hero = heroRef.current
    const about = aboutRef.current
    if (!hero || !about) return

    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      hero.style.setProperty("--pointer-x", `${x * 13}px`)
      hero.style.setProperty("--pointer-y", `${y * 9}px`)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    hero.addEventListener("pointermove", onPointerMove)
    observer.observe(about)
    return () => {
      hero.removeEventListener("pointermove", onPointerMove)
      observer.disconnect()
    }
  }, [])

  const visitLink = (key: keyof typeof portfolioLinks, title: string) => {
    const url = portfolioLinks[key]
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
      return
    }
    setPendingMessage(`「${title}」連結尚待設定`)
    window.setTimeout(() => setPendingMessage(""), 2600)
  }

  return (
    <main>
      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <div className="star-field" aria-hidden="true" />
        <p className="hero-corner">
          PORTFOLIO
          <span>/ 2026</span>
        </p>
        <div className="hero-center">
          <OrbitArtwork />
          <p className="hero-kicker">
            INTERDISCIPLINARY DESIGNER &amp; LEARNER
          </p>
          <h1 id="hero-title">WYZ</h1>
          <p className="hero-tagline">Technology meets Learning.</p>
        </div>
        <p className="hero-vertical">INFORMATION × HEALTHCARE × EDUCATION</p>
        <a className="scroll-cue" href="#about">
          <span>SCROLL TO EXPLORE</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section
        className={`about ${aboutVisible ? "is-visible" : ""}`}
        id="about"
        ref={aboutRef}
        aria-labelledby="about-title"
      >
        <div className="about-inner">
          <header className="about-name">
            <span>王宥臻</span>
            <i aria-hidden="true" />
            <small>WANG YOU ZHEN</small>
          </header>

          <div className="about-layout">
            <div className="about-heading">
              <h2 id="about-title">
                <span>從資訊科技，</span>
                <span>走進</span>
                <em>醫護教育。</em>
              </h2>
              <p className="about-english">Where Technology Meets Learning.</p>
            </div>

            <div className="about-copy">
              <p>
                目前就讀國立臺北護理健康大學醫護教育暨數位學習系。從資訊管理出發，逐漸接觸醫護教育與數位教材設計，也持續透過程式開發和實際作品累積經驗。
              </p>
              <p>
                希望能將不同領域所學結合，讓想法不只停留在規劃，而是一步步成為真正可以使用的作品。
              </p>
            </div>
          </div>
          <TransitionLine />
        </div>
      </section>

      <section className="navigation" aria-label="作品集探索導覽">
        <div className="navigation-inner">
          <header className="navigation-header">
            <p>WYZ / DIGITAL PORTFOLIO</p>
            <span>SELECTED INDEX — 2026</span>
          </header>
          <nav>
            {navigation.map((item) => {
              const configured = Boolean(portfolioLinks[item.key])
              return (
                <button
                  className="nav-row"
                  key={item.key}
                  onClick={() => visitLink(item.key, item.title)}
                  aria-label={`${item.title} — ${
                    configured ? "開啟外部頁面" : "連結待設定"
                  }`}
                >
                  <span className="nav-number">{item.number}</span>
                  <span className="nav-title">{item.title}</span>
                  <span className="nav-english">
                    {item.english}
                    {!configured && <small>待設定</small>}
                  </span>
                  <span className="nav-arrow">
                    <ArrowIcon />
                  </span>
                </button>
              )
            })}
          </nav>
          <p
            className={`link-notice ${pendingMessage ? "is-shown" : ""}`}
            aria-live="polite"
          >
            {pendingMessage}
          </p>
        </div>
      </section>
    </main>
  )
}
