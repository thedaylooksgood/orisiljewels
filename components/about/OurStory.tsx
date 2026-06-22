import React from 'react';
import Image from 'next/image';
import { Gem, Heart, Star } from 'lucide-react';

export function OurStory() {
    return (
        <section className="w-full bg-[#FDFBFB] pt-10 lg:pt-16 pb-16 font-sans overflow-hidden">
            {/* Standard site container with optimized gap */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-8 lg:gap-4">

                {/* ================= LEFT COLUMN (Image & Layout Shapes) ================= */}
                {/* Widened left column (38%) and tall aspect ratio */}
                <div className="relative w-full max-w-[420px] lg:max-w-none lg:w-[38%] aspect-[4/3] sm:aspect-[370/480] lg:aspect-auto lg:h-[480px] flex-none z-10">
                    
                    {/* Decorative Background Block (Adapted to Orisil theme) */}
                    <div className="absolute left-0 top-[20px] w-[80px] h-[440px] bg-[#E0B4B8]/30 z-0 hidden lg:block rounded-l-[16px]" />

                    {/* Main Image Container */}
                    <div className="relative lg:absolute lg:left-[50px] lg:top-0 lg:w-[calc(100%-50px)] lg:h-[480px] w-full h-full rounded-[16px] shadow-xl overflow-hidden z-10">
                        <img
                            src="https://images.unsplash.com/photo-1584556812952-905ffd0c611a?q=80&w=2070&auto=format&fit=crop"
                            alt="Craftsman working"
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                        {/* Subtle Overlay */}
                        <div className="absolute inset-0 bg-black/20 pointer-events-none z-20" />

                        {/* Play Button Overlay */}
                        <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#C17F78] rounded-full flex justify-center items-center shadow-[0px_0px_4px_rgba(15,17,37,0.21),_0px_0px_4.5px_rgba(193,127,120,0.62),_0px_0px_11.2px_7px_#E5E7EB] hover:scale-105 transition-transform z-30">
                            {/* Play Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[24px] h-[24px] text-white ml-1">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Floating Flowers replacing the Bollco stat box */}
                        <div className="absolute left-[-15px] bottom-[-15px] w-28 h-28 md:w-36 md:h-36 z-30 drop-shadow-xl transform -rotate-12 pointer-events-none">
                            <Image
                                src="/about-us/flowers.png"
                                alt="Decorative flowers"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT COLUMN (Text Content) ================= */}
                {/* Right column (58%) */}
                <div className="w-full lg:w-[58%] flex flex-col justify-between items-start z-10 pt-4 lg:pt-[8px] lg:pb-[10px]">

                    {/* Headings & Paragraph */}
                    <div className="w-full flex flex-col items-start gap-5">
                        <h2 className="font-bodoni w-full text-[#4A3234] text-[24px] sm:text-[28px] md:text-[34px] leading-[1.45]">
                            <span className="font-script text-[#C17F78] text-[48px] sm:text-[56px] md:text-[68px] font-bold mr-3 align-baseline">Orisil</span>
                            <span className="font-normal">is a journey built on relationships, not just jewellery, spanning over four decades.</span>
                        </h2>
                        
                        <div className="font-sans font-normal text-[#6D4C4E]/80 w-full text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] text-justify md:text-left">
                            <p className="font-bold text-[#4A3234] mb-4 text-[14px] sm:text-[15px] md:text-[16px]">✨ 40 Years of Trust… And a New Journey Begins With You ✨</p>
                            <p>
                                For more than four decades, we have not just sold jewellery — we have shared relationships, memories, and moments with our customers. Every smile, every blessing, every "thank you" has brought us to where we stand today. ❤️ Today, with the same love in our hearts, we are taking a small but very meaningful step... We are bringing our 92.5 Sterling Silver Jewellery with hallmark to the online world — through Amazon and our own website — just to reach you more easily. This is not a business move for us. This is an emotional journey... a promise that no matter how much time changes, our connection with you will always remain the same. Your trust has shaped our 40-year story. Now we need your love once again as we begin this new chapter — with new hopes, new dreams, and the same old honesty.
                            </p>
                        </div>
                    </div>

                    {/* Feature Icons Row */}
                    <div className="w-full flex flex-row flex-wrap items-center gap-x-6 gap-y-4 mt-8 pb-4">

                        {/* Feature 1 */}
                        <div className="flex items-center gap-[12px] sm:gap-[16px] group cursor-pointer shrink-0">
                            <div className="w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#C17F78]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#C17F78] group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(193,127,120,0.25)]">
                                <Star className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] text-[#C17F78] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                            </div>
                            <span className="font-bold text-[11px] sm:text-[13px] md:text-[15px] text-[#4A3234] group-hover:text-[#C17F78] transition-colors whitespace-nowrap">
                                40 Years of Trust
                            </span>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-center gap-[12px] sm:gap-[16px] group cursor-pointer shrink-0">
                            <div className="w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#C17F78]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#C17F78] group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(193,127,120,0.25)]">
                                <Gem className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] text-[#C17F78] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                            </div>
                            <span className="font-bold text-[11px] sm:text-[13px] md:text-[15px] text-[#4A3234] group-hover:text-[#C17F78] transition-colors whitespace-nowrap">
                                92.5 Sterling Silver
                            </span>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-center gap-[12px] sm:gap-[16px] group cursor-pointer shrink-0">
                            <div className="w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#C17F78]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#C17F78] group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(193,127,120,0.25)]">
                                <Heart className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] text-[#C17F78] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                            </div>
                            <span className="font-bold text-[11px] sm:text-[13px] md:text-[15px] text-[#4A3234] group-hover:text-[#C17F78] transition-colors whitespace-nowrap">
                                Crafted with Love
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
