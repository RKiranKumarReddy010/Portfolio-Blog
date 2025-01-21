export default function Footer() {
  return (
    <footer className="border-t" style={{padding:10}}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2025 R Kiran Kumar Reddy.  Built with Next.js.<br/> AI Research
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="https://www.instagram.com/kir4n_kum4r_/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            Instagram
          </a>
          <a href="https://github.com/RKiranKumarReddy010" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/r-kiran-kumar-reddy-54400230b/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}