import mobile from '../assets/images/icon-dev.svg';
import web from '../assets/images/icon-app.svg';

export default function About() {
  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">About Me</h2>
      </header>

      <section className="about-text">
        <p>
          Iam m Anas Bouzanbil, a Software Engineer from Morocco specializing in full-stack development and mobile development. I am currently studying at 1337 School, where I am expanding my skills and exploring new technologies.
        </p>
        <p>
          I work with a variety of programming languages, including C, C++, TypeScript, and JavaScript. I also have experience with frameworks like React, Next.js, NestJS, Express, and Flutter. Additionally, I work with databases like SQL and PostgreSQL, and I am familiar with tools like Docker for containerization.
        </p>
        <p>
          My goal is to build applications that are both functional and user-friendly, while also ensuring they are visually appealing. I add a personal touch to every project, making sure it stands out and delivers a seamless user experience. My mission is to help you express your message and brand in the most creative and impactful way possible.
        </p>

        <p >
          Currently i am seeking an internship
        </p>
      </section>

      <section className="service">
        <h3 className="h3 service-title">What I Do</h3>

        <ul className="service-list">
          <li className="service-item">
            <div className="service-icon-box">
              <img src={mobile.src} alt="Web Development" width={55} />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">Web Development</h4>
              <p className="service-item-text">
                High-quality development of websites at a professional level.
              </p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box">
              <img src={web.src} alt="Mobile Development" width={55} />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">Mobile Apps</h4>
              <p className="service-item-text">
                Professional development of mobile applications for iOS and Android.
              </p>
            </div>
          </li>
        </ul>
      </section>
    </article>
  );
}
