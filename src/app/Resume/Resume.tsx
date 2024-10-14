import {   Help, School, Settings } from "react-ionicons";

export function Resume() {
  return (
    <article className="resume active" data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <School color={"#000"} height="30px" width="30px" />
          </div>

          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
             1337 - Mohammed VI Polytechnic University
            </h4>

            <span>2022 — Present</span>

            <p className="timeline-text">
            During my time at 1337, I learned a lot about real-world projects and improved my coding skills. I worked on various team projects and gained experience in problem-solving and software development.
         
            </p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Cadi Ayyad University</h4>

            <span>2021 — 2023</span>

            <p className="timeline-text">
            At the university, I gained many skills that helped me develop my soft skills, such as communication and teamwork. I participated in various programs and activities that improved my network and professional growth.
         
            </p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              High school
            </h4>

            <p className="timeline-text">
              Finishing my Higher stduies at school that prepare me to the new path of learning 
            </p>
          </li>
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <Help color={"#000"} height="30px" width="30px" />
          </div>

          <h3 className="h3">Volunteering</h3>
        </div>

        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">AIESEC Member</h4>

            <span>2023 — Present</span>

            <p className="timeline-text">
            As a member of AIESEC, I gained many socials and soft skills like effective communication and teamwork. I participated in community projects and helped organize events.
            </p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">AFCD Member</h4>

            <span>2018 — 2020</span>

            <p className="timeline-text">

            During my time at AFCD, I participated in various programs and activities that helped me improve my network and professional skills. I engaged in community service and leadership development.
         
            </p>
          </li>

        </ol>
      </section>

      <section className="timeline">
      <div className="title-wrapper">
          <div className="icon-box">
            <Settings color={"#000"} height="30px" width="30px" />
          </div>
<h3 className="h3">Technologies</h3>
        </div>

      <ul className="skills-list content-card">
        <li className="skills-item">
          <div className="title-wrapper">
            
          </div>
    <div className='separator2'></div>
    <ul className='flex flex-wrap gap-4'>
  <li>
    <a href="https://github.com/Elhazin/philosophers-dining-problem-c" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="C Programming Language">
        <i className="devicon-c-plain colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://github.com/Elhazin/HTTP_SERVER" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="C++ Programming Language">
        <i className="devicon-cplusplus-plain colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://github.com/Elhazin/WebRtc" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="JavaScript">
        <i className="devicon-javascript-plain colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/TypeScript" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="TypeScript">
        <i className="devicon-typescript-plain colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/Python_(programming_language)" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Python">
        <i className="devicon-python-plain colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://github.com/Elhazin/Java" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Java">
        <i className="devicon-java-plain colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/Dart_(programming_language)" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Dart">
        <i className="devicon-dart-plain colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
</ul>
        </li>

        <li className="skills-item">
          <div className="title-wrapper">
            <h5 className="h5">Frameworks & Libraries :</h5>
          </div>
          <div className='separator3'></div>

          <ul className='flex flex-wrap gap-4'>
  <li>
    <a href="https://en.wikipedia.org/wiki/NestJS" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="NestJS">
        <i className="devicon-nestjs-plain colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/Express.js" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Express.js">
        <i className="devicon-express-original colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Next.js">
        <i className="devicon-nextjs-original colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/React_(web_framework)" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="React">
        <i className="devicon-react-original-wordmark colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/Tailwind_CSS" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Tailwind CSS">
        <i className="devicon-tailwindcss-original colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://flutter.dev" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Flutter">
        <i className="devicon-flutter-plain colored text-5xl transition-transform"></i>
      </div>
    </a>
  </li>
</ul>
        </li>

        <li className="skills-item">
          <div className="title-wrapper">
            <h5 className="h5">Others :</h5>
          </div>
          <div className='separator4'></div>

          <ul className='flex flex-wrap gap-4'>
  <li>
    <a href="https://en.wikipedia.org/wiki/Docker_(software)" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Docker">
        <i className="devicon-docker-plain colored text-6xl iconstech"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/SQL" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="SQL">
        <i className="devicon-mysql-plain colored text-6xl iconstech"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/PostgreSQL" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="PostgreSQL">
        <i className="devicon-postgresql-plain colored text-6xl iconstech"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/MongoDB" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="MongoDB">
        <i className="devicon-mongodb-plain colored text-6xl iconstech"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Firebase">
        <i className="devicon-firebase-plain colored text-6xl iconstech"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/Socket.IO" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Socket.IO">
        <i className="devicon-socketio-original-wordmark text-6xl iconstech"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="GitHub">
        <i className="devicon-github-original colored text-6xl iconstech"></i>
      </div>
    </a>
  </li>
  <li>
    <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer">
      <div className='techonolgie' title="Git">
        <i className="devicon-git-plain colored text-6xl iconstech"></i>
      </div>
    </a>
  </li>
</ul>

        </li>
      </ul>
    </section>
    </article>
  );
}
