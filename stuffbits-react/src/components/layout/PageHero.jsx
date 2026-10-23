import { Link } from 'react-router-dom'

export default function PageHero({
  kicker,
  title,
  titleAccent,
  subtitle,
  image,
  imageAlt = '',
  crumbs = [],
  actions,
}) {
  const decorative = !imageAlt

  return (
    <section className="relative overflow-hidden bg-navy">
      {image && (
        <img
          src={image}
          alt={decorative ? '' : imageAlt}
          aria-hidden={decorative || undefined}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40"
        aria-hidden
      />

      <div className="relative mx-auto max-w-container px-6 py-16 md:py-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {index > 0 && <span aria-hidden>/</span>}
                    {crumb.to && !last ? (
                      <Link to={crumb.to} className="transition-colors hover:text-gold">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={last ? 'text-gold' : undefined}>{crumb.label}</span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        {kicker && <p className="sb-kicker mb-4">{kicker}</p>}
        <h1 className="max-w-3xl font-heading text-4xl font-medium leading-[1.08] text-white md:text-5xl">
          {title}
          {titleAccent && <span className="mt-1 block text-gold">{titleAccent}</span>}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">{subtitle}</p>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
      </div>
    </section>
  )
}
