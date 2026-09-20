interface DashboardPageHeaderProps {
  eyebrow: string
  title: string
  description: string
  children?: React.ReactNode
}

export function DashboardPageHeader({ eyebrow, title, description, children }: DashboardPageHeaderProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl">{title}</h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
      </div>
      {children}
    </section>
  )
}
