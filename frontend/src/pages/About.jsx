const About = () => {
  return (
    <div className="min-h-screen bg-[#FBF9F6] px-6 py-14">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-semibold text-[#2C2A28] mb-6">
          About This Archive
        </h1>

        {/* INTRO */}
        <p className="text-[#5E564D] leading-relaxed mb-6">
          This platform is a community-driven cultural archive created to
          preserve local traditions, stories, languages, rituals, and memories
          that are slowly fading from everyday life.
        </p>

        {/* WHY */}
        <h2 className="text-2xl font-semibold text-[#2C2A28] mt-10 mb-4">
          Why This Matters
        </h2>

        <p className="text-[#5E564D] leading-relaxed mb-6">
          Many cultural practices are passed down orally and never documented.
          As generations change, these memories risk being forgotten. This
          archive exists to give people a space to record and protect those
          stories for the future.
        </p>

        {/* HOW IT WORKS */}
        <h2 className="text-2xl font-semibold text-[#2C2A28] mt-10 mb-4">
          How It Works
        </h2>

        <ul className="list-disc list-inside text-[#5E564D] space-y-2 mb-6">
          <li>Anyone can explore and read published cultural stories.</li>
          <li>Users can contribute by submitting their own stories.</li>
          <li>All submissions are reviewed before being published.</li>
          <li>Approved stories become part of the public archive.</li>
        </ul>

        {/* WHO */}
        <h2 className="text-2xl font-semibold text-[#2C2A28] mt-10 mb-4">
          Who Can Contribute
        </h2>

        <p className="text-[#5E564D] leading-relaxed mb-6">
          This platform is open to students, elders, researchers, and community
          members who wish to share cultural knowledge responsibly and
          respectfully.
        </p>

        {/* FOOTER NOTE */}
        <p className="text-sm text-[#7A4A2E] mt-12">
          Preserving culture is not about the past alone — it is about carrying
          meaning into the future.
        </p>

      </div>
    </div>
  );
};

export default About;
