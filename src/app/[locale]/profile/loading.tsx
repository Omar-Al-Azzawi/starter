'use client'

import { motion } from 'motion/react'

export default function BouncingDotsLoader() {
  const dots = [0, 1, 2, 3, 4]

  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      ease: 'easeOut',
    },
    backgroundColor: {
      duration: 0,
      yoyo: Infinity,
      ease: 'easeOut',
      repeatDelay: 0.8,
    },
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-2">
        {dots.map((dot) => (
          <motion.span
            key={dot}
            className="w-3 h-3 rounded-full bg-blue-500"
            transition={bounceTransition}
            animate={{
              y: ['0%', '-100%'],
              backgroundColor: ['#3B82F6', '#93C5FD'],
            }}
          />
        ))}
      </div>
    </div>
  )
}
