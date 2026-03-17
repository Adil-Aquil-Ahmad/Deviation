import React from 'react';
import Animation from './components/Animation';
import bannerImage from '../Banner.png';
import devLogo from '../DevLogo.png';
import googleLogo from '../image.png';

const stages = [
  {
    day: '15',
    month: 'Mar',
    window: '15 Mar 26, 12:00 AM IST -> 01 Apr 26, 11:59 AM IST',
    title: 'Mandatory Registration Task',
    subtitle: 'On Go to Unstop Home Page',
    description:
      "Lock in your spot by completing the mandatory registration form and officially begin your journey at Devcation Delhi 2026. Don't miss your chance to be part of the innovation, collaboration, and chaos that makes Devcation unforgettable!",
    link: 'https://forms.gle/nNuA4GM5tf2JSUW89',
    live: true,
  },
  {
    day: '3',
    month: 'Apr',
    window: '03 Apr 26, 12:00 AM IST -> 04 Apr 26, 11:59 AM IST',
    title: "Hack 'N' Solve Submission round",
    subtitle: 'On Go to Unstop Home Page',
    description:
      'Teams must submit their project via the Google Form, including a PPT, GitHub repository, and deployed demo link. All fields are mandatory and will be used to shortlist teams for the next round of Devcation Delhi 2026!',
    link: '',
    live: false,
  },
  {
    day: '5',
    month: 'Apr',
    window: '05 Apr 26, 12:00 PM IST -> 07 Apr 26, 11:59 AM IST',
    title: 'Mentorship Round',
    subtitle: 'On Go to Unstop Home Page',
    description:
      'Shortlisted teams will receive mentorship from experts to refine their projects. This is an eliminatory round, and teams will be evaluated based on their progress and implementation to advance to the final stage of Devcation Delhi 2026.',
    link: '',
    live: false,
  },
  {
    day: '12',
    month: 'Apr',
    window: '12 Apr 26, 11:00 AM IST -> 12 Apr 26, 06:00 PM IST',
    title: 'Grand Finale at IIT Delhi',
    subtitle: '',
    description:
      'The best teams make it to IIT Delhi to pitch their solutions live. Present your project, impress the judges, and battle it out for the top prizes at the Devcation Delhi 2026 Grand Finale.',
    link: '',
    live: false,
  },
];

