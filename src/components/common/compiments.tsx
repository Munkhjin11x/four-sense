

import { Briefcase, MessageSquare } from "lucide-react";

// Google Icon Component
const GoogleIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export const CompimentsSection = () => {
    return (<>

        <div className="fixed right-0 top-[43%] -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
            <a
                href="https://forms.gle/Nb8n9Btmef9coyKH9"
                target="_blank"
                title="Job Application Form FourSenses"
                rel="noopener noreferrer"
                className="group animate-slide-in-right opacity-0 block"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
                <div className="relative bg-[#F9DAB2] text-[#2C2C2C] rounded-l-2xl shadow-lg group-hover:shadow-2xl h-[56px] flex items-center transition-all duration-300">
                    <div className="px-4 py-4 flex items-center justify-center shrink-0 w-[56px] h-[56px]">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="w-0 group-hover:w-[140px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap h-[56px] flex items-center">
                        <span className="font-semibold text-sm px-3">Job Application</span>
                    </div>
                </div>
            </a>
        </div>
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
            <a
                href="https://forms.gle/rUPkeHXN2XzcD3QE6"
                target="_blank"
                title="Feedback Form FourSenses"
                rel="noopener noreferrer"
                className="group animate-slide-in-right opacity-0 block"
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
                <div className="relative bg-[#7FA14A] text-white rounded-l-2xl shadow-lg group-hover:shadow-2xl h-[56px] flex items-center transition-all duration-300">
                    <div className="px-4 py-4 flex items-center justify-center shrink-0 w-[56px] h-[56px]">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="w-0 group-hover:w-[140px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap h-[56px] flex items-center">
                        <span className="font-semibold text-sm px-3">Give Feedback</span>
                    </div>
                </div>
            </a>
        </div>
        <div className="fixed right-0 top-[57%] -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
            <a
                href="https://www.google.com/search?sca_esv=433c76685208b106&sxsrf=AE3TifMPVBaIjlvz5F4MQXrVGVx93FG1sA:1765162674049&q=FourSenses+Nomad-Ability+Cocktail+Bar+Reviews&sa=X&ved=2ahUKEwihg6Gx_6yRAxW8qFYBHTlLDnIQ0bkNegQIShAE&biw=1792&bih=1270&dpr=2"
                target="_blank"
                title="Google Review FourSenses"
                rel="noopener noreferrer"
                className="group animate-slide-in-right opacity-0 block"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
                <div className="relative bg-white text-[#2C2C2C] rounded-l-2xl shadow-lg group-hover:shadow-2xl h-[56px] flex items-center transition-all duration-300">
                    <div className="px-4 py-4 flex items-center justify-center shrink-0 w-[56px] h-[56px]">
                        <GoogleIcon className="w-6 h-6" />
                    </div>
                    <div className="w-0 group-hover:w-[160px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap h-[56px] flex flex-col items-start justify-center">
                        <span className="font-semibold text-sm px-3">Google Review</span>
                        <div className="flex items-center gap-1 px-3">
                            <span className="text-yellow-500 text-xs flex items-center">
                                {[...Array(4)].map((_, i) => (
                                    <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                                <svg className="w-3 h-3 relative" viewBox="0 0 20 20">
                                    <defs>
                                        <linearGradient id="half-fill">
                                            <stop offset="50%" stopColor="currentColor" />
                                            <stop offset="50%" stopColor="#d1d5db" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" fill="url(#half-fill)" />
                                </svg>
                            </span>
                            <span className="text-xs font-medium text-gray-600">4.5</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </>

    )
}
