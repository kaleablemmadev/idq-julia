import Link from "next/link";
import { BookOpen, Palette, GraduationCap, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6">
            IDQ Julia
            <span className="block text-accent mt-2">Interior Design Portfolio</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-2xl leading-relaxed mb-8">
            A creative journey through design, architecture, and innovation. 
            Building spaces that inspire, one project at a time.
          </p>
          
          <Link 
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-primary font-semibold rounded-sm transition-colors"
          >
            View My Courses
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
          <div className="p-6 bg-card-bg border border-border rounded-sm hover:border-accent transition-colors">
            <div className="w-10 h-10 mb-4 flex items-center justify-center bg-accent-light/30">
              <Palette className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Design Projects</h3>
            <p className="text-sm text-secondary">Curated portfolio of interior design work and creative explorations.</p>
          </div>
          
          <div className="p-6 bg-card-bg border border-border rounded-sm hover:border-accent transition-colors">
            <div className="w-10 h-10 mb-4 flex items-center justify-center bg-accent-light/30">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Academic Journey</h3>
            <p className="text-sm text-secondary">Coursework, assignments, and learning milestones throughout university.</p>
          </div>
          
          <div className="p-6 bg-card-bg border border-border rounded-sm hover:border-accent transition-colors">
            <div className="w-10 h-10 mb-4 flex items-center justify-center bg-accent-light/30">
              <GraduationCap className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Career Growth</h3>
            <p className="text-sm text-secondary">Professional development and preparation for the design industry.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
