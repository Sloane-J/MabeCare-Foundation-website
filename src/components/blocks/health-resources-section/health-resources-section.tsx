import { Badge } from '@/components/ui/badge'

const MedicalKitIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const ClinicIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const HealthResourcesSection = () => {
  return (
    <section id="health-resources" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Body: text left, image right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">

          {/* Left — text + stat cards */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Badge variant="outline" className="w-fit text-sm font-normal px-4 py-1.5">
                Medical Resources
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-normal leading-snug">
                Delivering Vital Health Resources to Those in Need
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                We believe that access to healthcare is a fundamental right. By providing medical aid, health education, and wellness resources.
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Medical Kits */}
              <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-full bg-[#fca5a5] flex items-center justify-center">
                  <MedicalKitIcon className="size-4 text-[#991b1b]" />
                </div>
                <p className="text-sm text-muted-foreground">Medical Kits Distributed</p>
                <p className="text-3xl font-normal text-foreground">20K+</p>
              </div>

              {/* Clinics */}
              <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-full bg-[#86efac] flex items-center justify-center">
                  <ClinicIcon className="size-4 text-[#166534]" />
                </div>
                <p className="text-sm text-muted-foreground">Clinics Operated</p>
                <p className="text-3xl font-normal text-foreground">800K+</p>
              </div>
            </div>
          </div>

          {/* Right — image with floating chart card */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&q=80"
                alt="Volunteer distributing medical resources"
                loading="lazy"
                className="w-full h-[420px] sm:h-[500px] object-cover object-top"
              />
            </div>

            {/* Floating donation chart card */}
            <div className="absolute bottom-6 left-4 sm:left-[-20px] bg-white dark:bg-card rounded-2xl shadow-lg p-5 w-52 sm:w-60">
              <p className="text-sm font-semibold text-foreground mb-0.5">Donation chart</p>
              <p className="text-xs text-muted-foreground mb-4">Donation received in past years</p>

              {/* Bar chart */}
              <div className="flex items-end gap-2 h-16">
                {[35, 50, 65, 80, 100].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${height}%`,
                        backgroundColor: i === 4 ? '#ff1493' : '#86efac',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Year labels */}
              <div className="flex gap-2 mt-2">
                {['2020', '2021', '2022', '2023', '2024'].map((yr) => (
                  <span key={yr} className="flex-1 text-center text-[10px] text-muted-foreground">{yr}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HealthResourcesSection