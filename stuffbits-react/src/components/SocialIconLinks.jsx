import { SOCIAL_LINKS } from '../lib/socialLinks'

const TONE_CLASS = {
  dark: 'border-slate-200 text-slate-200 hover:border-gold hover:text-gold hover:bg-gold/5',
  light: 'border-slate-200 text-slate-600 hover:border-gold hover:text-gold hover:bg-gold/5',
}

export default function SocialIconLinks({
  tone = 'dark',
  iconSize = 18,
  className = '',
}) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${TONE_CLASS[tone]}`}
          aria-label={label}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  )
}
