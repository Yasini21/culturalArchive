import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2A28]">

      {/* HERO — STRONG FIRST IMPRESSION */}
      <section
        className="
          min-h-[90vh]
          flex
          items-center
          px-6
          bg-gradient-to-br
          from-[#d89eff]
          via-[#cab773]
          to-[#d8b5b5]
          text-[#F3EBDD]
        "
      >
        <div className="max-w-5xl mx-auto">

          <h1 className="
            text-4xl
            md:text-6xl
            font-semibold
            leading-tight
            tracking-tight
            mb-6
          ">
            Stories That Time Almost Forgot.
            <br />
            <span className="text-[#212120]">
              Preserved by the People Who Lived Them.
            </span>
          </h1>

          <p className="
            max-w-2xl
            text-base
            md:text-lg
            text-[#626161]
            mb-10
          ">
            A living archive of regional traditions, food, rituals,
            languages, and memories — recorded before they disappear.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/explore")}
              className="
                bg-[#C2A14D]
                text-[#1E1E1E]
                px-7
                py-3
                rounded-none
                font-medium
                hover:bg-[#D4B35F]
                transition
              "
            >
              Explore the Archive
            </button>

            <button
              onClick={() => {
  if (token) {
    navigate("/addstory");
  } else {
    navigate("/login");
  }
}}

              className="
                border
                border-[#C2A14D]
                px-7
                py-3
                text-[#F3EBDD]
                hover:bg-[#C2A14D]
                hover:text-[#1E1E1E]
                transition
              "
            >
              Contribute a Story
            </button>
          </div>
        </div>
      </section>

      {/* DISCOVERY — NO CARDS, ARCHIVE FEEL */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#3A261C]">
              Food as Memory
            </h3>
            <p className="text-[#5E564D] leading-relaxed">
              Recipes are more than ingredients. They carry seasons,
              rituals, survival, and celebration — often remembered
              only by those who cooked them.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#3A261C]">
              Rituals & Belief
            </h3>
            <p className="text-[#5E564D] leading-relaxed">
              From harvest songs to forgotten ceremonies, these
              practices once shaped entire communities and calendars.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#3A261C]">
              Language & Voice
            </h3>
            <p className="text-[#5E564D] leading-relaxed">
              Many stories were never written down. They survived
              through voice, memory, and repetition — until now.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION — QUIET BUT POWERFUL */}
      <section className="py-24 px-6 bg-[#EFE6D8]">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            This Archive Grows Only If People Contribute.
          </h2>

          <p className="text-[#5E564D] text-lg mb-10">
            If you carry a memory, tradition, or story from your
            region — it belongs here.
          </p>

          <button
            onClick={() => {
  if (token) {
    navigate("/addstory");
  } else {
    navigate("/login");
  }
}}

            className="
              bg-[#2B1D16]
              text-[#F3EBDD]
              px-10
              py-4
              font-medium
              hover:bg-[#3A261C]
              transition
            "
          >
            Preserve a Story
          </button>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-[#6B5B52]">
        © {new Date().getFullYear()} Cultural Archive • Memory before it fades
      </footer>

    </div>
  );
};

export default Home;
