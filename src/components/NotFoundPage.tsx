import { useNavigate } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function NotFoundPage() {
    const navigate = useNavigate();
    const sunRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sunRef.current) {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                sunRef.current.style.transform = `translate(-50%, ${(y - 0.5) * 10}px)`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-[92vh] relative overflow-hidden"
            style={{
                background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 50%, #F4A460 100%)'
            }}>

            {/* Sun */}
            <div
                ref={sunRef}
                className="absolute top-[10%] left-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full z-10 transition-transform duration-100"
                style={{
                    background: 'radial-gradient(circle, #FFD700, #FFA500)',
                    boxShadow: '0 0 60px rgba(255, 215, 0, 0.6)',
                    transform: 'translateX(-50%)'
                }}
            />

            {/* Flying Birds */}
            <div className="absolute top-[15%] left-0 w-full z-20 animate-[fly_25s_linear_infinite]">
                <svg width="40" height="20" viewBox="0 0 50 30" fill="none" stroke="#5D4037" strokeWidth="2" className="ml-[10%]">
                    <path d="M0 20 Q 15 0 25 15 Q 35 0 50 20" />
                </svg>
            </div>
            <div className="absolute top-[25%] left-0 w-full z-20 animate-[fly_20s_linear_infinite] [animation-delay:5s]">
                <svg width="30" height="15" viewBox="0 0 50 30" fill="none" stroke="#5D4037" strokeWidth="2" className="ml-[20%]">
                    <path d="M0 20 Q 15 0 25 15 Q 35 0 50 20" />
                </svg>
            </div>

            {/* Pyramids */}
            <div className="absolute bottom-[30%] w-full flex justify-center items-end z-20 pointer-events-none">
                <div className="relative mx-[-30px]" style={{ transform: 'scale(1.2)' }}>
                    <div className="w-0 h-0 border-l-[80px] md:border-l-[100px] border-l-transparent 
                                  border-r-[80px] md:border-r-[100px] border-r-transparent 
                                  border-b-[120px] md:border-b-[150px]"
                        style={{
                            borderBottomColor: '#D2945D',
                            filter: 'drop-shadow(10px 10px 20px rgba(0,0,0,0.2))'
                        }}
                    />
                </div>
                <div className="relative mx-[-30px]" style={{ transform: 'scale(1.5)', zIndex: 1 }}>
                    <div className="w-0 h-0 border-l-[80px] md:border-l-[100px] border-l-transparent 
                                  border-r-[80px] md:border-r-[100px] border-r-transparent 
                                  border-b-[120px] md:border-b-[150px]"
                        style={{
                            borderBottomColor: '#C17F46',
                            filter: 'drop-shadow(10px 10px 20px rgba(0,0,0,0.2))'
                        }}
                    />
                </div>
                <div className="relative mx-[-30px]" style={{ transform: 'scale(0.9)', zIndex: 3 }}>
                    <div className="w-0 h-0 border-l-[80px] md:border-l-[100px] border-l-transparent 
                                  border-r-[80px] md:border-r-[100px] border-r-transparent 
                                  border-b-[120px] md:border-b-[150px]"
                        style={{
                            borderBottomColor: '#E2AA72',
                            filter: 'drop-shadow(10px 10px 20px rgba(0,0,0,0.2))'
                        }}
                    />
                </div>
            </div>

            {/* Sand Dunes */}
            <div className="absolute bottom-0 w-full h-[35%] overflow-hidden z-30" style={{ background: '#F4A460' }}>
                <div className="absolute w-[120%] h-[200px] bottom-[-50px] left-[-10%] rounded-[50%_50%_0_0]"
                    style={{ background: '#DAA520' }} />
                <div className="absolute w-[120%] h-[250px] bottom-[-80px] left-[20%] rounded-[50%_50%_0_0]"
                    style={{ background: '#CD853F' }} />
                <div className="absolute w-[150%] h-[150px] bottom-[-20px] right-[-20%] rounded-[50%_50%_0_0]"
                    style={{ background: '#DEB887' }} />
            </div>

            {/* Nile River */}
            <div className="absolute bottom-0 left-0 w-full h-[25%] z-40 opacity-90"
                style={{
                    background: 'linear-gradient(to bottom, #4682B4, #1E90FF)',
                    clipPath: 'polygon(0 40%, 30% 50%, 60% 45%, 100% 60%, 100% 100%, 0% 100%)'
                }}>

                {/* Water Reflections */}
                <div className="absolute top-[30%] left-[20%] w-[200px] h-[10px] bg-white/30 rounded-full animate-[ripple_3s_infinite_linear]" />
                <div className="absolute top-[50%] left-[60%] w-[200px] h-[10px] bg-white/30 rounded-full animate-[ripple_3s_infinite_linear] [animation-delay:1s]" />
                <div className="absolute top-[70%] left-[40%] w-[200px] h-[10px] bg-white/30 rounded-full animate-[ripple_3s_infinite_linear] [animation-delay:2s]" />

                {/* Felucca Boat */}
                <div className="absolute bottom-10 right-[25%] animate-pulse" style={{ animationDuration: '4s' }}>
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                        <path d="M40 10 L80 70 L40 70 Z" fill="#F5F5DC" stroke="#8B4513" strokeWidth="1" />
                        <line x1="40" y1="10" x2="40" y2="80" stroke="#5D4037" strokeWidth="2" />
                        <path d="M20 75 Q 50 90 80 75 L 75 80 Q 50 95 25 80 Z" fill="#8B4513" />
                    </svg>
                </div>
            </div>

            {/* Palm Trees */}
            <div className="absolute left-[10%] bottom-[20%] z-50 origin-bottom animate-[sway_5s_ease-in-out_infinite_alternate]">
                <svg width="120" height="180" viewBox="0 0 100 150">
                    <path d="M45 150 Q 55 100 50 50" stroke="#8B4513" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M50 50 Q 20 20 10 50" stroke="#228B22" strokeWidth="4" fill="none" />
                    <path d="M50 50 Q 80 20 90 50" stroke="#228B22" strokeWidth="4" fill="none" />
                    <path d="M50 50 Q 30 10 10 20" stroke="#228B22" strokeWidth="4" fill="none" />
                    <path d="M50 50 Q 70 10 90 20" stroke="#228B22" strokeWidth="4" fill="none" />
                    <path d="M50 50 Q 50 10 50 0" stroke="#228B22" strokeWidth="4" fill="none" />
                </svg>
            </div>

            <div className="absolute right-[5%] bottom-[15%] z-50 origin-bottom animate-[sway_5s_ease-in-out_infinite_alternate] [animation-delay:1s]"
                style={{ transform: 'scale(0.8) rotate(5deg)' }}>
                <svg width="120" height="180" viewBox="0 0 100 150">
                    <path d="M45 150 Q 40 100 50 50" stroke="#8B4513" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M50 50 Q 20 20 10 50" stroke="#228B22" strokeWidth="4" fill="none" />
                    <path d="M50 50 Q 80 20 90 50" stroke="#228B22" strokeWidth="4" fill="none" />
                    <path d="M50 50 Q 30 10 10 20" stroke="#228B22" strokeWidth="4" fill="none" />
                    <path d="M50 50 Q 70 10 90 20" stroke="#228B22" strokeWidth="4" fill="none" />
                    <path d="M50 50 Q 50 10 50 0" stroke="#228B22" strokeWidth="4" fill="none" />
                </svg>
            </div>

            {/* Content Overlay */}
            <div className="relative z-50 text-center pt-[10vh] px-6">
                <h1 className="text-7xl md:text-8xl font-bold mb-2"
                    style={{
                        background: 'linear-gradient(to bottom, #8B4513, #CD853F)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 2px 4px rgba(255, 255, 255, 0.4)'
                    }}>
                    404
                </h1>

                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-1 w-16 bg-[#e17624] rounded"></div>
                    <Compass className="w-8 h-8 text-[#a33013]" />
                    <div className="h-1 w-16 bg-[#e17624] rounded"></div>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold text-[#a33013] mb-3"
                    style={{ textShadow: '0 2px 4px rgba(255, 255, 255, 0.4)' }}>
                    Uh oh, looks like you got lost!
                </h2>

                <p className="text-lg md:text-xl mb-8 max-w-md mx-auto"
                    style={{ color: '#6d4c41', textShadow: '0 2px 4px rgba(255, 255, 255, 0.4)' }}>
                    Maybe take a moment to enjoy the view...
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#2cc75c] text-black font-semibold text-lg px-8 py-4 rounded-xl hover:bg-[#25b350] transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Return Home
                    </button>
                    <button
                        onClick={() => navigate('/student-dashboard')}
                        className="bg-white text-[#a33013] font-semibold text-lg px-8 py-4 rounded-xl hover:bg-[#e17624] hover:text-white transition-all border-2 border-[#e17624] shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                        <Compass className="w-5 h-5" />
                        Explore Dashboard
                    </button>
                </div>

                {/* Fun Egyptian fact */}
                <div className="inline-block bg-white/90 px-6 py-4 rounded-xl shadow-md border-2 border-[#2cc75c]">
                    <p className="text-sm text-gray-600 mb-1">💡 Did you know?</p>
                    <p className="text-gray-800 font-medium">
                        The Nile River is the longest river in the world, flowing over 4,000 miles through Egypt!
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes fly {
                    0% { transform: translateX(-10vw) translateY(0); }
                    100% { transform: translateX(110vw) translateY(-5vh); }
                }
                
                @keyframes ripple {
                    0% { transform: scale(0.8); opacity: 0.6; }
                    50% { transform: scale(1.2); opacity: 0.3; }
                    100% { transform: scale(0.8); opacity: 0.6; }
                }
                
                @keyframes sway {
                    from { transform: rotate(-2deg); }
                    to { transform: rotate(2deg); }
                }
            `}</style>
        </div>
    );
}
