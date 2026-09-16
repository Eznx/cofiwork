'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const WA_NUMBER = '5491166173514';
const WA_TEXT =
  'Hola Nicolás, vi tu web. Quiero hablar sobre mi proyecto.';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  WA_TEXT
)}`;

const INSTAGRAM_URL =
  'https://www.instagram.com/3zequielxlombardo/';

const navItems = [
  {
    label: 'Quién soy',
    href: '#quien-soy',
    code: '01',
  },
  {
    label: 'Servicios',
    href: '#servicios',
    code: '02',
  },
];

/* ============================================================
   ICONOS
============================================================ */

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        width="20"
        height="20"
        x="2"
        y="2"
        rx="5"
      />
      <path d="M16 11.37a4 4 0 1 1-3.37-3.37A4 4 0 0 1 16 11.37Z" />
      <line
        x1="17.5"
        x2="17.51"
        y1="6.5"
        y2="6.5"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/* ============================================================
   NAVBAR
============================================================ */

export default function Navbar() {
  return (
    <motion.header
      initial={{
        y: -80,
        opacity: 0,
        filter: 'blur(8px)',
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
      }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.15,
      }}
      className="
        fixed
        inset-x-0
        top-0
        z-50
        px-3
        pt-3
        sm:px-5
        sm:pt-5
      "
    >
      <div
        className="
          relative
          mx-auto
          flex
          h-[64px]
          max-w-7xl
          items-center
          justify-between
          rounded-2xl
          border
          border-white/[0.08]
          bg-black/70
          px-3
          shadow-[0_12px_50px_rgba(0,0,0,0.35)]
          backdrop-blur-2xl
          sm:h-[68px]
          sm:px-5
        "
      >
        {/* ==================================================
            BORDE ENERGÉTICO SUPERIOR
        ================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            left-8
            right-8
            top-0
            h-px
            origin-center
          "
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          animate={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            delay: 0.7,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(180,255,57,0.7), transparent)',
            boxShadow:
              '0 0 12px rgba(180,255,57,0.25)',
          }}
        />

        {/* ==================================================
            LOGO
        ================================================== */}

        <a
          href="#inicio"
          aria-label="COFIWORK — Inicio"
          className="
            group
            relative
            flex
            items-center
            gap-2.5
            outline-none
          "
        >
          {/* Logo container */}

          <div
            className="
              relative
              h-8
              w-8
              overflow-hidden
              sm:h-9
              sm:w-9
            "
          >
            <Image
              src="/logo2.png"
              alt="COFIWORK"
              fill
              className="
                object-contain
                transition-all
                duration-500
                group-hover:scale-110
              "
              priority
            />
          </div>

          {/* Wordmark */}

          <div className="flex flex-col">
            <span
              className="
                text-[12px]
                font-black
                tracking-[-0.025em]
                text-white
                transition-colors
                duration-300
                group-hover:text-[#B4FF39]
                sm:text-[13px]
              "
            >
              COFIWORK
            </span>

            <span
              className="
                hidden
                font-mono
                text-[6px]
                uppercase
                tracking-[0.28em]
                text-white/20
                transition-colors
                duration-300
                group-hover:text-[#B4FF39]/40
                sm:block
              "
            >
              DIGITAL STUDIO
            </span>
          </div>
        </a>

        {/* ==================================================
            NAVEGACIÓN
        ================================================== */}

        <nav
          aria-label="Navegación principal"
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            md:block
          "
        >
          <div
            className="
              flex
              items-center
              gap-1
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.025]
              p-1
            "
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  px-4
                  py-2.5
                  text-[11px]
                  font-medium
                  tracking-wide
                  text-white/45
                  transition-all
                  duration-300
                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >
                {/* Active/hover indicator */}

                <span
                  className="
                    absolute
                    bottom-1
                    left-1/2
                    h-px
                    w-0
                    -translate-x-1/2
                    bg-[#B4FF39]
                    shadow-[0_0_8px_rgba(180,255,57,0.8)]
                    transition-all
                    duration-300
                    group-hover:w-5
                  "
                />

                <span
                  className="
                    font-mono
                    text-[7px]
                    text-[#B4FF39]/35
                    transition-colors
                    duration-300
                    group-hover:text-[#B4FF39]
                  "
                >
                  {item.code}
                </span>

                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* ==================================================
            ACCIONES
        ================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Instagram */}

          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de COFIWORK"
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              group
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-white/[0.09]
              bg-white/[0.025]
              text-white/45
              transition-all
              duration-300
              hover:border-[#B4FF39]/35
              hover:bg-[#B4FF39]/[0.06]
              hover:text-[#B4FF39]
            "
          >
            {/* Hover glow */}

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
              style={{
                background:
                  'radial-gradient(circle at center, rgba(180,255,57,0.14), transparent 65%)',
              }}
            />

            <InstagramIcon />
          </motion.a>

          {/* ==================================================
              WHATSAPP CTA
          ================================================== */}

          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.025,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              group
              relative
              flex
              h-10
              items-center
              gap-2
              overflow-hidden
              rounded-xl
              bg-[#B4FF39]
              px-3.5
              text-[11px]
              font-bold
              text-black
              shadow-[0_0_22px_rgba(180,255,57,0.16)]
              transition-all
              duration-300
              hover:bg-white
              hover:shadow-[0_0_30px_rgba(180,255,57,0.3)]
              sm:px-4
            "
            title="Escribime por WhatsApp"
          >
            {/* Shine */}

            <span
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-10
                w-8
                skew-x-[-20deg]
                bg-white/50
                blur-sm
                transition-all
                duration-700
                group-hover:left-[130%]
              "
            />

            {/* Status dot */}

            <span
              className="
                relative
                h-1.5
                w-1.5
                rounded-full
                bg-black/60
              "
            />

            <span className="relative hidden sm:inline">
              Hablemos
            </span>

            <span className="relative sm:hidden">
              <ArrowIcon />
            </span>

            <span className="relative hidden sm:block">
              <ArrowIcon />
            </span>
          </motion.a>
        </div>

        {/* ==================================================
            ESQUINAS TÉCNICAS
        ================================================== */}

        <span
          className="
            pointer-events-none
            absolute
            -left-px
            -top-px
            h-3
            w-3
            border-l
            border-t
            border-[#B4FF39]/40
          "
        />

        <span
          className="
            pointer-events-none
            absolute
            -right-px
            -top-px
            h-3
            w-3
            border-r
            border-t
            border-[#B4FF39]/40
          "
        />

        <span
          className="
            pointer-events-none
            absolute
            -bottom-px
            -left-px
            h-3
            w-3
            border-b
            border-l
            border-[#B4FF39]/20
          "
        />

        <span
          className="
            pointer-events-none
            absolute
            -bottom-px
            -right-px
            h-3
            w-3
            border-b
            border-r
            border-[#B4FF39]/20
          "
        />
      </div>
    </motion.header>
  );
}