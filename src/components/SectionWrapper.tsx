"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type SectionWrapperProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  id?: string
}

export default function SectionWrapper({ children, className = "", delay = 0, id }: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
