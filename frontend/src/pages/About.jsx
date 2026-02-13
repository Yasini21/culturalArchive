const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF8] to-[#F1E9DF] px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-semibold text-[#2C2A28] mb-6 tracking-tight">
            The Baduga Community
          </h1>

          <div className="w-24 h-[3px] bg-[#C2A14D] mx-auto mb-8 rounded-full"></div>

          <p className="text-lg md:text-xl text-[#5E564D] max-w-3xl mx-auto leading-relaxed">
            The Badugas are an indigenous community primarily residing in the
            Nilgiri Hills of Tamil Nadu. Their culture reflects a deep
            connection with land, agriculture, tradition, and ancestral memory.
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* ORIGINS */}
          <div className="bg-white border border-[#E8E2D8] rounded-3xl p-10 shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-[#2C2A28] mb-4">
              Origins & Identity
            </h2>
            <p className="text-[#5E564D] leading-relaxed">
              The Baduga people are traditionally agriculturalists and are
              known for their organized village system called “Hatti.”
              Their language, Badugu, is distinct and forms a strong part
              of their identity and oral heritage.
            </p>
          </div>

          {/* TRADITIONS */}
          <div className="bg-white border border-[#E8E2D8] rounded-3xl p-10 shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-[#2C2A28] mb-4">
              Rituals & Festivals
            </h2>
            <p className="text-[#5E564D] leading-relaxed">
              Festivals such as Hethai Habba are central to Baduga culture.
              These celebrations honor ancestral deities and strengthen
              community bonds through music, traditional dress, and ritual
              gatherings.
            </p>
          </div>

          {/* SOCIAL STRUCTURE */}
          <div className="bg-white border border-[#E8E2D8] rounded-3xl p-10 shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-[#2C2A28] mb-4">
              Social Structure
            </h2>
            <p className="text-[#5E564D] leading-relaxed">
              The Baduga society values collective decision-making,
              respect for elders, and close-knit family systems.
              Community traditions are preserved through storytelling
              and shared responsibilities.
            </p>
          </div>

          {/* FOOD & LIFESTYLE */}
          <div className="bg-white border border-[#E8E2D8] rounded-3xl p-10 shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-[#2C2A28] mb-4">
              Food & Daily Life
            </h2>
            <p className="text-[#5E564D] leading-relaxed">
              Agriculture plays a vital role in Baduga life.
              Traditional foods are closely tied to seasonal crops,
              reflecting harmony between culture and environment.
            </p>
          </div>

        </div>

        {/* QUOTE */}
        <div className="mt-24 text-center">
          <div className="bg-[#EFE6D8] rounded-3xl p-12 shadow-sm max-w-3xl mx-auto">
            <p className="text-xl italic text-[#7A4A2E] leading-relaxed">
              “For the Baduga community, culture is not preserved in books —
              it lives in rituals, land, language, and shared memory.”
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
