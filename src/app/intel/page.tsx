import React from 'react';
import { Hexagon, Zap, Shield, Fingerprint } from 'lucide-react';

export default function Intel() {
  return (
    <div className="p-4 md:p-8 font-sans max-w-4xl mx-auto">
      <div className="mb-16 border-b border-[#333333] pb-8 text-center">
        <Hexagon className="w-16 h-16 mx-auto mb-6 text-[#00F3FF] animate-[pulse_4s_ease-in-out_infinite]" />
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
          VNUA <span className="text-[#00F3FF]">ARCHIVE</span>
        </h1>
        <p className="font-mono text-gray-400 text-sm tracking-widest uppercase">
          Identity: ADRIEL VENTURA // Origin: 2018
        </p>
      </div>

      <div className="space-y-16">
        
        {/* Mission Statement */}
        <section className="bg-[#0A0A0A] border border-[#222222] p-8 relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#00F3FF]"></div>
          <h2 className="text-2xl font-bold tracking-widest text-white mb-6 uppercase flex items-center gap-3">
            <Zap className="text-[#00F3FF]" /> Core Directive
          </h2>
          <div className="font-mono text-gray-300 text-sm leading-relaxed space-y-4">
            <p>
              VNUA is the creative-engineering alias of Adriel Ventura. Originally conceptualized in eighth grade as a moniker for visual art and design, it has evolved into a comprehensive digital identity and prototyping lab.
            </p>
            <p>
              As a mechanical engineering student, designer, and builder, Adriel uses VNUA to bridge the gap between technical rigor and creative aesthetic. The mission is simple: apply systems-thinking to everything—from software and automation to physical hardware and technical apparel.
            </p>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0A0A0A] border border-[#222222] p-8 hover:border-[#00F3FF]/30 transition-colors">
            <Shield className="w-8 h-8 text-[#00F3FF] mb-4" />
            <h3 className="text-xl font-bold text-white mb-4 tracking-widest uppercase">Mechanical Design</h3>
            <p className="font-mono text-gray-400 text-sm">
              Applying mechanical engineering principles to product design. Using CAD, FEA simulations, and rapid prototyping to build functional hardware and tools under the VNUA LABS division.
            </p>
          </div>
          
          <div className="bg-[#0A0A0A] border border-[#222222] p-8 hover:border-[#00F3FF]/30 transition-colors">
            <Fingerprint className="w-8 h-8 text-[#00F3FF] mb-4" />
            <h3 className="text-xl font-bold text-white mb-4 tracking-widest uppercase">Digital Systems</h3>
            <p className="font-mono text-gray-400 text-sm">
              Architecting full-stack web applications, AI workflows, and digital infrastructure. VNUA SYSTEMS represents the intersection of code and creative logic.
            </p>
          </div>
        </section>

        {/* Manufacturing Log */}
        <section className="border border-[#333333] p-6 font-mono text-xs text-gray-500 bg-[#050505]">
          <h4 className="text-[#00F3FF] mb-4 tracking-widest">[ SYSTEM LOG // VNUA OS_INIT ]</h4>
          <ul className="space-y-2">
            <li>&gt; LOADING CREATIVE DIRECTIVES... [OK]</li>
            <li>&gt; SYNCING CAD REPOSITORIES... [OK]</li>
            <li>&gt; COMPILING PORTFOLIO ASSETS... [OK]</li>
            <li>&gt; ESTABLISHING SYSTEMS ARCHITECTURE... [OK]</li>
            <li className="text-white animate-pulse">&gt; VNUA LABS NOMINAL. READY TO BUILD.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