const App = () => {
  return (
    <div className="pixel-grid relative min-h-screen overflow-x-hidden bg-dark-base text-white">
      <Animation className="fixed inset-0 z-0 pointer-events-none opacity-90" intensity={1.0} />

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 border-b-3 border-teal-accent/30 bg-dark-base/90 backdrop-blur-md" data-purpose="main-nav">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="block-element flex h-9 w-9 items-center justify-center overflow-hidden bg-teal-accent p-0.5">
                  <img alt="Devcation logo" className="h-full w-full object-contain" src={devLogo} />
                </div>
                <span className="text-xl font-extrabold tracking-tighter text-white">
                  DEVCATION <span className="text-teal-accent">2026</span>
                </span>
              </div>
              <div className="hidden space-x-8 text-sm font-semibold uppercase tracking-wide md:flex">
                <a className="transition-colors hover:text-teal-accent" href="#about">About</a>
                <a className="transition-colors hover:text-teal-accent" href="#timeline">Timeline</a>
                <a className="transition-colors hover:text-teal-accent" href="#details">Details</a>
                <a className="transition-colors hover:text-teal-accent" href="#contact">Contact</a>
              </div>
              <button className="btn-blocky block-element bg-teal-accent px-6 py-2 text-sm font-bold uppercase text-dark-base">Register Now</button>
            </div>
          </div>
        </nav>

        <section className="lush-gradient-bg relative overflow-hidden pb-24 pt-12" id="about">
          <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:flex-row lg:px-8">
            <div className="z-10 w-full text-left lg:w-1/2" data-purpose="hero-text">
              <div className="mb-6 inline-block border-l-4 border-teal-accent pl-4">
                <p className="font-mono text-sm font-bold uppercase tracking-widest text-teal-accent">Lush Biotech &amp; Engineering</p>
              </div>
              <h1 className="mb-6 text-5xl font-black leading-none lg:text-7xl">
                HACK <span className="text-moss-mid">'N'</span> <br />
                <span className="text-teal-accent">SOLVE</span>
              </h1>
              <p className="mb-10 max-w-lg text-lg font-medium leading-relaxed text-moss-light">
                Devcation Delhi 2026 is the flagship hackathon organized by Google Developer Groups IGDTUW in collaboration with GDG IIT Delhi. Through talks, workshops, mentorship, and intense hacking, participants build impactful solutions and showcase them at the Grand Finale at IIT Delhi.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-blocky block-element bg-teal-accent px-10 py-4 text-lg font-extrabold uppercase text-dark-base">Get Started</button>
                <button className="block-element border-3 border-moss-mid bg-transparent px-10 py-4 text-lg font-extrabold uppercase text-moss-mid transition-all hover:bg-moss-mid hover:text-white">View Guide</button>
              </div>
            </div>

            <div className="relative mt-16 w-full lg:mt-0 lg:w-1/2" data-purpose="hero-image">
              <div className="absolute inset-0 rounded-full bg-teal-accent/10 blur-3xl" />
              <img
                alt="Devcation Delhi 2026 event banner"
                className="relative z-10 mx-auto w-full max-w-[760px] rounded-[32px] border-3 border-teal-accent/30 shadow-[0_0_45px_rgba(15,158,153,0.24)]"
                src={bannerImage}
              />
            </div>
          </div>
        </section>

        <section className="py-24" id="timeline">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Stages and Timelines</h2>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-moss-mid">Official Event Schedule</p>
            </div>
            <div className="grid gap-6">
              {stages.map((stage) => (
                <article className="block-element border-3 border-moss-mid bg-dark-base/75 p-6" key={`${stage.day}-${stage.month}-${stage.title}`}>
                  <div className="mb-4 flex flex-wrap items-center gap-4">
                    <div className="block-element border-3 border-teal-accent bg-dark-base px-4 py-2 text-center">
                      <p className="text-2xl font-black text-teal-accent">{stage.day}</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-moss-light">{stage.month}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss-mid">{stage.window}</p>
                      <h4 className="mt-1 text-2xl font-black text-white">{stage.title}</h4>
                      {stage.subtitle ? <p className="text-sm font-semibold text-teal-accent">{stage.subtitle}</p> : null}
                    </div>
                    {stage.live ? <span className="block-element border border-teal-accent bg-teal-accent px-3 py-1 text-xs font-black uppercase text-dark-base">Live</span> : null}
                  </div>
                  <p className="text-moss-light">{stage.description}</p>
                  {stage.link ? (
                    <a className="mt-3 inline-block font-bold text-teal-accent underline" href={stage.link} rel="noreferrer" target="_blank">
                      {stage.link}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y-3 border-moss-deep bg-dark-base/75 py-24" id="details">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-black text-white">All that you need to know about Devcation Hack 'N' Solve</h2>
            <p className="mb-4 text-moss-light">
              Brace yourselves for a wild ride through innovation, where agile minds collide, crazy projects come to life, and big ideas chase even bigger rewards. #NextStopDevcation
            </p>
            <p className="mb-8 text-moss-light">Participants can compete across multiple tracks, including TigerGraph Track (premium track) and more tracks to be announced soon.</p>

            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <div className="block-element border-3 border-moss-mid bg-moss-deep/15 p-6">
                <h3 className="mb-2 text-xl font-black text-white">Important dates &amp; deadlines</h3>
                <p className="text-moss-light">02 Apr 26, 11:59 AM IST</p>
                <p className="font-bold text-teal-accent">Registration Deadline</p>
              </div>
              <div className="block-element border-3 border-teal-accent bg-moss-deep/15 p-6">
                <h3 className="mb-2 text-xl font-black text-white">WhatsApp group</h3>
                <a className="font-bold text-teal-accent underline" href="https://chat.whatsapp.com/GSnoBtuBmpODdbRCf8MYxk?mode=hq1tcli" rel="noreferrer" target="_blank">
                  Join Community Channel
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-dark-base/75 py-20" id="contact">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="block-element border-3 border-moss-mid bg-moss-deep/15 p-6">
              <h3 className="mb-3 text-xl font-black text-white">Contact the organisers</h3>
              <p className="text-moss-light">Support: dscigdtuw@gmail.com</p>
              <p className="text-moss-light">Phone: +91 96255 80383</p>
            </div>
          </div>
        </section>

        <footer className="border-t-3 border-teal-accent bg-dark-base py-12">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-8 flex justify-center">
              <div className="flex items-center gap-4">
                <img alt="Google Developer Groups logo" className="h-12 w-12 object-contain" src={googleLogo} />
                <div className="text-left">
                  <p className="font-bold leading-tight text-white">Google Developer Groups on Campus</p>
                  <p className="text-sm font-bold text-teal-accent">IGDTUW x IITD</p>
                </div>
              </div>
            </div>
            <p className="mb-4 text-xs uppercase tracking-[0.5em] text-moss-mid">© 2026 Devcation. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
