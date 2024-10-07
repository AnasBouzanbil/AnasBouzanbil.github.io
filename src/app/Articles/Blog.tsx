export function Blog() {
  return (
    <article className="blog active" data-page="blog">
      <header>
        <h2 className="h2 article-title">Blog</h2>
      </header>

      <section className="blog-posts">
        <ul className="blog-posts-list">
          <li className="blog-post-item">
            <a href="#">
            <figure className="blog-banner-box">
                <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*M32I7RmAcg5U_rs6J6jXCQ.png" alt="Building a Fun and Interactive ..." loading="lazy" />
              </figure>

              <div className="blog-content">

                <div className="blog-meta">
                  <p className="blog-category"> </p>
                  <span className="dot"></span>
                  <time dateTime="2024-03-05">Mar 5, 2024</time>
                </div>

                <h3 className="h3 blog-item-title">Building a Fun and Interactive ...</h3>

                <p className="blog-text">
                  Creating a Discord bot using Python is a fun and easy task ...
                </p>

              </div>
            </a>
          </li>

          <li className="blog-post-item">
            <a href="#">
            <figure className="blog-banner-box">
                <img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*G0F-OjbEWl2fux_hJMf_jA.png" alt="Creating a telegram bot" loading="lazy" />
              </figure>

              <div className="blog-content">

                <div className="blog-meta">
                  <p className="blog-category">Bot</p>
                  <span className="dot"></span>
                  <time dateTime="2022-02-23">Feb 23, 2022</time>
                </div>

                <h3 className="h3 blog-item-title">Creating a telegram bot</h3>

                <p className="blog-text">
                  Once, I was feeling bored, and I wanted to chat ...
                </p>

              </div>
            </a>
          </li>

          <li className="blog-post-item">
          <a href="#">

              <figure className="blog-banner-box">
                <img src="https://cdn.thenewstack.io/media/2021/08/4ce8bc99-git.png" alt="Git VS GitHub" loading="lazy" />
              </figure>

              <div className="blog-content">

                <div className="blog-meta">
                  <p className="blog-category">Explain</p>
                  <span className="dot"></span>
                  <time dateTime="2022-02-23">Feb 23, 2022</time>
                </div>

                <h3 className="h3 blog-item-title">Git VS GitHub</h3>

                <p className="blog-text">
                  A small definition of Git: it’s a tool that helps developers keep track of changes in their code! ...
                </p>

              </div>

            </a>
          </li>

          <li className="blog-post-item">
            <a href="#">
              <figure className="blog-banner-box">
                <img
                  src="https://miro.medium.com/v2/resize:fit:786/format:webp/1*rzt-hLMxh3w9y9ty76CSqQ.png"
                  alt="UI interactions of the week"
                  loading="lazy"
                />
              </figure>

              <div className="blog-content">
                <div className="blog-meta">
                  <p className="blog-category">Explination</p>

                  <span className="dot"></span>

                  <time dateTime="2022-02-23">Aug 26, 2024</time>
                </div>

                <h3 className="h3 blog-item-title">
                Understanding the Basics: Authentication vs. Authorization
                </h3>

                <p className="blog-text">
                As a beginner, I often heard the terms authentication and authorization, but I never really ...
                </p>
              </div>
            </a>
          </li>

          <li className="blog-post-item">
            <a href="#">
            <figure className="blog-banner-box">
                <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*yTFIGS7GezG1vp4VZRtPCw.png" alt="Dining Philosophers Problem" loading="lazy" />
              </figure>

              <div className="blog-content">

                <div className="blog-meta">
                  <p className="blog-category">Explain</p>
                  <span className="dot"></span>
                  <time dateTime="2023-11-15">Nov 15, 2023</time>
                </div>

                <h3 className="h3 blog-item-title">Dining Philosophers Problem</h3>

                <p className="blog-text">
                  Have you ever heard of the dining philosophers problem? ...
                </p>

              </div>
            </a>
          </li>

        </ul>
      </section>
    </article>
  );
}
