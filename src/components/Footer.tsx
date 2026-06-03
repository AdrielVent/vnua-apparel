import React from 'react';

export function Footer() {
  return (
    <footer className="brutal-border-t py-12 px-4 md:px-8 font-mono text-xs text-black tracking-widest bg-circuit-gold">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 className="font-sans font-black text-xl text-black mb-4">[ VNUA LABS ]</h4>
          <p className="max-w-xs text-black/80 font-bold">
            Engineered systems, creative design, and technical apparel.
            Built by Adriel Ventura.
          </p>
        </div>
        <div>
          <h4 className="font-sans font-black text-black mb-4">DIVISIONS</h4>
          <ul className="space-y-2 font-bold">
            <li><a href="/labs" className="hover:text-white transition-colors">VNUA LABS</a></li>
            <li><a href="/studio" className="hover:text-white transition-colors">VNUA STUDIO</a></li>
            <li><a href="/systems" className="hover:text-white transition-colors">VNUA SYSTEMS</a></li>
            <li><a href="/arsenal" className="hover:text-white transition-colors">VNUA APPAREL</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans font-black text-black mb-4">ARCHIVE</h4>
          <ul className="space-y-2 font-bold">
            <li><a href="/archive" className="hover:text-white transition-colors">PROJECTS</a></li>
            <li><a href="/intel" className="hover:text-white transition-colors">ABOUT</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans font-black text-black mb-4">COMMUNICATIONS</h4>
          <div className="flex brutal-border bg-white transition-colors">
            <input 
              type="email" 
              placeholder="ENTER EMAIL" 
              className="bg-transparent px-3 py-2 outline-none w-full text-black placeholder-gray-500 font-bold uppercase"
            />
            <button className="bg-black hover:bg-kinetic-red text-white hover:text-black font-black px-4 py-2 transition-colors brutal-border-l">
              SYNC
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center brutal-border-t pt-8">
        <div className="font-bold">© {new Date().getFullYear()} VNUA SYSTEMS. ALL RIGHTS RESERVED.</div>
        <div className="mt-4 md:mt-0 flex gap-4 font-bold text-black">
          <span className="text-white bg-black px-2 py-1 brutal-border">SECURE CONNECTION</span>
          <span className="px-2 py-1">LAT: 40.7128° N</span>
          <span className="px-2 py-1">LON: 74.0060° W</span>
        </div>
      </div>

      <div className="mt-8 pt-4 brutal-border-t text-black/60 text-[10px] leading-relaxed font-bold">
        LEGAL NOTE: VNUA SYSTEMS IS AN OPEN-SOURCE EDUCATIONAL & CREATIVE PROTOTYPING LAB. ALL PRODUCT CONCEPTS, SOFTWARE UTILITIES, AND ARCHIVAL LOGS ARE INTENDED FOR DEMONSTRATION AND PORTFOLIO PURPOSES ONLY. THREE.JS AND GSAP ARE PROPERTIES OF THEIR RESPECTIVE MIT LICENSE HOLDERS.
      </div>
    </footer>
  );
}
