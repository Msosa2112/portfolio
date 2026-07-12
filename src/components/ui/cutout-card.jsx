"use client"

import React, {
  createContext,
  useState,
  useId,
  useRef,
  useLayoutEffect,
  useCallback,
  useContext,
  useMemo,
} from "react"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "../../lib/utils"

// ============================================================================
// Tokens — optional chrome for demos / quick styling
// ============================================================================

export const cutoutCardSurfaceShadowClassName = cn(
  "border border-white/20",
  "shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_4px_8px_-2px_rgba(0,0,0,0.1),0px_8px_16px_-4px_rgba(0,0,0,0.1)]",
  "transition-[box-shadow,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
  "hover:border-white/40 hover:shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.2),0px_8px_16px_-4px_rgba(0,0,0,0.2),0px_16px_32px_-8px_rgba(0,0,0,0.2)]"
)

export const cutoutCardSurfaceClassName = cn(
  "group/cutout relative cursor-pointer overflow-hidden rounded-[28px] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/10"
)

export function useCutoutContentStaggerVariants() {
  const reduceMotion = useReducedMotion()

  return useMemo(() => {
    if (reduceMotion) {
      return {
        container: {
          hidden: {},
          show: {
            transition: { staggerChildren: 0.03, delayChildren: 0 },
          },
        },
        item: {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
          },
        },
      }
    }

    return {
      container: {
        hidden: {},
        show: {
          transition: { staggerChildren: 0.055, delayChildren: 0.06 },
        },
      },
      item: {
        hidden: { opacity: 0, y: 12, filter: "blur(5px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { type: "spring", duration: 0.48, bounce: 0.14 },
        },
      },
    }
  }, [reduceMotion])
}

// ============================================================================
// Context
// ============================================================================

const CutoutCardContext = createContext(null)

export function useCutoutCard() {
  const ctx = useContext(CutoutCardContext)
  if (!ctx) {
    throw new Error("useCutoutCard must be used within <CutoutCard>")
  }
  return ctx
}

// ============================================================================
// Hook to register and measure label/pin elements
// ============================================================================

export function useCutoutElement(position) {
  const context = useContext(CutoutCardContext)
  const id = useId()
  const ref = useRef(null)

  const register = context?.registerElement
  const unregister = context?.unregisterElement

  useLayoutEffect(() => {
    if (!register || !unregister || !ref.current) return
    const el = ref.current

    const media = el.closest(".cutout-media-container")
    if (!media) return

    let rafId
    const update = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const mediaRect = media.getBoundingClientRect()
        const rect = el.getBoundingClientRect()

        register(id, {
          x: rect.left - mediaRect.left,
          y: rect.top - mediaRect.top,
          w: rect.width,
          h: rect.height,
          position,
        })
      })
    }

    const ro = new ResizeObserver(update)
    ro.observe(el)
    ro.observe(media)
    update()

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafId)
      unregister(id)
    }
  }, [register, unregister, id, position])

  return ref
}

// ============================================================================
// Root Component
// ============================================================================

