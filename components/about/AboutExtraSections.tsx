import React from 'react';
import { 
  PiTruckBold, 
  PiScalesBold, 
  PiPercentBold, 
  PiCreditCardBold, 
  PiArrowRightBold 
} from 'react-icons/pi';

const buybackSteps = [
  {
    icon: PiTruckBold,
    num: "01",
    title: "Courier It",
    text: "Simply ship the product to our registered address via courier."
  },
  {
    icon: PiScalesBold,
    num: "02",
    title: "Valuation",
    text: "The value will be calculated based on the Net Silver Weight of the product (excluding stones/beads)."
  },
  {
    icon: PiPercentBold,
    num: "03",
    title: "The Rate",
    text: "You will receive 92.5% of the prevailing market rate of pure silver at the time of return."
  },
  {
    icon: PiCreditCardBold,
    num: "04",
    title: "Instant Payment",
    text: "The calculated amount will be instantly transferred to your Bank Account, UPI, or Wallet."
  }
];

export function AboutExtraSections() {
  return (
    <div className="w-full bg-white flex flex-col">
      
      {/* Buy-Back Section - Image Left with Pink Background & White Card */}
      <section className="w-full py-16 lg:py-24 px-4 md:px-8 bg-[#F9F0F0]">
        <div className="max-w-[1320px] mx-auto w-full bg-white rounded-[24px] shadow-[0_4px_25px_rgba(74,50,52,0.02)] overflow-hidden flex flex-col lg:flex-row items-stretch lg:h-[480px]">
          
          {/* Left Column: Guarantee Image */}
          <div className="w-full lg:w-[35%] relative min-h-[300px] lg:min-h-0">
            <img 
              src="/about-us/guarantee.png" 
              alt="Lifetime Buy-Back Guarantee" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Right Column: Content Details */}
          <div className="w-full lg:w-[65%] flex flex-col justify-center px-6 md:px-10 py-10 lg:py-0 text-left">
            <h2 className="font-bodoni text-[#4A3234] text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">
              Lifetime Buy-Back Guarantee
            </h2>
            <p className="font-sans text-[#6D4C4E]/80 text-[14px] md:text-[15px] leading-relaxed max-w-[700px] mb-8">
              We value your investment. If you ever wish to sell your Orisil jewellery back to us, we offer a hassle-free buy-back policy.
            </p>
            
            {/* Step-by-Step Flow Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 lg:gap-6 w-full">
              {buybackSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-start">
                    
                    {/* Icon and Arrow Row */}
                    <div className="flex items-center justify-between w-full">
                      <div className="w-[52px] h-[52px] rounded-full bg-[#C17F78]/5 border border-[#C17F78]/10 flex items-center justify-center">
                        <IconComponent className="w-5.5 h-5.5 text-[#C17F78]" />
                      </div>
                      
                      {/* Flow Arrow pointing to the next step */}
                      {idx < buybackSteps.length - 1 && (
                        <div className="hidden md:block flex-grow border-t border-dashed border-[#C17F78]/30 mx-4 relative">
                          <PiArrowRightBold className="absolute -top-2 right-0 w-3 h-3 text-[#C17F78]/40" />
                        </div>
                      )}
                    </div>

                    {/* Step indicator */}
                    <div className="text-[10px] font-bold text-[#C17F78] uppercase tracking-wider mt-4 mb-1.5 flex items-center gap-1">
                      <span>{step.num}</span>
                      <span className="text-[8px] opacity-60">▼</span>
                    </div>

                    {/* Step Title */}
                    <h3 className="font-sans font-bold text-[#4A3234] text-[13px] md:text-[14px] uppercase tracking-wider mb-2">
                      {step.title}
                    </h3>

                    {/* Step Text */}
                    <p className="font-sans text-[#6D4C4E]/80 text-[12px] md:text-[13px] leading-relaxed">
                      {step.text}
                    </p>
                    
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
