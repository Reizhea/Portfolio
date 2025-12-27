import React from 'react'

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string
  icon: React.ReactNode
  position: string
  handleClick?: () => void
  otherClasses?: string
}) => {
  return (
    <button
      onClick={handleClick}
      className="group relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1.5px] focus:outline-none md:w-60 md:mt-10"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

      <span
        className={`
          relative inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] 
          
          bg-slate-950/80 
          backdrop-blur-xl 
          border border-white/10
          
          [--shadow-color:rgba(199,210,254,0.15)] 
          shadow-[0_0_10px_var(--shadow-color),_inset_0_1px_0_rgba(255,255,255,0.05)]
          transition-all duration-300
          
          group-hover:bg-slate-950/90
          
          px-7 text-sm font-medium text-white 

          ${otherClasses}
        `}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative z-10 flex items-center gap-2"> 
          {position === 'left' && (
            <span className="transition-transform duration-300 group-hover:scale-110">
              {icon}
            </span>
          )}
          
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {title}
          </span>
          
          {position === 'right' && (
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {icon}
            </span>
          )}
        </span>
      </span>
    </button>
  )
}

export default MagicButton