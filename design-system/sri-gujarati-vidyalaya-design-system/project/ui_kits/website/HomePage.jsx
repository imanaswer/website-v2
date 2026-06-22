/* Home page composition */
(function () {
  const { Hero, TrustBar, About, Glance, Academics, Facilities } = window.HomeParts1;
  const { Timeline, Principal, Testimonials, News, AdmissionsCTA } = window.HomeParts2;

  function HomePage({ onNavigate }) {
    return (
      <div>
        <Hero onNavigate={onNavigate} />
        <TrustBar />
        <About onNavigate={onNavigate} />
        <Glance />
        <Academics onNavigate={onNavigate} />
        <Facilities />
        <Timeline />
        <Principal onNavigate={onNavigate} />
        <Testimonials />
        <News onNavigate={onNavigate} />
        <AdmissionsCTA onNavigate={onNavigate} />
      </div>
    );
  }
  window.HomePage = HomePage;
})();