export function CutoutCard({
  className,
  hovered: hoveredProp,
  defaultHovered = false,
  onHoveredChange,
  trackPointerHover = true,
  onMouseEnter,
  onMouseLeave,
  children,
  ...props
}) {
  const [hovered, setHovered] = useControllableState({
    prop: hoveredProp,
    defaultProp: defaultHovered,
    onChange: onHoveredChange,
  })

  const [elements, setElements] = useState({})

  const registerElement = useCallback((id, data) => {
    setElements((prev) => {
      const prevData = prev[id]
      if (
        prevData &&
        prevData.x === data.x &&
        prevData.y === data.y &&
        prevData.w === data.w &&
        prevData.h === data.h &&
        prevData.position === data.position
      ) {
        return prev
      }
      return { ...prev, [id]: data }
    })
  }, [])

  const unregisterElement = useCallback((id) => {
    setElements((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const setHoveredStable = useCallback(
    (next) => {
      setHovered(next)
    },
    [setHovered]
  )

  const ctx = useMemo(
    () => ({
      hovered: hovered ?? false,
      setHovered: setHoveredStable,
      elements,
      registerElement,
      unregisterElement,
    }),
    [hovered, setHoveredStable, elements, registerElement, unregisterElement]
  )

  const handleMouseEnter = (e) => {
    onMouseEnter?.(e)
    if (e.defaultPrevented || !trackPointerHover) {
      return
    }
    setHoveredStable(true)
  }

  const handleMouseLeave = (e) => {
    onMouseLeave?.(e)
    if (e.defaultPrevented || !trackPointerHover) {
      return
    }
    setHoveredStable(false)
  }

  return (
    <CutoutCardContext.Provider value={ctx}>
      <motion.div
        className={cn("relative w-full h-full overflow-hidden isolate", className)}
        data-slot="cutout-card"
        data-state={ctx.hovered ? "hovered" : "idle"}
        initial={{ opacity: 1 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="absolute inset-0 glass-panel pointer-events-none rounded-[inherit]" style={{ zIndex: -1 }} />
        {children}
      </motion.div>
    </CutoutCardContext.Provider>
  )
}

// ============================================================================
// Layout primitives
// ============================================================================

export const CutoutCardMedia = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { hovered, elements } = useCutoutCard()
    const mediaRef = useRef(null)
    const [mediaSize, setMediaSize] = useState({ w: 0, h: 0 })

    useLayoutEffect(() => {
      if (!mediaRef.current) return
      const el = mediaRef.current
      const ro = new ResizeObserver((entries) => {
        setMediaSize({
          w: entries[0].contentRect.width,
          h: entries[0].contentRect.height,
        })
      })
      ro.observe(el)
      return () => ro.disconnect()
    }, [])

    const maskId = useId()
    const cleanMaskId = useMemo(() => "cutout-mask-" + maskId.replace(/:/g, ""), [maskId])

    // Animate the corner radius (spring physics for fluid motion)
    const activeSize = hovered ? 12 : 20
    const springConfig = { type: "spring", stiffness: 220, damping: 26 }

    return (
      <div
        ref={(node) => {
          mediaRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(
          "cutout-media-container relative overflow-hidden isolate",
          className
        )}
        data-slot="cutout-card-media"
        style={{
          maskImage: `url(#${cleanMaskId})`,
          WebkitMaskImage: `url(#${cleanMaskId})`,
          ...props.style,
        }}
        {...props}
      >
        <svg
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        >
          <mask
            id={cleanMaskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={mediaSize.w}
            height={mediaSize.h}
          >
            {/* White allows media to show everywhere by default */}
            <rect
              x="0"
              y="0"
              width={mediaSize.w}
              height={mediaSize.h}
              fill="white"
            />

            {/* Render cutouts automatically based on registered elements */}
            {Object.values(elements).map((el, index) => {
              const { w, h, position } = el

              // Evitar renderizar recortes si los tamaños no son válidos o no se han medido
              if (!w || !h || !mediaSize.w || !mediaSize.h) return null

              if (position === "bottom-left") {
                const labelY = mediaSize.h - h
                return (
                  <g key={index}>
                    {/* Main rect blocks out the badge */}
                    <rect
                      x={-0.5}
                      y={labelY}
                      width={w + 0.5}
                      height={h + 0.5}
                      fill="black"
                    />

                    {/* Top transition corner (concave) */}
                    <motion.rect
                      x={-0.5}
                      y={labelY - activeSize}
                      width={activeSize + 0.5}
                      height={activeSize + 0.5}
                      animate={{ y: labelY - activeSize, width: activeSize + 0.5, height: activeSize + 0.5 }}
                      transition={springConfig}
                      fill="black"
                    />
                    <motion.circle
                      cx={0}
                      cy={labelY}
                      r={activeSize}
                      animate={{ cy: labelY, r: activeSize }}
                      transition={springConfig}
                      fill="white"
                    />

                    {/* Right transition corner (concave) */}
                    <motion.rect
                      x={w - 0.5}
                      y={mediaSize.h - activeSize}
                      width={activeSize + 0.5}
                      height={activeSize + 0.5}
                      animate={{ x: w - 0.5, width: activeSize + 0.5, height: activeSize + 0.5 }}
                      transition={springConfig}
                      fill="black"
                    />
                    <motion.circle
                      cx={w}
                      cy={mediaSize.h}
                      r={activeSize}
                      animate={{ cx: w, r: activeSize }}
                      transition={springConfig}
                      fill="white"
                    />

                    {/* Inner vertex corner (concave in image / convex in badge) */}
                    <motion.circle
                      cx={w}
                      cy={labelY}
                      r={activeSize}
                      animate={{ cx: w, cy: labelY, r: activeSize }}
                      transition={springConfig}
                      fill="white"
                    />
                  </g>
                )
              }

              if (position === "top-right") {
                const pinX = mediaSize.w - w
                return (
                  <g key={index}>
                    {/* Main rect blocks out the pin */}
                    <rect
                      x={pinX}
                      y={-0.5}
                      width={w + 0.5}
                      height={h + 0.5}
                      fill="black"
                    />

                    {/* Left transition corner (concave) */}
                    <motion.rect
                      x={pinX - activeSize}
                      y={-0.5}
                      width={activeSize + 0.5}
                      height={activeSize + 0.5}
                      animate={{ x: pinX - activeSize, width: activeSize + 0.5, height: activeSize + 0.5 }}
                      transition={springConfig}
                      fill="black"
                    />
                    <motion.circle
                      cx={pinX}
                      cy={0}
                      r={activeSize}
                      animate={{ cx: pinX, r: activeSize }}
                      transition={springConfig}
                      fill="white"
                    />

                    {/* Bottom transition corner (concave) */}
                    <motion.rect
                      x={mediaSize.w - activeSize}
                      y={h - 0.5}
                      width={activeSize + 0.5}
                      height={activeSize + 0.5}
                      animate={{ y: h - 0.5, width: activeSize + 0.5, height: activeSize + 0.5 }}
                      transition={springConfig}
                      fill="black"
                    />
                    <motion.circle
                      cx={mediaSize.w}
                      cy={h}
                      r={activeSize}
                      animate={{ cy: h, r: activeSize }}
                      transition={springConfig}
                      fill="white"
                    />

                    {/* Inner vertex corner (concave in image / convex in pin) */}
                    <motion.circle
                      cx={pinX}
                      cy={h}
                      r={activeSize}
                      animate={{ cx: pinX, cy: h, r: activeSize }}
                      transition={springConfig}
                      fill="white"
                    />
                  </g>
                )
              }

              return null
            })}
          </mask>
        </svg>

        {children}
      </div>
    )
  }
)
CutoutCardMedia.displayName = "CutoutCardMedia"

export function CutoutCardImage({
  className,
  alt = "",
  fill = true,
  sizes,
  src,
  ...props
}) {
  return (
    <img
      alt={alt}
      src={src}
      className={cn(
        "object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cutout:scale-105",
        fill && "h-full w-full absolute inset-0",
        className
      )}
      data-slot="cutout-card-image"
      {...props}
    />
  )
}

export function CutoutCardOverlay({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
        className
      )}
      data-slot="cutout-card-overlay"
      {...props}
    />
  )
}

export function CutoutCardContent({
  className,
  ...props
}) {
  return (
    <div
      className={cn("p-6", className)}
      data-slot="cutout-card-content"
      {...props}
    />
  )
}

export function CutoutCardFooter({
  className,
  ...props
}) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      data-slot="cutout-card-footer"
      {...props}
    />
  )
}

// ============================================================================
// Automatically registered label and pin wrappers
// ============================================================================

export const CutoutCardInsetLabel = React.forwardRef(
  ({ className, position = "bottom-left", children, ...props }, ref) => {
    const elRef = useCutoutElement(position)

    return (
      <div
        ref={(node) => {
          elRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn("absolute z-20", className)}
        data-slot="cutout-card-inset-label"
        {...props}
      >
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    )
  }
)
CutoutCardInsetLabel.displayName = "CutoutCardInsetLabel"

export const CutoutCardPin = React.forwardRef(
  ({ className, position = "top-right", children, ...props }, ref) => {
    const elRef = useCutoutElement(position)

    return (
      <div
        ref={(node) => {
          elRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn("absolute z-20", className)}
        data-slot="cutout-card-pin"
        {...props}
      >
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    )
  }
)
CutoutCardPin.displayName = "CutoutCardPin"

export function CutoutCardAction({
  className,
  revealOnHover = true,
  ...props
}) {
  const { hovered } = useCutoutCard()
  const reduceMotion = useReducedMotion()
  const visible = !revealOnHover || hovered

  return (
    <motion.div
      animate={
        visible
          ? { opacity: 1, transform: "translateY(0px)" }
          : { opacity: 0, transform: "translateY(8px)" }
      }
      className={cn(
        "absolute",
        revealOnHover && !visible && "pointer-events-none",
        className
      )}
      data-reveal={revealOnHover ? "hover" : "always"}
      data-slot="cutout-card-action"
      transition={
        reduceMotion
          ? { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
          : { duration: 0.24, ease: [0.23, 1, 0.32, 1] }
      }
      {...props}
    />
  )
}
