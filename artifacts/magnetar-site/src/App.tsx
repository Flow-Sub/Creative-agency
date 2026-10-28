import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlasmaWave from "@/components/PlasmaWave";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";

const queryClient = new QueryClient();

function Home() {
  const [source, setSource] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [heroEffectRoot, setHeroEffectRoot] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    let active = true;

    fetch(`${import.meta.env.BASE_URL}source-page.html`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load the supplied page.");
        return response.text();
      })
      .then((html) => {
        const mediaUrl = (filename: string) =>
          new URL(
            `${import.meta.env.BASE_URL}media/${filename}`,
            window.location.origin,
          ).href;

        const magnetarLogo = `data:image/svg+xml,${encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="867" height="285" viewBox="0 0 867 285"><text x="0" y="220" fill="#17131F" font-family="sans-serif" font-size="190" font-weight="600" letter-spacing="-8">Magnetar</text></svg>',
        )}`;
        const showReelGif =
          "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f5b28f227363261.683ede07e3f41.gif";
        const heroArtwork = mediaUrl("hero/ai-headphones-cutout-v3.png");
        const heroMarkup = `
          <section class="hero-section magnetar-hero">
            <div id="magnetar-plasma-wave-root" aria-hidden="true"></div>
            <div class="magnetar-hero-glow magnetar-hero-glow-one" aria-hidden="true"></div>
            <div class="magnetar-hero-glow magnetar-hero-glow-two" aria-hidden="true"></div>
            <div class="w-layout-blockcontainer container w-container magnetar-hero-container">
              <div class="magnetar-hero-shell">
                <div class="magnetar-hero-copy">
                  <div class="magnetar-hero-eyebrow"><span></span>AI + AUTOMATION STUDIO</div>
                  <h1 class="magnetar-hero-title">
                    <span>Turning ideas</span>
                    <span>into <em>intelligent</em></span>
                    <span class="magnetar-hero-title-final"><i aria-hidden="true"></i><em>systems</em></span>
                  </h1>
                  <p class="magnetar-hero-summary">We design AI agents, automated workflows, and digital products that turn ambitious business ideas into systems built to perform.</p>
                  <div class="magnetar-hero-actions">
                    <a href="#email-form" class="magnetar-hero-primary">Start a project <span aria-hidden="true">&#8599;</span></a>
                    <a href="#Jump-Section" class="magnetar-hero-secondary">Explore services <span aria-hidden="true">&#8595;</span></a>
                  </div>
                  <div class="magnetar-hero-proof">
                    <div><strong>AI-first</strong><span>Strategy &amp; systems</span></div>
                    <div><strong>End-to-end</strong><span>Design &amp; development</span></div>
                    <div><strong>Built to scale</strong><span>From MVP to platform</span></div>
                  </div>
                </div>
                <div class="magnetar-hero-visual">
                  <div class="magnetar-hero-visual-index"><i aria-hidden="true"></i><span>AI SYSTEM</span><strong>ONLINE</strong></div>
                  <div class="magnetar-hero-image-frame">
                    <img src="${heroArtwork}" loading="eager" fetchpriority="high" alt="Futuristic AI system represented by a black chrome humanoid wearing headphones" class="magnetar-hero-art"/>
                  </div>
                  <div class="magnetar-hero-status">
                    <span class="magnetar-hero-status-icon" aria-hidden="true">&#10022;</span>
                    <span><small>MAGNETAR SYSTEMS</small>Building smarter workflows</span>
                    <span class="magnetar-hero-status-pulse" aria-hidden="true"></span>
                  </div>
                  <div class="magnetar-hero-orbit" aria-hidden="true"><span></span></div>
                </div>
              </div>
              <div class="magnetar-hero-capabilities" aria-label="Core capabilities">
                <span>AI Agents</span><i></i><span>Automation</span><i></i><span>CRM Systems</span><i></i><span>Web &amp; Apps</span>
              </div>
            </div>
          </section>
        `;
        const serviceImages = {
          automation:
            "https://mir-s3-cdn-cf.behance.net/projects/404/a46a89254117655.Y3JvcCwyMzAxLDE4MDAsNTEsMA.png",
          crm: "https://miro.medium.com/v2/resize:fit:2000/1*cq0MC0xQULlxSy7UHq003A.jpeg",
          businessAutomation:
            "https://miro.medium.com/v2/resize:fit:720/format:webp/0*HKoWtScXPgyhoeUO",
          aiAgent:
            "https://cdn.dribbble.com/userupload/48473518/file/d75fa40744bda9c9f11c9e4a99c017d2.jpg?resize=400x0",
          chatbot:
            "https://sendbird.imgix.net/cms/Chatbot-UI_Ecommerce-and-customer-service-chatbots.png",
          development:
            "https://jbs-api-server.vercel.app/images/service-ux-ui.jpg",
        };
        const services = [
          {
            title: "Automation",
            image: serviceImages.automation,
            alt: "Technology hardware representing connected automation systems",
            label: "Workflow systems",
            description:
              "Connected automations that remove repetitive work and keep operations moving.",
          },
          {
            title: "CRM Systems",
            image: serviceImages.crm,
            alt: "Customer relationship management analytics dashboard",
            label: "Customer operations",
            description:
              "Clear customer pipelines, intelligent follow-ups, and data your team can act on.",
          },
          {
            title: "Business Automation",
            image: serviceImages.businessAutomation,
            alt: "Business automation analytics and performance data",
            label: "Business platforms",
            description:
              "Purpose-built systems that connect people, processes, and business intelligence.",
          },
          {
            title: "AI Agents",
            image: serviceImages.aiAgent,
            alt: "Artificial intelligence agent technology",
            label: "Autonomous intelligence",
            description:
              "Task-focused AI agents that reason, respond, and work across your tools.",
          },
          {
            title: "Advanced RAG-Powered Chatbots",
            image: serviceImages.chatbot,
            alt: "Conversational artificial intelligence chatbot assistant",
            label: "Conversational AI",
            description:
              "Knowledge-grounded assistants delivering accurate answers from your business data.",
          },
          {
            title: "Web &amp; App Development",
            image: serviceImages.development,
            alt: "Web and application development code",
            label: "Digital products",
            description:
              "Fast, thoughtful web and app experiences engineered for real-world growth.",
          },
        ];
        const serviceCardClasses = [
          "home-marquee-item-box",
          "home-marquee-item-box home-marquee-mt-box",
          "home-marquee-item-two",
          "home-marquee-item-box home-marquee-mt-box",
          "home-marquee-item-box",
          "home-marquee-item-box home-marquee-mt-box",
        ];
        const serviceCardsMarkup = services
          .map(
            (service, index) =>
              `<div class="${serviceCardClasses[index]} magnetar-service-copy-card"><!-- Saved service image (intentionally disabled): <img src="${service.image}" alt="${service.alt}"/> --><div class="home-marquee-image magnetar-service-copy-panel"><span class="magnetar-service-copy-label">${service.label}</span><div><h3>${service.title}</h3><p>${service.description}</p></div><span class="magnetar-service-copy-line" aria-hidden="true"></span></div></div>`,
          )
          .join("");
        const servicesHorizontalTrailPath =
          "M-90 248 C70 30 295 22 375 190 C445 338 275 398 215 272 C145 120 402 38 620 184 C790 298 890 392 1035 258 C1170 132 1032 0 908 102 C770 215 984 382 1205 218 C1390 82 1542 38 1628 184 C1718 338 1522 402 1478 252 C1428 78 1742 40 2088 218";
        const servicesHorizontalTrailMarkup = `
          <div class="magnetar-services-horizontal-trail" aria-hidden="true">
            <div class="magnetar-services-horizontal-motion">
              <svg viewBox="0 0 2000 420" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="magnetar-services-horizontal-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#5638c7"/>
                    <stop offset="38%" stop-color="#8b6cff"/>
                    <stop offset="72%" stop-color="#c0a9ff"/>
                    <stop offset="100%" stop-color="#7048e8"/>
                  </linearGradient>
                </defs>
                <path class="magnetar-services-horizontal-glow" d="${servicesHorizontalTrailPath}"/>
                <path class="magnetar-services-horizontal-line" d="${servicesHorizontalTrailPath}"/>
              </svg>
            </div>
          </div>
        `;
        const servicesFlowScript = `
          <script>
            (() => {
              const initMagnetarServices = () => {
                const section = document.querySelector('.home-marquee-section');
                if (!section || section.dataset.trailReady) return;
                section.dataset.trailReady = 'true';

                const motion = section.querySelector('.magnetar-services-horizontal-motion');
                const trail = section.querySelector('.magnetar-services-horizontal-line');
                const trailGlow = section.querySelector('.magnetar-services-horizontal-glow');
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                if (reducedMotion || !window.gsap || !window.ScrollTrigger || !motion || !trail || !trailGlow) {
                  section.classList.add('is-static');
                  return;
                }

                window.gsap.registerPlugin(window.ScrollTrigger);
                const trailLength = trail.getTotalLength();
                window.gsap.set([trail, trailGlow], {
                  strokeDasharray: trailLength,
                  strokeDashoffset: trailLength,
                });

                const trailTimeline = window.gsap.timeline({
                  scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: .85,
                    invalidateOnRefresh: true,
                  },
                });
                trailTimeline
                  .fromTo(motion, { xPercent: -7 }, { xPercent: 7, ease: 'none' }, 0)
                  .to([trailGlow, trail], { strokeDashoffset: 0, ease: 'none' }, 0);

                window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
              };

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initMagnetarServices, { once: true });
              } else {
                initMagnetarServices();
              }
            })();
          </script>
        `;
        const testimonials = [
          {
            sourceTitle: "Designing Meaningful Digital Journeys",
            role: "★★★★★ · Operations Lead",
            client: "B2B SaaS Team",
            quote:
              "Magnetar replaced hours of repetitive work with one reliable automation flow. Our team finally has room to focus on growth.",
          },
          {
            sourceTitle: "Building Brands Through Powerful Graphic Design",
            role: "★★★★★ · Product Founder",
            client: "Fintech Product Team",
            quote:
              "They turned a complex product vision into a clear, scalable platform that customers understood immediately.",
          },
          {
            sourceTitle: "Development That Delivers Performance &amp; Scale",
            role: "★★★★★ · Customer Experience Lead",
            client: "Commerce Growth Team",
            quote:
              "The AI agent feels like part of our operations team—fast, accurate, and genuinely useful from day one.",
          },
        ];
        const testimonialImages = {
          operations:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85",
          fintech:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
          commerce:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
        };
        const feedbackTestimonials = [
          {
            role: "Operations Lead",
            client: "B2B SaaS Team",
            focus: "Workflow Automation",
            image: testimonialImages.operations,
            quote:
              "Magnetar replaced hours of repetitive work with one reliable automation flow. Our team finally has room to focus on growth.",
          },
          {
            role: "Product Founder",
            client: "Fintech Product Team",
            focus: "Fintech Platform",
            image: testimonialImages.fintech,
            quote:
              "They turned a complex product vision into a clear, scalable platform that customers understood immediately.",
          },
          {
            role: "Customer Experience Lead",
            client: "Commerce Growth Team",
            focus: "AI Customer Experience",
            image: testimonialImages.commerce,
            quote:
              "The AI agent feels like part of our operations team—fast, accurate, and genuinely useful from day one.",
          },
          {
            role: "Revenue Operations Director",
            client: "Growth Systems Team",
            focus: "CRM Intelligence",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
            quote:
              "We finally have one clear pipeline, reliable reporting, and follow-ups that happen without constant chasing.",
          },
        ];
        const feedbackCardsMarkup = feedbackTestimonials
          .map(
            (testimonial, index) => `
              <article class="magnetar-feedback-card">
                <div class="magnetar-feedback-card-top">
                  <span class="magnetar-feedback-stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span class="magnetar-feedback-index">0${index + 1}</span>
                </div>
                <span class="magnetar-feedback-mark" aria-hidden="true">&ldquo;</span>
                <blockquote class="magnetar-feedback-quote">${testimonial.quote}</blockquote>
                <div class="magnetar-feedback-card-footer">
                  <div class="magnetar-feedback-profile">
                    <img src="${testimonial.image}" loading="lazy" decoding="async" alt="${testimonial.client} team"/>
                    <div>
                      <strong>${testimonial.client}</strong>
                      <span>${testimonial.role}</span>
                    </div>
                  </div>
                  <span class="magnetar-feedback-focus">${testimonial.focus}</span>
                </div>
              </article>`,
          )
          .join("");
        const feedbackMarkup = `
          <section id="client-feedback" class="home-blog-section magnetar-feedback-section" aria-labelledby="magnetar-feedback-title">
            <div class="magnetar-feedback-atmosphere" aria-hidden="true">
              <span class="magnetar-feedback-orb magnetar-feedback-orb-one"></span>
              <span class="magnetar-feedback-orb magnetar-feedback-orb-two"></span>
            </div>
            <div class="w-layout-blockcontainer container w-container magnetar-feedback-container">
              <div class="magnetar-feedback-header">
                <div>
                  <div class="magnetar-feedback-kicker"><span></span> CLIENT SIGNALS / 04</div>
                  <h2 id="magnetar-feedback-title">Client <em>feedback</em></h2>
                </div>
                <div class="magnetar-feedback-intro">
                  <p>What ambitious teams say after building smarter systems with Magnetar.</p>
                  <a href="#email-form" class="magnetar-feedback-cta"><span>Start a project</span><span aria-hidden="true">&#8599;</span></a>
                </div>
              </div>
              <div class="magnetar-feedback-grid">${feedbackCardsMarkup}</div>
            </div>
          </section>
        `;
        const projectGifs = {
          hyrox:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/09804a82963291.5d308c3850e2c.gif",
          zentro:
            "https://ik.imagekit.io/fugynjpwt/Buzz%20Interactive%20Showreel%20(1)%20(online-video-cutter.com)%20(online-video-cutter.com)%20(3).mp4",
          finovo:
            "https://ik.imagekit.io/fugynjpwt/Buzz%20Interactive%20Showreel%20(1)%20(online-video-cutter.com)%20(online-video-cutter.com)%20(1).mp4",
        };
        const featuredProjects = [
          {
            title: "Hyrox",
            category: "Brand Experience / Digital",
            media: projectGifs.hyrox,
            mediaType: "image",
            alt: "Hyrox project showcase",
          },
          {
            title: "Zentro",
            category: "CRM / Automation",
            media: projectGifs.zentro,
            mediaType: "video",
            alt: "Zentro CRM automation showcase",
          },
          {
            title: "Finovo",
            category: "Fintech / Product Platform",
            media: projectGifs.finovo,
            mediaType: "video",
            alt: "Finovo platform showcase",
          },
          {
            title: "Magnetar Systems",
            category: "AI / Digital Product",
            media:
              "https://ik.imagekit.io/fugynjpwt/Buzz%20Interactive%20Showreel%20(1)%20(online-video-cutter.com)%20(online-video-cutter.com)%20(2).mp4",
            mediaType: "video",
            alt: "Magnetar Systems AI digital product showcase",
          },
        ];
        const featuredProjectCardsMarkup = featuredProjects
          .map((project, index) => {
            const mediaMarkup =
              project.mediaType === "video"
                ? `<video class="magnetar-work-asset" autoplay muted loop playsinline preload="metadata" aria-label="${project.alt}"><source src="${project.media}" type="video/mp4"></video>`
                : `<img class="magnetar-work-asset" src="${project.media}" loading="lazy" decoding="async" alt="${project.alt}"/>`;

            return `
              <div class="magnetar-work-wrapper" data-magnetar-work-wrapper>
                <article class="magnetar-work-card">
                  <div class="magnetar-work-card-link" data-magnetar-work-card>
                    <div class="magnetar-work-main-image" data-magnetar-work-image>
                      ${mediaMarkup}
                      <div class="magnetar-work-overlay" aria-hidden="true"></div>
                      <span class="magnetar-work-category">${project.category}</span>
                    </div>
                  </div>
                </article>
                <div class="magnetar-work-info" data-magnetar-work-info>
                  <div class="magnetar-work-edition"><span>&#169;</span><span>${String(index + 1).padStart(2, "0")}</span></div>
                  <h3>${project.title}</h3>
                </div>
                <div class="magnetar-work-trigger" data-magnetar-work-trigger aria-hidden="true"></div>
              </div>`;
          })
          .join("");
        const featuredProjectsMarkup = `
          <section class="home-project-section magnetar-featured-projects" aria-labelledby="magnetar-featured-title">
            <div class="w-layout-blockcontainer container w-container magnetar-featured-heading">
              <div class="magnetar-featured-kicker"><span></span> SELECTED WORK / 01&#8212;04</div>
              <div class="magnetar-featured-heading-row">
                <h2 id="magnetar-featured-title">A few of our <em>recent projects</em></h2>
                <p>Four focused systems, designed to turn ambitious ideas into useful digital products.</p>
              </div>
            </div>
            <div class="magnetar-work-list">${featuredProjectCardsMarkup}</div>
          </section>
        `;
        const featuredProjectsScript = `
          <script>
            (() => {
              const initMagnetarProjects = () => {
                const section = document.querySelector('.magnetar-featured-projects');
                const wrappers = section ? Array.from(section.querySelectorAll('[data-magnetar-work-wrapper]')) : [];
                if (!section || wrappers.length !== 4 || section.dataset.projectsReady) return;
                section.dataset.projectsReady = 'true';

                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                const desktop = window.matchMedia('(min-width: 992px)').matches;
                if (reducedMotion || !desktop || !window.gsap || !window.ScrollTrigger) {
                  section.classList.add('is-static');
                  return;
                }

                window.gsap.registerPlugin(window.ScrollTrigger);

                wrappers.forEach((wrapper) => {
                  const card = wrapper.querySelector('[data-magnetar-work-card]');
                  const imageFrame = wrapper.querySelector('[data-magnetar-work-image]');
                  const asset = wrapper.querySelector('.magnetar-work-asset');
                  const info = wrapper.querySelector('[data-magnetar-work-info]');
                  const trigger = wrapper.querySelector('[data-magnetar-work-trigger]');
                  if (!card || !imageFrame || !asset || !info || !trigger) return;

                  const cardTimeline = window.gsap.timeline({
                    scrollTrigger: {
                      trigger: wrapper,
                      start: 'top bottom',
                      end: 'bottom top',
                      scrub: 1.35,
                      invalidateOnRefresh: true,
                    },
                  });

                  cardTimeline
                    .fromTo(card, {
                      scale: .5,
                      rotation: 18,
                    }, {
                      scale: 1,
                      rotation: 0,
                      duration: .45,
                      ease: 'none',
                    }, 0)
                    .to(card, {
                      scale: .4,
                      rotation: -18,
                      duration: .55,
                      ease: 'none',
                    }, .45)
                    .fromTo(imageFrame, {
                      y: '10vh',
                    }, {
                      y: '0vh',
                      duration: .45,
                      ease: 'none',
                    }, 0)
                    .to(imageFrame, {
                      y: '-50vh',
                      duration: .55,
                      ease: 'none',
                    }, .45)
                    .fromTo(asset, {
                      scale: 3,
                      rotation: 8,
                    }, {
                      scale: 1,
                      rotation: 0,
                      duration: .45,
                      ease: 'none',
                    }, 0)
                    .to(asset, {
                      scale: 3,
                      rotation: -8,
                      duration: .55,
                      ease: 'none',
                    }, .45);

                  const exitTimeline = window.gsap.timeline({
                    scrollTrigger: {
                      trigger,
                      start: 'top bottom',
                      end: 'top top',
                      scrub: .7,
                      invalidateOnRefresh: true,
                    },
                  });

                  exitTimeline
                    .fromTo(wrapper, { y: '0vh' }, { y: '45vh', duration: 1, ease: 'none' }, 0)
                    .fromTo(info, { y: '0vh' }, { y: '-10vh', duration: 1, ease: 'none' }, 0)
                    .to(info, { opacity: 0, duration: .1, ease: 'none' }, 0);
                });

                window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
              };

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initMagnetarProjects, { once: true });
              } else {
                initMagnetarProjects();
              }
            })();
          </script>
        `;
        /*
         * Spline footer disabled: the generated WebP visual below replaces it.
         * Keep this block commented so the heavy runtime and scene never load.
         *
        const splineSceneUrl =
          "https://prod.spline.design/VN3BSAXMNlQqV5rR/scene.splinecode";
        const footerSplineMarkup =
          '<div class="magnetar-footer-spline"><canvas id="magnetar-footer-canvas" aria-hidden="true"></canvas><button class="magnetar-spline-load" type="button"><span>Load 3D experience</span><span aria-hidden="true">&#8599;</span></button></div>';
        const footerSplineLoaderScript = `
          <script type="module">
            const splineContainer = document.querySelector('.magnetar-footer-spline');
            const splineCanvas = document.querySelector('#magnetar-footer-canvas');
            const splineLoadButton = document.querySelector('.magnetar-spline-load');
            let splineApplication;
            let splineRuntimePromise;

            const getSplineRuntime = () => {
              if (!splineRuntimePromise) {
                splineRuntimePromise = import(
                  'https://unpkg.com/@splinetool/runtime@2.0.76/build/runtime.js'
                );
              }
              return splineRuntimePromise;
            };

            const loadFooterSpline = async () => {
              if (!splineContainer || !splineCanvas || splineContainer.dataset.loading || splineContainer.dataset.loaded) return;

              splineContainer.dataset.loading = 'true';
              splineContainer.classList.add('is-loading');
              splineContainer.setAttribute('aria-busy', 'true');
              if (splineLoadButton) splineLoadButton.firstElementChild.textContent = 'Loading 3D...';

              try {
                const { Application } = await getSplineRuntime();
                splineApplication = new Application(splineCanvas);
                await splineApplication.load('${splineSceneUrl}');
                splineContainer.dataset.loaded = 'true';
                splineContainer.classList.add('is-loaded');
              } catch (error) {
                splineContainer.classList.add('is-unavailable');
                splineRuntimePromise = undefined;
                if (splineLoadButton) {
                  splineLoadButton.disabled = false;
                  splineLoadButton.firstElementChild.textContent = 'Retry 3D experience';
                }
              } finally {
                delete splineContainer.dataset.loading;
                splineContainer.classList.remove('is-loading');
                splineContainer.removeAttribute('aria-busy');
              }
            };

            const scheduleSplineLoad = () => {
              if ('requestIdleCallback' in window) {
                window.requestIdleCallback(loadFooterSpline, { timeout: 1800 });
                return;
              }
              window.setTimeout(loadFooterSpline, 350);
            };

            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const manualLoadOnly =
              window.innerWidth < 900 ||
              Boolean(connection?.saveData) ||
              window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (splineContainer && splineCanvas) {
              splineLoadButton?.addEventListener('click', loadFooterSpline);

              if (manualLoadOnly) {
                splineContainer.classList.add('is-manual');
              } else if ('IntersectionObserver' in window) {
                const splineObserver = new IntersectionObserver(
                  (entries) => {
                    if (entries.some((entry) => entry.isIntersecting)) {
                      splineObserver.disconnect();
                      scheduleSplineLoad();
                    }
                  },
                  { rootMargin: '200px 0px' },
                );
                splineObserver.observe(splineContainer);
              } else {
                splineContainer.classList.add('is-manual');
              }
            }

            window.addEventListener(
              'pagehide',
              () => splineApplication?.dispose?.(),
              { once: true },
            );
          </script>
        `;
        */
        const footerVisualUrl = mediaUrl("footer/ai-agent-team-v1.webp");
        const footerVisualMarkup = `
          <div class="magnetar-footer-visual" aria-hidden="true">
            <div class="magnetar-footer-visual-motion">
              <img src="${footerVisualUrl}" loading="lazy" decoding="async" alt="" class="magnetar-footer-visual-image"/>
            </div>
            <div class="magnetar-footer-cursor-glow"></div>
          </div>
        `;
        const footerVisualInteractionScript = `
          <script>
            (() => {
              const visual = document.querySelector('.magnetar-footer-visual');
              const image = document.querySelector('.magnetar-footer-visual-image');
              const footer = visual?.closest('.footer');
              if (!visual || !image || !footer) return;

              const reveal = () => visual.classList.add('is-visible');
              if (image.complete) reveal();
              else image.addEventListener('load', reveal, { once: true });

              if ('IntersectionObserver' in window) {
                const activityObserver = new IntersectionObserver(([entry]) => {
                  visual.classList.toggle('is-active', entry.isIntersecting);
                }, { rootMargin: '120px 0px' });
                activityObserver.observe(visual);
              } else {
                visual.classList.add('is-active');
              }

              const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              const precisePointer = window.matchMedia('(pointer: fine)').matches;
              if (reducedMotion || !precisePointer) return;

              let frame = 0;
              let pointerX = 0;
              let pointerY = 0;

              const paint = () => {
                visual.style.setProperty('--footer-move-x', pointerX + 'px');
                visual.style.setProperty('--footer-move-y', pointerY + 'px');
                visual.style.setProperty('--footer-light-x', 50 + pointerX * 1.8 + '%');
                visual.style.setProperty('--footer-light-y', 48 + pointerY * 1.8 + '%');
                frame = 0;
              };

              footer.addEventListener('pointermove', (event) => {
                const bounds = footer.getBoundingClientRect();
                pointerX = ((event.clientX - bounds.left) / bounds.width - .5) * 18;
                pointerY = ((event.clientY - bounds.top) / bounds.height - .5) * 12;
                if (!frame) frame = window.requestAnimationFrame(paint);
              }, { passive: true });

              footer.addEventListener('pointerleave', () => {
                pointerX = 0;
                pointerY = 0;
                if (!frame) frame = window.requestAnimationFrame(paint);
              });
            })();
          </script>
        `;
        const scopedEnhancementCss = `
          <style id="magnetar-scoped-enhancements">
            .hero-section {
              font-family: "Segoe UI Variable Display", "Segoe UI", Inter, Arial, sans-serif !important;
              font-synthesis: none;
              isolation: isolate;
              overflow: hidden;
              position: relative;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
            }

            #magnetar-plasma-wave-root {
              position: absolute;
              z-index: 0;
              inset: 0;
              overflow: hidden;
              pointer-events: none;
            }

            #magnetar-plasma-wave-root > div,
            #magnetar-plasma-wave-root canvas {
              position: absolute;
              inset: 0;
              display: block;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            .hero-section > .container {
              position: relative;
              z-index: 1;
            }

            .hero-section.magnetar-hero {
              min-height: 100svh;
              padding: clamp(116px, 9vw, 152px) 0 30px !important;
              background:
                radial-gradient(circle at 76% 28%, rgba(151, 127, 255, .32), transparent 32%),
                radial-gradient(circle at 13% 92%, rgba(104, 75, 204, .16), transparent 34%),
                linear-gradient(135deg, #fbfaff 0%, #f2efff 46%, #dcd5ff 100%) !important;
              color: #17131f;
            }

            .magnetar-hero::before {
              position: absolute;
              z-index: 0;
              inset: 0;
              background-image:
                linear-gradient(rgba(37, 24, 78, .035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(37, 24, 78, .035) 1px, transparent 1px);
              background-size: 72px 72px;
              content: "";
              mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
              pointer-events: none;
            }

            .magnetar-hero::after {
              position: absolute;
              z-index: 0;
              right: -18vw;
              bottom: -48vw;
              width: 76vw;
              aspect-ratio: 1;
              border: 1px solid rgba(84, 57, 176, .12);
              border-radius: 50%;
              box-shadow: inset 0 0 0 9vw rgba(255, 255, 255, .08), inset 0 0 0 18vw rgba(108, 82, 202, .04);
              content: "";
              pointer-events: none;
            }

            .magnetar-hero-glow {
              position: absolute;
              z-index: 0;
              border-radius: 999px;
              filter: blur(80px);
              pointer-events: none;
            }

            .magnetar-hero-glow-one {
              top: 12%;
              left: -9%;
              width: 30vw;
              height: 30vw;
              background: rgba(131, 103, 233, .13);
            }

            .magnetar-hero-glow-two {
              right: 5%;
              bottom: 2%;
              width: 28vw;
              height: 28vw;
              background: rgba(111, 77, 220, .18);
            }

            .magnetar-hero .magnetar-hero-container {
              z-index: 2;
              width: min(calc(100% - 48px), 1500px) !important;
              max-width: 1500px !important;
            }

            .magnetar-hero-shell {
              display: grid;
              min-height: calc(100svh - clamp(202px, 15vw, 250px));
              grid-template-columns: minmax(0, 1.08fr) minmax(440px, .92fr);
              align-items: center;
              gap: clamp(42px, 5vw, 90px);
            }

            .magnetar-hero-copy {
              position: relative;
              z-index: 3;
              padding-block: 28px;
              animation: magnetar-hero-rise .85s cubic-bezier(.22, 1, .36, 1) both;
            }

            .magnetar-hero-eyebrow {
              display: flex;
              align-items: center;
              gap: 11px;
              margin-bottom: clamp(24px, 3vw, 46px);
              color: #584d74;
              font-size: 11px;
              font-weight: 750;
              letter-spacing: .18em;
              line-height: 1;
            }

            .magnetar-hero-eyebrow > span {
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: #714fde;
              box-shadow: 0 0 0 5px rgba(113, 79, 222, .13), 0 0 24px rgba(113, 79, 222, .7);
            }

            .magnetar-hero-title {
              margin: 0;
              color: #17131f;
              font-family: "Segoe UI Variable Display", "Segoe UI", Inter, Arial, sans-serif !important;
              font-size: clamp(58px, 6vw, 110px);
              font-weight: 520;
              letter-spacing: -.072em;
              line-height: .87;
              text-wrap: balance;
            }

            .magnetar-hero-title > span {
              display: block;
              white-space: nowrap;
            }

            .magnetar-hero-title em {
              font-family: "Iowan Old Style", "Baskerville", "Times New Roman", serif;
              font-weight: 400;
              letter-spacing: -.055em;
            }

            .magnetar-hero-title-final {
              display: flex !important;
              align-items: center;
              justify-content: flex-end;
              gap: clamp(19px, 2.2vw, 38px);
              padding-right: .08em;
            }

            .magnetar-hero-title-final > i {
              width: clamp(82px, 12vw, 210px);
              height: 3px;
              background: currentColor;
              transform: translateY(.11em);
            }

            .magnetar-hero-summary {
              max-width: 600px;
              margin: clamp(28px, 3.2vw, 46px) 0 0;
              color: #514a61;
              font-size: clamp(16px, 1.25vw, 20px);
              font-weight: 430;
              letter-spacing: -.025em;
              line-height: 1.55;
            }

            .magnetar-hero-actions {
              display: flex;
              align-items: center;
              gap: 15px;
              margin-top: clamp(26px, 3vw, 42px);
            }

            .magnetar-hero-primary,
            .magnetar-hero-secondary {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 999px;
              font-size: 14px;
              font-weight: 680;
              letter-spacing: -.015em;
              line-height: 1;
              text-decoration: none;
              transition: transform .3s ease, color .3s ease, background-color .3s ease, border-color .3s ease;
            }

            .magnetar-hero-primary {
              min-width: 175px;
              gap: 22px;
              padding: 8px 9px 8px 22px;
              background: #17131f;
              box-shadow: 0 16px 35px rgba(24, 16, 48, .2);
              color: #fff;
            }

            .magnetar-hero-primary > span {
              display: grid;
              width: 37px;
              aspect-ratio: 1;
              place-items: center;
              border-radius: 50%;
              background: #a792ff;
              color: #17131f;
              font-size: 18px;
              transition: transform .3s ease;
            }

            .magnetar-hero-secondary {
              gap: 14px;
              min-height: 53px;
              padding: 0 22px;
              border: 1px solid rgba(23, 19, 31, .2);
              color: #272131;
            }

            .magnetar-hero-primary:hover,
            .magnetar-hero-secondary:hover {
              transform: translateY(-3px);
            }

            .magnetar-hero-primary:hover > span {
              transform: rotate(45deg);
            }

            .magnetar-hero-secondary:hover {
              border-color: rgba(23, 19, 31, .45);
              background: rgba(255, 255, 255, .42);
            }

            .magnetar-hero-proof {
              display: grid;
              max-width: 640px;
              margin-top: clamp(34px, 4.2vw, 64px);
              padding-top: 18px;
              border-top: 1px solid rgba(23, 19, 31, .16);
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 20px;
            }

            .magnetar-hero-proof div {
              display: grid;
              gap: 4px;
            }

            .magnetar-hero-proof strong {
              color: #262030;
              font-size: 13px;
              font-weight: 720;
              letter-spacing: -.02em;
            }

            .magnetar-hero-proof span {
              color: #716981;
              font-size: 10px;
              font-weight: 560;
              letter-spacing: .03em;
              line-height: 1.35;
              text-transform: uppercase;
            }

            .magnetar-hero-visual {
              position: relative;
              z-index: 2;
              height: min(67vh, 720px);
              min-height: 555px;
              isolation: isolate;
              animation: magnetar-hero-rise .95s cubic-bezier(.22, 1, .36, 1) .12s both;
            }

            .magnetar-hero-visual::before {
              position: absolute;
              z-index: -1;
              inset: 9% 1% 5% 2%;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(132, 99, 232, .24), rgba(132, 99, 232, .075) 46%, transparent 72%);
              content: "";
              filter: blur(22px);
              pointer-events: none;
            }

            .magnetar-hero-visual::after {
              position: absolute;
              z-index: -1;
              right: 10%;
              bottom: 1%;
              left: 10%;
              height: 11%;
              border-radius: 50%;
              background: rgba(45, 26, 103, .22);
              content: "";
              filter: blur(26px);
              transform: scaleY(.38);
              pointer-events: none;
            }

            .magnetar-hero-image-frame {
              position: absolute;
              inset: 0;
              overflow: visible;
              border: 0;
              border-radius: 0;
              background: transparent;
              box-shadow: none;
              pointer-events: none;
            }

            .magnetar-hero img.magnetar-hero-art {
              display: block;
              width: 100% !important;
              height: 100% !important;
              object-fit: contain !important;
              object-position: center bottom !important;
              filter: drop-shadow(0 34px 36px rgba(41, 25, 96, .27));
              transform: scale(1.08);
              transform-origin: center bottom;
              transition: transform .75s cubic-bezier(.22, 1, .36, 1), filter .75s ease;
            }

            .magnetar-hero-visual:hover .magnetar-hero-art {
              filter: drop-shadow(0 42px 42px rgba(41, 25, 96, .32));
              transform: translateY(-7px) scale(1.095);
            }

            .magnetar-hero-visual-index {
              position: absolute;
              z-index: 5;
              top: 27px;
              right: 4px;
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 10px 13px;
              border: 1px solid rgba(255, 255, 255, .78);
              border-radius: 999px;
              background: rgba(255, 255, 255, .61);
              box-shadow: 0 14px 38px rgba(49, 31, 105, .12), inset 0 1px rgba(255, 255, 255, .78);
              color: #272032;
              font-size: 9px;
              font-weight: 700;
              letter-spacing: .1em;
              -webkit-backdrop-filter: blur(14px);
              backdrop-filter: blur(14px);
            }

            .magnetar-hero-visual-index > i {
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: #7352d7;
              box-shadow: 0 0 0 4px rgba(115, 82, 215, .12), 0 0 15px rgba(115, 82, 215, .55);
            }

            .magnetar-hero-visual-index > strong {
              padding: 6px 8px;
              border-radius: 999px;
              background: #1a1522;
              color: #fff;
              font-size: 8px;
              font-weight: 700;
              letter-spacing: .12em;
            }

            .magnetar-hero-status {
              position: absolute;
              z-index: 5;
              right: 0;
              bottom: clamp(42px, 6vh, 80px);
              display: grid;
              min-width: min(90%, 370px);
              padding: 11px 13px;
              border: 1px solid rgba(255, 255, 255, .2);
              border-radius: 16px;
              background: rgba(18, 14, 28, .9);
              box-shadow: 0 24px 60px rgba(19, 12, 45, .34);
              color: #fdfcff;
              grid-template-columns: auto 1fr auto;
              align-items: center;
              gap: 13px;
              -webkit-backdrop-filter: blur(18px);
              backdrop-filter: blur(18px);
              animation: magnetar-status-float 5s ease-in-out 1s infinite;
            }

            .magnetar-hero-status-icon {
              display: grid;
              width: 43px;
              aspect-ratio: 1;
              place-items: center;
              border-radius: 11px;
              background: #a18bff;
              color: #191322;
              font-size: 22px;
            }

            .magnetar-hero-status > span:nth-child(2) {
              display: grid;
              gap: 4px;
              font-size: 13px;
              font-weight: 600;
              letter-spacing: -.015em;
            }

            .magnetar-hero-status small {
              color: rgba(255, 255, 255, .52);
              font-size: 8px;
              font-weight: 700;
              letter-spacing: .14em;
            }

            .magnetar-hero-status-pulse {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #aeff8e;
              box-shadow: 0 0 0 5px rgba(174, 255, 142, .1), 0 0 18px rgba(174, 255, 142, .65);
            }

            .magnetar-hero-orbit {
              position: absolute;
              z-index: 4;
              bottom: -34px;
              left: -42px;
              width: 128px;
              aspect-ratio: 1;
              border: 1px dashed rgba(56, 39, 112, .42);
              border-radius: 50%;
              animation: magnetar-orbit 18s linear infinite;
            }

            .magnetar-hero-orbit::before,
            .magnetar-hero-orbit::after {
              position: absolute;
              border: 1px solid rgba(86, 59, 178, .17);
              border-radius: 50%;
              content: "";
            }

            .magnetar-hero-orbit::before {
              inset: 17px;
            }

            .magnetar-hero-orbit::after {
              inset: 38px;
              background: rgba(255, 255, 255, .18);
            }

            .magnetar-hero-orbit > span {
              position: absolute;
              top: 12px;
              left: 16px;
              width: 12px;
              height: 12px;
              border: 3px solid #f5f1ff;
              border-radius: 50%;
              background: #7857dc;
              box-shadow: 0 5px 18px rgba(76, 49, 166, .45);
            }

            .magnetar-hero-capabilities {
              display: flex;
              position: relative;
              z-index: 4;
              align-items: center;
              justify-content: center;
              gap: clamp(16px, 2.5vw, 42px);
              margin-top: 24px;
              padding-top: 21px;
              border-top: 1px solid rgba(23, 19, 31, .14);
              color: #625a70;
              font-size: 10px;
              font-weight: 700;
              letter-spacing: .14em;
              text-transform: uppercase;
            }

            .magnetar-hero-capabilities > i {
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #7352d7;
              box-shadow: 0 0 12px rgba(115, 82, 215, .55);
            }

            @keyframes magnetar-hero-rise {
              from { opacity: 0; transform: translate3d(0, 42px, 0); }
              to { opacity: 1; transform: translate3d(0, 0, 0); }
            }

            @keyframes magnetar-status-float {
              0%, 100% { transform: translate3d(0, 0, 0); }
              50% { transform: translate3d(0, -8px, 0); }
            }

            @keyframes magnetar-orbit {
              to { transform: rotate(360deg); }
            }

            .header {
              z-index: 30 !important;
            }

            .hero-section .hero-rotated-info-text {
              font-family: inherit !important;
              font-weight: 680 !important;
              letter-spacing: -.065em !important;
            }

            .hero-section .hero-rotated-info-text-two,
            .hero-section .body,
            .hero-section .hero-tag-text {
              font-family: inherit !important;
              letter-spacing: -.025em;
            }

            .magnetar-services-section {
              position: relative;
              min-height: 100vh;
              padding: clamp(110px, 10vw, 180px) 0 clamp(120px, 11vw, 200px) !important;
              isolation: isolate;
              overflow: hidden;
              background:
                radial-gradient(circle at 10% 13%, rgba(125, 91, 231, .25), transparent 25%),
                radial-gradient(circle at 91% 48%, rgba(186, 91, 255, .16), transparent 27%),
                linear-gradient(180deg, #17103c 0%, #100a2b 42%, #090616 100%) !important;
              color: #fff;
              font-family: "Segoe UI Variable Display", "Segoe UI", Inter, Arial, sans-serif;
            }

            .magnetar-services-section::before,
            .magnetar-services-section::after {
              position: absolute;
              z-index: 1;
              right: 0;
              left: 0;
              height: 160px;
              content: "";
              pointer-events: none;
            }

            .magnetar-services-section::before {
              top: 0;
              background: linear-gradient(to bottom, rgba(28, 19, 70, .76), transparent);
            }

            .magnetar-services-section::after {
              bottom: 0;
              background: linear-gradient(to top, rgba(5, 3, 13, .82), transparent);
            }

            .magnetar-services-container {
              position: relative;
              z-index: 3;
              width: min(calc(100% - 48px), 1420px) !important;
              max-width: 1420px !important;
            }

            .magnetar-services-heading {
              display: grid;
              margin-bottom: clamp(58px, 7vw, 105px);
              grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr);
              align-items: end;
              gap: clamp(36px, 7vw, 110px);
            }

            .magnetar-services-kicker {
              display: inline-flex;
              align-items: center;
              gap: 11px;
              margin-bottom: 25px;
              color: #c6b8ff;
              font-size: 10px;
              font-weight: 760;
              letter-spacing: .18em;
              line-height: 1;
            }

            .magnetar-services-kicker > i {
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: #a88cff;
              box-shadow: 0 0 0 5px rgba(168, 140, 255, .12), 0 0 22px rgba(168, 140, 255, .65);
            }

            .magnetar-services-heading h2 {
              max-width: 900px;
              margin: 0;
              color: #fff;
              font-size: clamp(48px, 6.25vw, 104px);
              font-weight: 520;
              letter-spacing: -.065em;
              line-height: .93;
              text-wrap: balance;
            }

            .magnetar-services-heading > p {
              max-width: 440px;
              margin: 0 0 8px;
              color: rgba(239, 235, 255, .68);
              font-size: clamp(15px, 1.2vw, 19px);
              letter-spacing: -.02em;
              line-height: 1.58;
            }

            .magnetar-services-grid {
              display: grid;
              position: relative;
              z-index: 3;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: clamp(24px, 2.5vw, 38px);
            }

            .magnetar-service-card {
              min-width: 0;
              opacity: 1;
              will-change: transform, opacity;
            }

            .magnetar-service-card-surface {
              height: 100%;
              overflow: hidden;
              border: 1px solid rgba(206, 190, 255, .2);
              border-radius: clamp(22px, 2.2vw, 34px);
              background: linear-gradient(155deg, rgba(34, 24, 79, .96), rgba(12, 8, 30, .98));
              box-shadow: 0 24px 70px rgba(0, 0, 0, .24), inset 0 1px rgba(255, 255, 255, .055);
              transition: transform .55s cubic-bezier(.22, 1, .36, 1), border-color .4s ease, box-shadow .4s ease;
            }

            .magnetar-service-media {
              position: relative;
              aspect-ratio: 16 / 10;
              overflow: hidden;
              background: #0b071c;
            }

            .magnetar-service-media img {
              display: block;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
              object-position: center center !important;
              filter: saturate(.88) contrast(1.04);
              transform: scale(1.015);
              transition: transform .8s cubic-bezier(.22, 1, .36, 1), filter .6s ease;
            }

            .magnetar-service-media-shade {
              position: absolute;
              inset: 0;
              background:
                linear-gradient(to top, rgba(10, 6, 24, .58), transparent 48%),
                linear-gradient(130deg, rgba(117, 83, 224, .1), transparent 52%);
              pointer-events: none;
            }

            .magnetar-service-index,
            .magnetar-service-label {
              position: absolute;
              z-index: 2;
              top: 18px;
              display: inline-flex;
              align-items: center;
              min-height: 31px;
              border: 1px solid rgba(255, 255, 255, .18);
              border-radius: 999px;
              background: rgba(8, 5, 20, .62);
              color: #fff;
              font-size: 9px;
              font-weight: 720;
              letter-spacing: .11em;
              line-height: 1;
              -webkit-backdrop-filter: blur(12px);
              backdrop-filter: blur(12px);
            }

            .magnetar-service-index {
              left: 18px;
              justify-content: center;
              width: 42px;
            }

            .magnetar-service-label {
              right: 18px;
              padding: 0 13px;
              color: #d8ceff;
              text-transform: uppercase;
            }

            .magnetar-service-content {
              display: grid;
              min-height: 178px;
              padding: clamp(24px, 2.5vw, 36px);
              grid-template-columns: minmax(0, 1fr) auto;
              align-items: start;
              gap: 24px;
            }

            .magnetar-service-content h3 {
              max-width: 560px;
              margin: 0;
              color: #fff;
              font-size: clamp(24px, 2.1vw, 36px);
              font-weight: 590;
              letter-spacing: -.045em;
              line-height: 1.06;
            }

            .magnetar-service-content p {
              max-width: 510px;
              margin: 14px 0 0;
              color: rgba(231, 225, 250, .62);
              font-size: 14px;
              letter-spacing: -.015em;
              line-height: 1.52;
            }

            .magnetar-service-arrow {
              display: grid;
              width: 47px;
              aspect-ratio: 1;
              place-items: center;
              border: 1px solid rgba(202, 185, 255, .28);
              border-radius: 50%;
              background: rgba(148, 115, 255, .12);
              color: #cbbaff;
              font-size: 19px;
              transition: transform .45s cubic-bezier(.22, 1, .36, 1), background-color .35s ease, color .35s ease;
            }

            .magnetar-service-card:hover .magnetar-service-card-surface {
              border-color: rgba(194, 174, 255, .46);
              box-shadow: 0 34px 90px rgba(0, 0, 0, .34), 0 0 0 1px rgba(158, 126, 255, .08) inset;
              transform: translateY(-8px);
            }

            .magnetar-service-card:hover .magnetar-service-media img {
              filter: saturate(1) contrast(1.04);
              transform: scale(1.065);
            }

            .magnetar-service-card:hover .magnetar-service-arrow {
              background: #a68cff;
              color: #171029;
              transform: rotate(45deg);
            }

            .magnetar-services-flow {
              position: absolute;
              z-index: 0;
              inset: 2% 0 1%;
              width: 100%;
              height: 97%;
              overflow: visible;
              pointer-events: none;
            }

            .magnetar-services-trail,
            .magnetar-services-trail-glow {
              fill: none;
              stroke: url(#magnetar-services-gradient);
              stroke-linecap: round;
              stroke-linejoin: round;
              vector-effect: non-scaling-stroke;
            }

            .magnetar-services-trail {
              stroke-width: 4;
              opacity: .78;
            }

            .magnetar-services-trail-glow {
              stroke-width: 20;
              opacity: .1;
            }

            .magnetar-services-route-node {
              fill: rgba(10, 6, 27, .94);
              stroke: #a789ff;
              stroke-width: 3;
              vector-effect: non-scaling-stroke;
            }

            .magnetar-services-nib {
              opacity: 0;
              color: #d8ccff;
              filter: drop-shadow(0 0 10px rgba(172, 140, 255, .9));
              will-change: transform;
            }

            .magnetar-services-nib path {
              fill: currentColor;
              stroke: rgba(255, 255, 255, .72);
              stroke-width: 1.5;
              vector-effect: non-scaling-stroke;
            }

            .magnetar-services-nib circle {
              fill: #251557;
            }

            .magnetar-services-ambient {
              position: absolute;
              z-index: 0;
              border-radius: 50%;
              filter: blur(90px);
              pointer-events: none;
            }

            .magnetar-services-ambient-one {
              top: 18%;
              left: -12%;
              width: 36vw;
              height: 36vw;
              background: rgba(105, 72, 214, .13);
            }

            .magnetar-services-ambient-two {
              right: -10%;
              bottom: 15%;
              width: 32vw;
              height: 32vw;
              background: rgba(195, 78, 235, .1);
            }

            .magnetar-services-section.is-static .magnetar-services-nib {
              display: none;
            }

            .home-marquee-section {
              position: relative;
              isolation: isolate;
            }

            .home-marquee-section .home-marquee-view-box {
              isolation: isolate;
            }

            .home-marquee-section .home-marquee-wrap,
            .home-marquee-section .home-marquee-image-box {
              z-index: 2;
            }

            .home-marquee-section .home-marquee-image-child {
              z-index: 2;
            }

            .home-marquee-section .magnetar-service-copy-card {
              display: flex !important;
              width: min(790px, 88vw) !important;
              height: 350px !important;
              flex: 0 0 min(790px, 88vw) !important;
              align-items: stretch !important;
              overflow: hidden;
              border: 1px solid rgba(255, 255, 255, .22);
              border-radius: 26px;
              background: #120b32;
              box-shadow: 0 24px 70px rgba(13, 7, 40, .22), inset 0 1px rgba(255, 255, 255, .08);
            }

            .home-marquee-section .magnetar-service-copy-panel {
              display: flex !important;
              position: relative;
              width: 100% !important;
              height: 100% !important;
              flex: 1 1 100% !important;
              isolation: isolate;
              flex-direction: column;
              align-items: flex-start;
              justify-content: space-between;
              padding: clamp(28px, 3vw, 48px) !important;
              overflow: hidden;
              background:
                radial-gradient(circle at 92% 12%, rgba(184, 151, 255, .32), transparent 30%),
                radial-gradient(circle at 12% 100%, rgba(103, 71, 220, .3), transparent 36%),
                linear-gradient(145deg, #25145f 0%, #17103e 52%, #0d0925 100%);
              color: #fff;
            }

            .home-marquee-section .magnetar-service-copy-panel::before {
              position: absolute;
              z-index: -1;
              top: -38%;
              right: -10%;
              width: 58%;
              aspect-ratio: 1;
              border: 1px solid rgba(255, 255, 255, .15);
              border-radius: 50%;
              box-shadow:
                0 0 0 34px rgba(255, 255, 255, .035),
                0 0 0 72px rgba(255, 255, 255, .02);
              content: "";
            }

            .home-marquee-section .magnetar-service-copy-panel::after {
              position: absolute;
              z-index: -1;
              inset: 0;
              background-image:
                linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
              background-size: 34px 34px;
              mask-image: linear-gradient(135deg, transparent 12%, #000 72%);
              content: "";
              opacity: .42;
            }

            .magnetar-service-copy-label {
              display: inline-flex;
              min-height: 31px;
              align-items: center;
              padding: 0 13px;
              border: 1px solid rgba(255, 255, 255, .22);
              border-radius: 999px;
              background: rgba(255, 255, 255, .08);
              color: #e7e0ff;
              font-size: 9px;
              font-weight: 750;
              letter-spacing: .13em;
              line-height: 1;
              text-transform: uppercase;
              -webkit-backdrop-filter: blur(10px);
              backdrop-filter: blur(10px);
            }

            .magnetar-service-copy-panel h3 {
              max-width: 540px;
              margin: 0;
              color: #fff;
              font-size: clamp(30px, 3vw, 48px);
              font-weight: 560;
              letter-spacing: -.06em;
              line-height: .94;
              text-wrap: balance;
            }

            .magnetar-service-copy-panel p {
              max-width: 500px;
              margin: 18px 0 0;
              color: rgba(238, 233, 255, .7);
              font-size: clamp(13px, 1vw, 16px);
              letter-spacing: -.015em;
              line-height: 1.5;
            }

            .magnetar-service-copy-line {
              display: block;
              width: min(52%, 260px);
              height: 3px;
              border-radius: 999px;
              background: linear-gradient(90deg, #fff, rgba(255, 255, 255, .08));
            }

            .home-marquee-section .magnetar-horizontal-service-card {
              display: flex !important;
              width: 790px !important;
              height: 350px !important;
              flex: 0 0 790px !important;
              align-items: stretch !important;
              overflow: hidden;
              border: 1px solid rgba(244, 239, 255, .24);
              border-radius: 28px;
              background: rgba(15, 9, 40, .94);
              box-shadow: 0 24px 70px rgba(15, 6, 50, .25), inset 0 1px rgba(255, 255, 255, .08);
              transition: border-color .35s ease, box-shadow .35s ease;
            }

            .home-marquee-section .magnetar-horizontal-service-card:hover {
              border-color: rgba(255, 255, 255, .5);
              box-shadow: 0 30px 85px rgba(21, 8, 64, .34), inset 0 1px rgba(255, 255, 255, .12);
            }

            .home-marquee-section .magnetar-horizontal-service-media {
              position: relative;
              width: 640px !important;
              height: 350px !important;
              flex: 0 0 640px !important;
              overflow: hidden;
              background: #100a2b;
            }

            .home-marquee-section .magnetar-horizontal-service-media img {
              display: block;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
              object-position: center center !important;
              filter: saturate(.9) contrast(1.04);
              transform: scale(1.01);
              transition: transform .75s cubic-bezier(.22, 1, .36, 1), filter .5s ease;
            }

            .home-marquee-section .magnetar-horizontal-service-card:hover .magnetar-horizontal-service-media img {
              filter: saturate(1.04) contrast(1.05);
              transform: scale(1.055);
            }

            .magnetar-horizontal-service-shade {
              position: absolute;
              inset: 0;
              background:
                linear-gradient(90deg, transparent 58%, rgba(13, 8, 34, .33) 100%),
                linear-gradient(0deg, rgba(12, 7, 31, .42), transparent 48%);
              pointer-events: none;
            }

            .magnetar-horizontal-service-index,
            .magnetar-horizontal-service-label {
              position: absolute;
              z-index: 2;
              top: 18px;
              display: inline-flex;
              min-height: 32px;
              align-items: center;
              border: 1px solid rgba(255, 255, 255, .24);
              border-radius: 999px;
              background: rgba(12, 7, 30, .7);
              color: #fff;
              font-size: 9px;
              font-weight: 720;
              letter-spacing: .11em;
              line-height: 1;
              -webkit-backdrop-filter: blur(12px);
              backdrop-filter: blur(12px);
            }

            .magnetar-horizontal-service-index {
              left: 18px;
              width: 43px;
              justify-content: center;
            }

            .magnetar-horizontal-service-label {
              right: 18px;
              padding: 0 13px;
              color: #ddd4ff;
              text-transform: uppercase;
            }

            .home-marquee-section .magnetar-horizontal-service-info {
              display: flex !important;
              position: relative;
              width: auto !important;
              min-width: 0;
              height: 350px !important;
              flex: 1 1 auto;
              flex-direction: column;
              align-items: flex-start !important;
              justify-content: space-between !important;
              gap: 18px;
              padding: 25px 18px !important;
              background:
                radial-gradient(circle at 100% 0%, rgba(157, 126, 255, .25), transparent 42%),
                linear-gradient(155deg, rgba(35, 23, 78, .98), rgba(15, 9, 39, .99));
              color: #fff;
            }

            .home-marquee-section .magnetar-horizontal-service-info .h6 {
              margin: 0;
              color: #fff;
              font-size: clamp(18px, 1.35vw, 24px);
              font-weight: 570;
              letter-spacing: -.045em;
              line-height: 1.02;
              overflow-wrap: anywhere;
            }

            .magnetar-horizontal-service-kicker {
              color: rgba(224, 215, 255, .62);
              font-size: 8px;
              font-weight: 760;
              letter-spacing: .16em;
              text-transform: uppercase;
            }

            .magnetar-horizontal-service-arrow {
              display: grid;
              width: 43px;
              aspect-ratio: 1;
              place-items: center;
              align-self: flex-end;
              border: 1px solid rgba(215, 202, 255, .28);
              border-radius: 50%;
              background: rgba(166, 140, 255, .13);
              color: #d8ccff;
              font-size: 18px;
              transition: transform .4s cubic-bezier(.22, 1, .36, 1), background-color .3s ease;
            }

            .magnetar-horizontal-service-card:hover .magnetar-horizontal-service-arrow {
              background: #a98cff;
              color: #171029;
              transform: rotate(45deg);
            }

            .magnetar-services-horizontal-trail {
              position: absolute;
              z-index: 0;
              top: 50%;
              right: 0;
              left: 0;
              width: 100%;
              height: clamp(260px, 34vw, 470px);
              overflow: hidden;
              overflow: clip;
              opacity: .96;
              transform: translateY(-50%);
              pointer-events: none;
            }

            .magnetar-services-horizontal-motion,
            .magnetar-services-horizontal-motion svg {
              display: block;
              height: 100%;
              overflow: visible;
            }

            .magnetar-services-horizontal-motion {
              width: 116%;
              margin-left: -8%;
              will-change: transform;
            }

            .magnetar-services-horizontal-motion svg {
              width: 100%;
            }

            .magnetar-services-horizontal-line,
            .magnetar-services-horizontal-glow {
              fill: none;
              stroke: url(#magnetar-services-horizontal-gradient);
              stroke-linecap: round;
              stroke-linejoin: round;
              vector-effect: non-scaling-stroke;
            }

            .magnetar-services-horizontal-line {
              stroke-width: 21;
              opacity: .98;
            }

            .magnetar-services-horizontal-glow {
              stroke-width: 68;
              opacity: .38;
              filter: blur(10px);
            }

            .magnetar-services-horizontal-nib {
              opacity: 0;
              color: #f2edff;
              filter: drop-shadow(0 0 14px rgba(151, 116, 255, .92));
              will-change: transform;
            }

            .magnetar-services-horizontal-nib path {
              fill: currentColor;
              stroke: rgba(90, 55, 194, .85);
              stroke-width: 1.5;
              vector-effect: non-scaling-stroke;
            }

            .magnetar-services-horizontal-nib circle {
              fill: #5f3bd4;
            }

            .home-marquee-section.is-static .magnetar-services-horizontal-nib {
              display: none;
            }

            @media (max-width: 991px) {
              .home-marquee-section .magnetar-horizontal-service-card {
                width: 620px !important;
                height: 310px !important;
                flex-basis: 620px !important;
              }

              .home-marquee-section .magnetar-horizontal-service-media {
                width: 465px !important;
                height: 310px !important;
                flex-basis: 465px !important;
              }

              .home-marquee-section .magnetar-horizontal-service-info {
                height: 310px !important;
                padding: 22px 17px !important;
              }

              .home-marquee-section .magnetar-horizontal-service-info .h6 {
                font-size: clamp(18px, 2.25vw, 23px);
              }
            }

            @media (max-width: 767px) {
              .home-marquee-section .magnetar-horizontal-service-card {
                width: min(86vw, 560px) !important;
                height: 430px !important;
                flex-basis: min(86vw, 560px) !important;
                flex-direction: column !important;
                border-radius: 23px;
              }

              .home-marquee-section .magnetar-horizontal-service-media {
                width: 100% !important;
                height: 300px !important;
                flex: 0 0 300px !important;
              }

              .home-marquee-section .magnetar-horizontal-service-info {
                width: 100% !important;
                height: 130px !important;
                min-height: 130px;
                flex-direction: row;
                align-items: center !important;
                gap: 14px;
                padding: 19px 20px !important;
              }

              .home-marquee-section .magnetar-horizontal-service-info .h6 {
                margin: 0;
                flex: 1;
                font-size: clamp(20px, 5vw, 27px);
              }

              .magnetar-horizontal-service-kicker {
                display: none;
              }

              .magnetar-horizontal-service-arrow {
                flex: 0 0 43px;
                align-self: center;
              }

              .magnetar-services-horizontal-trail {
                opacity: .72;
              }

              .magnetar-services-horizontal-motion {
                width: 150%;
                margin-left: -25%;
              }
            }

            @media (max-width: 479px) {
              .home-marquee-section .magnetar-horizontal-service-card {
                width: 88vw !important;
                height: 380px !important;
                flex-basis: 88vw !important;
              }

              .home-marquee-section .magnetar-horizontal-service-media {
                height: 260px !important;
                flex-basis: 260px !important;
              }

              .home-marquee-section .magnetar-horizontal-service-info {
                height: 120px !important;
                min-height: 120px;
              }

              .magnetar-horizontal-service-index,
              .magnetar-horizontal-service-label {
                top: 13px;
              }

              .magnetar-horizontal-service-index {
                left: 13px;
              }

              .magnetar-horizontal-service-label {
                right: 13px;
                max-width: calc(100% - 75px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }

            .home-service-two .wrapper-main-services-one .wrapper-text-tittle-service .h5,
            .home-service-two .wrapper-main-services-one .wrapper-description-tittle-service .body,
            .home-service-two .wrapper-main-services-two .wrapper-text-tittle-service .h5,
            .home-service-two .wrapper-main-services-two .wrapper-description-tittle-service .body {
              color: #111015 !important;
              -webkit-text-fill-color: #111015 !important;
              opacity: 1 !important;
              visibility: visible !important;
              text-shadow: none !important;
            }

            .magnetar-featured-projects {
              position: relative;
              padding: clamp(110px, 12vw, 190px) 0 0 !important;
              isolation: isolate;
              overflow-x: clip;
              font-family: "Segoe UI Variable Display", "Segoe UI", Inter, Arial, sans-serif;
            }

            .magnetar-featured-heading {
              width: min(calc(100% - 64px), 1420px) !important;
              max-width: 1420px !important;
            }

            .magnetar-featured-kicker {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 30px;
              color: rgba(255, 255, 255, .7);
              font-size: 10px;
              font-weight: 750;
              letter-spacing: .16em;
              line-height: 1;
            }

            .magnetar-featured-kicker > span {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #b39cff;
              box-shadow: 0 0 0 5px rgba(179, 156, 255, .13), 0 0 20px rgba(179, 156, 255, .7);
            }

            .magnetar-featured-heading-row {
              display: grid;
              grid-template-columns: minmax(0, 1.45fr) minmax(260px, .55fr);
              align-items: end;
              gap: clamp(42px, 8vw, 130px);
            }

            .magnetar-featured-heading h2 {
              max-width: 1050px;
              margin: 0;
              color: #fff;
              font-size: clamp(58px, 7.7vw, 126px);
              font-weight: 520;
              letter-spacing: -.07em;
              line-height: .87;
              text-wrap: balance;
            }

            .magnetar-featured-heading h2 em {
              font-family: Georgia, "Times New Roman", serif;
              font-weight: 400;
            }

            .magnetar-featured-heading-row > p {
              max-width: 410px;
              margin: 0 0 9px;
              color: rgba(242, 238, 255, .68);
              font-size: clamp(14px, 1.2vw, 18px);
              letter-spacing: -.02em;
              line-height: 1.55;
            }

            .magnetar-work-list {
              position: relative;
              margin-top: clamp(72px, 9vw, 145px);
            }

            .magnetar-work-wrapper {
              position: relative;
              z-index: 1;
              min-height: 100svh;
            }

            .magnetar-work-card {
              position: sticky;
              top: 0;
              width: 100%;
              height: 100svh;
              padding: clamp(14px, 1.7vw, 28px);
              overflow: hidden;
              background: transparent;
            }

            .magnetar-work-card-link {
              display: flex;
              position: relative;
              width: 100%;
              height: 100%;
              padding: 5vh 5vw;
              align-items: center;
              justify-content: center;
              transform-origin: 50% 50%;
              will-change: transform;
            }

            .magnetar-work-main-image {
              position: relative;
              width: 100%;
              height: 100%;
              overflow: hidden;
              border: 1px solid rgba(255, 255, 255, .18);
              border-radius: clamp(24px, 3.2vw, 50px);
              background:
                radial-gradient(circle at 72% 22%, rgba(164, 126, 255, .34), transparent 34%),
                linear-gradient(145deg, #281668, #100a2d 62%, #080618);
              box-shadow: 0 42px 110px rgba(5, 2, 20, .42), inset 0 1px rgba(255, 255, 255, .1);
              isolation: isolate;
              will-change: transform;
            }

            .magnetar-work-asset {
              display: block;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
              object-position: center !important;
              filter: saturate(.94) contrast(1.04);
              transform-origin: 50% 50%;
              will-change: transform;
            }

            /* Display the complete video without cutting its edges */
            video.magnetar-work-asset {
              object-fit: contain !important;
              background: #080514;
            }

            .magnetar-work-overlay {
              position: absolute;
              z-index: 1;
              inset: 0;
              background:
                linear-gradient(180deg, rgba(8, 5, 24, .08), transparent 44%, rgba(7, 4, 20, .58)),
                linear-gradient(120deg, rgba(113, 73, 226, .14), transparent 50%);
              pointer-events: none;
            }

            .magnetar-work-category {
              position: absolute;
              z-index: 3;
              top: 24px;
              right: 24px;
              display: inline-flex;
              min-height: 38px;
              align-items: center;
              padding: 0 16px;
              border: 1px solid rgba(255, 255, 255, .24);
              border-radius: 999px;
              background: rgba(9, 6, 24, .58);
              color: rgba(255, 255, 255, .92);
              font-size: 9px;
              font-weight: 740;
              letter-spacing: .13em;
              line-height: 1;
              text-transform: uppercase;
              -webkit-backdrop-filter: blur(14px);
              backdrop-filter: blur(14px);
            }

            .magnetar-work-info {
              display: flex;
              position: absolute;
              z-index: 4;
              right: 5%;
              bottom: 80px;
              left: 5%;
              max-width: 90%;
              align-items: flex-end;
              justify-content: center;
              color: #fff;
              text-align: center;
              pointer-events: none;
              will-change: transform, opacity;
            }

            .magnetar-work-edition {
              display: flex;
              position: absolute;
              bottom: .55em;
              left: 0;
              gap: 5px;
              color: rgba(255, 255, 255, .78);
              font-size: clamp(11px, 1vw, 14px);
              font-weight: 650;
              letter-spacing: .08em;
              line-height: 1;
            }

            .magnetar-work-info h3 {
              margin: 0;
              color: #fff;
              font-size: clamp(58px, 9.5vw, 158px);
              font-weight: 520;
              letter-spacing: -.075em;
              line-height: .82;
              text-shadow: 0 12px 42px rgba(5, 2, 20, .42);
            }

            .magnetar-work-trigger {
              width: 100%;
              height: 0;
              pointer-events: none;
            }

            .magnetar-featured-projects.is-static .magnetar-work-card {
              position: relative;
            }

            .magnetar-featured-projects.is-static .magnetar-work-wrapper,
            .magnetar-featured-projects.is-static .magnetar-work-card-link,
            .magnetar-featured-projects.is-static .magnetar-work-main-image,
            .magnetar-featured-projects.is-static .magnetar-work-asset,
            .magnetar-featured-projects.is-static .magnetar-work-info {
              opacity: 1 !important;
              transform: none !important;
            }

            @media (max-width: 991px) {
              .magnetar-featured-heading {
                width: min(calc(100% - 40px), 1420px) !important;
              }

              .magnetar-featured-heading-row {
                grid-template-columns: minmax(0, 1fr);
                gap: 28px;
              }

              .magnetar-featured-heading-row > p {
                max-width: 580px;
              }

              .magnetar-work-list {
                margin-top: 72px;
              }

              .magnetar-work-wrapper {
                min-height: 60svh;
                margin-bottom: 24px;
              }

              .magnetar-work-card {
                position: relative;
                height: 60svh;
                padding: 14px;
              }

              .magnetar-work-info {
                bottom: 34px;
              }
            }

            @media (max-width: 767px) {
              .magnetar-featured-projects {
                padding-top: 92px !important;
              }

              .magnetar-featured-heading {
                width: calc(100% - 30px) !important;
              }

              .magnetar-featured-heading h2 {
                font-size: clamp(46px, 13vw, 76px);
                line-height: .9;
              }

              .magnetar-work-list {
                margin-top: 60px;
              }

              .magnetar-work-wrapper {
                min-height: 500px;
              }

              .magnetar-work-card {
                height: 500px;
                padding: 10px;
              }

              .magnetar-work-main-image {
                border-radius: 16px;
              }

              .magnetar-work-category {
                top: 14px;
                right: 14px;
                min-height: 32px;
                padding: 0 12px;
                font-size: 8px;
              }

              .magnetar-work-info {
                right: 24px;
                bottom: 30px;
                left: 24px;
                max-width: calc(100% - 48px);
              }

              .magnetar-work-info h3 {
                font-size: clamp(46px, 13vw, 76px);
              }

              .magnetar-work-edition {
                bottom: auto;
                top: -22px;
              }
            }

            @media (max-width: 479px) {
              .magnetar-work-wrapper {
                min-height: 400px;
              }

              .magnetar-work-card {
                height: 400px;
              }

              .magnetar-work-category {
                max-width: calc(100% - 28px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .magnetar-work-info {
                right: 20px;
                bottom: 25px;
                left: 20px;
                max-width: calc(100% - 40px);
              }

              .magnetar-work-info h3 {
                font-size: clamp(40px, 15vw, 64px);
              }
            }

            .home-blog-section.magnetar-feedback-section {
              position: relative;
              min-height: auto !important;
              padding: clamp(120px, 13vw, 200px) 0 !important;
              overflow: hidden;
              isolation: isolate;
              color: #fff;
              font-family: "Segoe UI Variable Display", "Segoe UI", Inter, Arial, sans-serif;
            }

            .magnetar-feedback-atmosphere {
              position: absolute;
              z-index: 0;
              inset: 0;
              overflow: hidden;
              background:
                radial-gradient(circle at 8% 34%, rgba(136, 100, 255, .2), transparent 30%),
                radial-gradient(circle at 88% 74%, rgba(91, 57, 207, .24), transparent 34%),
                linear-gradient(180deg, rgba(26, 15, 69, 0), rgba(37, 22, 91, .34) 48%, rgba(12, 8, 33, 0));
              pointer-events: none;
            }

            .magnetar-feedback-atmosphere::before {
              position: absolute;
              inset: -18%;
              background-image:
                linear-gradient(rgba(216, 204, 255, .045) 1px, transparent 1px),
                linear-gradient(90deg, rgba(216, 204, 255, .045) 1px, transparent 1px);
              background-size: 58px 58px;
              content: "";
              opacity: .62;
              transform: rotate(-7deg);
              mask-image: radial-gradient(ellipse at center, #000 18%, transparent 72%);
              animation: magnetar-feedback-grid-drift 22s ease-in-out infinite alternate;
              will-change: transform;
            }

            .magnetar-feedback-orb {
              position: absolute;
              display: block;
              border-radius: 50%;
              mix-blend-mode: screen;
              will-change: transform;
            }

            .magnetar-feedback-orb-one {
              top: 4%;
              left: -12%;
              width: min(56vw, 860px);
              aspect-ratio: 1;
              background: radial-gradient(circle, rgba(143, 105, 255, .32), rgba(91, 54, 207, .1) 46%, transparent 70%);
              animation: magnetar-feedback-orbit-one 18s ease-in-out infinite alternate;
            }

            .magnetar-feedback-orb-two {
              right: -14%;
              bottom: -24%;
              width: min(49vw, 760px);
              aspect-ratio: 1;
              background: radial-gradient(circle, rgba(190, 163, 255, .26), rgba(94, 61, 211, .08) 48%, transparent 72%);
              animation: magnetar-feedback-orbit-two 21s ease-in-out infinite alternate;
            }

            .magnetar-feedback-container {
              position: relative;
              z-index: 1;
              width: min(calc(100% - 64px), 1420px) !important;
              max-width: 1420px !important;
            }

            .magnetar-feedback-header {
              display: grid;
              grid-template-columns: minmax(0, 1.25fr) minmax(280px, .55fr);
              align-items: end;
              gap: clamp(48px, 9vw, 150px);
            }

            .magnetar-feedback-kicker {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 30px;
              color: rgba(239, 234, 255, .7);
              font-size: 10px;
              font-weight: 760;
              letter-spacing: .16em;
              line-height: 1;
            }

            .magnetar-feedback-kicker > span {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #b99fff;
              box-shadow: 0 0 0 5px rgba(185, 159, 255, .12), 0 0 22px rgba(185, 159, 255, .7);
            }

            .magnetar-feedback-header h2 {
              max-width: 930px;
              margin: 0;
              color: #fff;
              font-size: clamp(62px, 8.6vw, 138px);
              font-weight: 520;
              letter-spacing: -.075em;
              line-height: .84;
              text-wrap: balance;
            }

            .magnetar-feedback-header h2 em {
              color: #c9b9ff;
              font-family: Georgia, "Times New Roman", serif;
              font-weight: 400;
            }

            .magnetar-feedback-intro {
              display: flex;
              align-items: flex-start;
              flex-direction: column;
              gap: 28px;
              padding-bottom: 7px;
            }

            .magnetar-feedback-intro p {
              max-width: 390px;
              margin: 0;
              color: rgba(240, 235, 255, .7);
              font-size: clamp(15px, 1.2vw, 18px);
              letter-spacing: -.02em;
              line-height: 1.55;
            }

            .magnetar-feedback-cta {
              display: inline-flex;
              min-height: 54px;
              align-items: center;
              gap: 22px;
              padding: 6px 7px 6px 24px;
              border: 1px solid rgba(255, 255, 255, .28);
              border-radius: 999px;
              background: rgba(255, 255, 255, .08);
              color: #fff;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: -.01em;
              text-decoration: none;
              -webkit-backdrop-filter: blur(14px);
              backdrop-filter: blur(14px);
              transition: border-color .3s ease, background-color .3s ease, transform .3s ease;
            }

            .magnetar-feedback-cta > span:last-child {
              display: grid;
              width: 41px;
              height: 41px;
              place-items: center;
              border-radius: 50%;
              background: #b99fff;
              color: #17102c;
              font-size: 18px;
              transition: transform .3s ease;
            }

            .magnetar-feedback-cta:hover {
              border-color: rgba(255, 255, 255, .52);
              background: rgba(255, 255, 255, .14);
              transform: translateY(-2px);
            }

            .magnetar-feedback-cta:hover > span:last-child {
              transform: rotate(45deg);
            }

            .magnetar-feedback-grid {
              display: grid;
              margin-top: clamp(70px, 8vw, 120px);
              grid-template-columns: repeat(12, minmax(0, 1fr));
              grid-template-rows: repeat(2, minmax(310px, auto));
              gap: clamp(16px, 1.5vw, 24px);
            }

            .magnetar-feedback-card {
              display: flex;
              position: relative;
              min-height: 300px;
              overflow: hidden;
              flex-direction: column;
              padding: clamp(26px, 2.6vw, 40px);
              border: 1px solid rgba(231, 222, 255, .2);
              border-radius: clamp(24px, 2.3vw, 36px);
              background:
                linear-gradient(145deg, rgba(60, 38, 127, .72), rgba(22, 14, 56, .82)),
                rgba(24, 14, 62, .78);
              box-shadow: 0 28px 80px rgba(7, 3, 24, .22), inset 0 1px rgba(255, 255, 255, .1);
              -webkit-backdrop-filter: blur(18px);
              backdrop-filter: blur(18px);
              transition: border-color .4s ease, box-shadow .4s ease, transform .4s cubic-bezier(.2, .75, .25, 1);
            }

            .magnetar-feedback-card:nth-child(1) {
              grid-column: 1 / 6;
              grid-row: 1;
            }

            .magnetar-feedback-card:nth-child(2) {
              grid-column: 6 / 13;
              grid-row: 1;
            }

            .magnetar-feedback-card:nth-child(3) {
              grid-column: 6 / 13;
              grid-row: 2;
            }

            .magnetar-feedback-card:nth-child(4) {
              grid-column: 1 / 6;
              grid-row: 2;
            }

            .magnetar-feedback-card::before {
              position: absolute;
              top: -35%;
              right: -16%;
              width: 58%;
              aspect-ratio: 1;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(187, 158, 255, .22), transparent 68%);
              content: "";
              opacity: .72;
              pointer-events: none;
              transition: transform .5s ease, opacity .5s ease;
            }

            .magnetar-feedback-card:hover {
              border-color: rgba(232, 224, 255, .43);
              box-shadow: 0 36px 95px rgba(8, 3, 28, .32), inset 0 1px rgba(255, 255, 255, .14);
              transform: translateY(-6px);
            }

            .magnetar-feedback-card:hover::before {
              opacity: 1;
              transform: scale(1.12);
            }

            .magnetar-feedback-card:nth-child(2),
            .magnetar-feedback-card:nth-child(3) {
              background:
                radial-gradient(circle at 86% 18%, rgba(194, 169, 255, .18), transparent 30%),
                linear-gradient(145deg, rgba(77, 49, 158, .82), rgba(23, 14, 60, .88));
            }

            .magnetar-feedback-card-top {
              display: flex;
              position: relative;
              z-index: 1;
              align-items: center;
              justify-content: space-between;
              gap: 24px;
            }

            .magnetar-feedback-stars {
              color: #cfbeff;
              font-size: 13px;
              letter-spacing: .18em;
              line-height: 1;
              text-shadow: 0 0 18px rgba(188, 162, 255, .55);
            }

            .magnetar-feedback-index {
              color: rgba(239, 233, 255, .54);
              font-size: 10px;
              font-weight: 720;
              letter-spacing: .16em;
            }

            .magnetar-feedback-mark {
              position: relative;
              z-index: 1;
              height: .64em;
              margin-top: clamp(20px, 2.4vw, 38px);
              color: #bba2ff;
              font-family: Georgia, "Times New Roman", serif;
              font-size: clamp(72px, 7vw, 118px);
              line-height: 1;
              opacity: .9;
            }

            .magnetar-feedback-quote {
              position: relative;
              z-index: 1;
              max-width: 770px;
              margin: 14px 0 clamp(28px, 3vw, 46px);
              color: #f8f6ff;
              font-size: clamp(22px, 2.1vw, 34px);
              font-weight: 470;
              letter-spacing: -.035em;
              line-height: 1.26;
              text-wrap: balance;
            }

            .magnetar-feedback-card:nth-child(2) .magnetar-feedback-quote,
            .magnetar-feedback-card:nth-child(3) .magnetar-feedback-quote {
              font-size: clamp(24px, 2.4vw, 39px);
              line-height: 1.2;
            }

            .magnetar-feedback-card-footer {
              display: flex;
              position: relative;
              z-index: 1;
              align-items: center;
              justify-content: space-between;
              gap: 22px;
              margin-top: auto;
            }

            .magnetar-feedback-profile {
              display: flex;
              min-width: 0;
              align-items: center;
              gap: 14px;
            }

            .magnetar-feedback-profile img {
              display: block;
              width: 58px !important;
              height: 58px !important;
              flex: 0 0 58px;
              border: 1px solid rgba(255, 255, 255, .36);
              border-radius: 50%;
              object-fit: cover !important;
              object-position: center !important;
              box-shadow: 0 8px 22px rgba(7, 3, 25, .3);
            }

            .magnetar-feedback-profile > div {
              display: flex;
              min-width: 0;
              flex-direction: column;
              gap: 5px;
            }

            .magnetar-feedback-profile strong {
              overflow: hidden;
              color: #fff;
              font-size: 14px;
              font-weight: 700;
              letter-spacing: -.02em;
              line-height: 1.15;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .magnetar-feedback-profile span {
              color: rgba(235, 228, 255, .62);
              font-size: 11px;
              line-height: 1.3;
            }

            .magnetar-feedback-focus {
              display: inline-flex;
              min-height: 34px;
              flex: 0 0 auto;
              align-items: center;
              padding: 0 13px;
              border: 1px solid rgba(255, 255, 255, .18);
              border-radius: 999px;
              background: rgba(255, 255, 255, .07);
              color: rgba(242, 238, 255, .76);
              font-size: 8px;
              font-weight: 740;
              letter-spacing: .12em;
              line-height: 1;
              text-transform: uppercase;
            }

            @keyframes magnetar-feedback-grid-drift {
              from { transform: translate3d(-1.5%, -1%, 0) rotate(-7deg); }
              to { transform: translate3d(2.5%, 1.5%, 0) rotate(-4deg); }
            }

            @keyframes magnetar-feedback-orbit-one {
              from { transform: translate3d(-3%, -2%, 0) scale(.94); }
              to { transform: translate3d(15%, 10%, 0) scale(1.08); }
            }

            @keyframes magnetar-feedback-orbit-two {
              from { transform: translate3d(4%, 7%, 0) scale(1.05); }
              to { transform: translate3d(-16%, -9%, 0) scale(.92); }
            }

            @media (max-width: 991px) {
              .magnetar-feedback-container {
                width: min(calc(100% - 40px), 1420px) !important;
              }

              .magnetar-feedback-header {
                grid-template-columns: minmax(0, 1fr);
                gap: 32px;
              }

              .magnetar-feedback-intro {
                max-width: 580px;
              }

              .magnetar-feedback-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                grid-template-rows: auto;
              }

              .magnetar-feedback-card:nth-child(n) {
                min-height: 360px;
                grid-row: auto;
                grid-column: auto;
              }
            }

            @media (max-width: 767px) {
              .home-blog-section.magnetar-feedback-section {
                padding: 100px 0 !important;
              }

              .magnetar-feedback-container {
                width: calc(100% - 30px) !important;
              }

              .magnetar-feedback-header h2 {
                font-size: clamp(50px, 14vw, 80px);
              }

              .magnetar-feedback-grid {
                margin-top: 58px;
                grid-template-columns: minmax(0, 1fr);
              }

              .magnetar-feedback-card {
                min-height: 390px;
                grid-column: auto;
              }

              .magnetar-feedback-quote {
                font-size: clamp(25px, 7vw, 36px);
              }

              .magnetar-feedback-card-footer {
                align-items: flex-start;
                flex-direction: column;
              }
            }

            @media (max-width: 479px) {
              .magnetar-feedback-card {
                min-height: 410px;
                padding: 24px;
                border-radius: 24px;
              }

              .magnetar-feedback-profile img {
                width: 50px !important;
                height: 50px !important;
                flex-basis: 50px;
              }

              .magnetar-feedback-focus {
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }

            .magnetar-project-video {
              display: block;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover;
              object-position: center center;
            }

            .footer {
              min-height: 78vh;
              padding-top: clamp(140px, 16vw, 240px) !important;
              padding-bottom: clamp(48px, 6vw, 90px) !important;
              position: relative;
              isolation: isolate;
            }

            .footer > .container {
              position: relative;
              z-index: 2;
            }

            .footer-wrap {
              min-height: 64vh;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }

            .footer-bottom-bar {
              margin-top: clamp(100px, 14vw, 210px) !important;
              display: flex;
              align-items: center;
              justify-content: center !important;
            }

            .magnetar-footer-cta {
              display: inline-flex;
              min-width: clamp(210px, 22vw, 320px);
              align-items: center;
              justify-content: space-between;
              gap: 28px;
              padding: 12px 12px 12px 30px;
              border: 1px solid rgba(255, 255, 255, .32);
              border-radius: 999px;
              background: rgba(255, 255, 255, .12);
              box-shadow: 0 18px 55px rgba(0, 0, 0, .24), inset 0 1px rgba(255, 255, 255, .2);
              color: #fff;
              font-family: Inter, Arial, sans-serif;
              font-size: clamp(18px, 1.6vw, 24px);
              font-weight: 600;
              letter-spacing: -.035em;
              line-height: 1;
              text-decoration: none;
              -webkit-backdrop-filter: blur(18px);
              backdrop-filter: blur(18px);
              transition: transform .35s ease, background-color .35s ease, border-color .35s ease;
            }

            .magnetar-footer-cta-arrow {
              display: grid;
              width: 48px;
              aspect-ratio: 1;
              place-items: center;
              border-radius: 999px;
              background: #9e8cff;
              box-shadow: 0 0 28px rgba(158, 140, 255, .48);
              font-size: 22px;
              transition: transform .35s ease, background-color .35s ease;
            }

            .magnetar-footer-cta:hover {
              border-color: rgba(255, 255, 255, .62);
              background: rgba(255, 255, 255, .2);
              transform: translateY(-4px);
            }

            .magnetar-footer-cta:hover .magnetar-footer-cta-arrow {
              background: #b8aaff;
              transform: rotate(45deg);
            }

            .magnetar-footer-visual {
              position: absolute;
              z-index: 1;
              right: 0;
              bottom: 0;
              left: 0;
              height: clamp(500px, 62vw, 860px);
              --footer-move-x: 0px;
              --footer-move-y: 0px;
              --footer-light-x: 50%;
              --footer-light-y: 48%;
              contain: layout paint style;
              content-visibility: auto;
              overflow: hidden;
              background: #09051a;
              mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 100%);
              -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 100%);
              pointer-events: none;
            }

            .magnetar-footer-visual-motion {
              position: absolute;
              inset: -22px;
              transform: translate3d(var(--footer-move-x), var(--footer-move-y), 0);
              transition: transform .55s cubic-bezier(.22, 1, .36, 1);
              will-change: transform;
            }

            .magnetar-footer-visual-image {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center bottom;
              opacity: 0;
              filter: saturate(.96) contrast(1.03);
              transform: scale(1.025);
              transition: opacity 1s ease, transform 1.4s cubic-bezier(.22, 1, .36, 1);
            }

            .magnetar-footer-visual.is-visible .magnetar-footer-visual-image {
              opacity: .94;
              transform: scale(1.045);
            }

            .magnetar-footer-visual.is-active .magnetar-footer-visual-image {
              animation: magnetar-footer-breathe 12s ease-in-out infinite alternate;
            }

            .magnetar-footer-cursor-glow {
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at var(--footer-light-x) var(--footer-light-y), rgba(172, 136, 255, .16), transparent 21%),
                linear-gradient(to bottom, rgba(7, 4, 19, .12), transparent 28%, rgba(4, 2, 12, .38) 100%);
              transition: background-position .4s ease;
            }

            @keyframes magnetar-footer-breathe {
              from { transform: scale(1.035); }
              to { transform: scale(1.055); }
            }

            .footer-top-bar,
            .footer-bottom-bar {
              position: relative;
              z-index: 3;
            }

            @media (max-width: 1100px) {
              .magnetar-hero-shell {
                min-height: auto;
                grid-template-columns: minmax(0, 1fr);
                gap: 54px;
              }

              .magnetar-hero-copy {
                max-width: 820px;
              }

              .magnetar-hero-title {
                font-size: clamp(68px, 9.7vw, 104px);
              }

              .magnetar-hero-visual {
                width: min(100%, 780px);
                height: clamp(500px, 70svh, 620px);
                margin-inline: auto;
              }
            }

            @media (max-width: 991px) {
              .hero-section.magnetar-hero {
                padding-top: 126px !important;
              }

              .magnetar-hero .magnetar-hero-container {
                width: min(calc(100% - 40px), 1500px) !important;
              }

              .magnetar-hero-summary {
                max-width: 650px;
              }

              .magnetar-hero-status {
                right: 18px;
              }

              .magnetar-services-container {
                width: min(calc(100% - 40px), 1420px) !important;
              }

              .magnetar-services-heading {
                grid-template-columns: minmax(0, 1fr);
                gap: 26px;
              }

              .magnetar-services-heading h2 {
                max-width: 760px;
              }

              .magnetar-services-heading > p {
                max-width: 590px;
              }

              .magnetar-services-flow {
                opacity: .8;
              }
            }

            @media (max-width: 767px) {
              .hero-section.magnetar-hero {
                padding: 116px 0 25px !important;
              }

              .magnetar-hero .magnetar-hero-container {
                width: calc(100% - 30px) !important;
              }

              .magnetar-hero-shell {
                gap: 42px;
              }

              .magnetar-hero-copy {
                padding-top: 14px;
              }

              .magnetar-hero-eyebrow {
                margin-bottom: 26px;
                font-size: 9px;
              }

              .magnetar-hero-title {
                font-size: clamp(38px, 12.4vw, 72px);
                line-height: .91;
              }

              .magnetar-hero-title-final {
                gap: 17px;
              }

              .magnetar-hero-title-final > i {
                width: clamp(52px, 18vw, 120px);
                height: 2px;
              }

              .magnetar-hero-summary {
                margin-top: 26px;
                font-size: 15px;
                line-height: 1.5;
              }

              .magnetar-hero-actions {
                margin-top: 25px;
              }

              .magnetar-hero-proof {
                margin-top: 35px;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 10px;
              }

              .magnetar-hero-proof strong {
                font-size: 11px;
              }

              .magnetar-hero-proof span {
                font-size: 8px;
              }

              .magnetar-hero-visual {
                width: 100%;
                height: min(118vw, 560px);
                min-height: 440px;
              }

              .magnetar-hero-image-frame {
                inset: 0 4%;
              }

              .magnetar-hero img.magnetar-hero-art {
                object-position: center bottom !important;
              }

              .magnetar-hero-visual-index {
                top: 15px;
                right: 15px;
                transform: none;
              }

              .magnetar-hero-status {
                right: 12px;
                bottom: 22px;
                left: 12px;
                min-width: 0;
              }

              .magnetar-hero-orbit {
                bottom: -25px;
                left: -13px;
                width: 92px;
              }

              .magnetar-hero-capabilities {
                flex-wrap: wrap;
                gap: 11px 16px;
                margin-top: 32px;
                padding-inline: 12px;
                text-align: center;
              }

              .magnetar-services-section {
                padding: 92px 0 110px !important;
              }

              .magnetar-services-container {
                width: calc(100% - 30px) !important;
              }

              .magnetar-services-heading {
                margin-bottom: 48px;
              }

              .magnetar-services-heading h2 {
                font-size: clamp(42px, 11vw, 70px);
              }

              .magnetar-services-heading > p {
                font-size: 15px;
              }

              .magnetar-services-grid {
                grid-template-columns: minmax(0, 1fr);
                gap: 22px;
              }

              .magnetar-service-content {
                min-height: 160px;
              }

              .magnetar-services-flow {
                inset: 1% -20% 1%;
                width: 140%;
                opacity: .5;
              }

              .magnetar-services-nib,
              .magnetar-services-route-node {
                display: none;
              }

              .magnetar-service-card:hover .magnetar-service-card-surface {
                transform: none;
              }

              .footer,
              .footer-wrap {
                min-height: auto;
              }

              .footer-bottom-bar {
                margin-top: 90px !important;
              }

              .magnetar-footer-visual {
                height: 480px;
              }
            }

            @media (max-width: 479px) {
              .magnetar-hero-title {
                letter-spacing: -.062em;
              }

              .magnetar-hero-title > span:nth-child(2) {
                white-space: normal;
              }

              .magnetar-hero-actions {
                align-items: stretch;
                flex-direction: column;
              }

              .magnetar-hero-primary,
              .magnetar-hero-secondary {
                width: 100%;
              }

              .magnetar-hero-primary {
                justify-content: space-between;
              }

              .magnetar-hero-proof {
                grid-template-columns: 1fr;
                gap: 11px;
              }

              .magnetar-hero-proof div {
                grid-template-columns: 92px 1fr;
                align-items: center;
              }

              .magnetar-hero-visual {
                height: 445px;
                min-height: 445px;
              }

              .magnetar-hero-image-frame {
                inset: 0;
              }

              .magnetar-hero-visual-index {
                right: 7px;
              }

              .magnetar-hero-status {
                gap: 9px;
                padding: 9px;
              }

              .magnetar-hero-status-icon {
                width: 38px;
              }

              .magnetar-hero-status > span:nth-child(2) {
                font-size: 11px;
              }

              .magnetar-hero-status-pulse {
                margin-right: 4px;
              }

              .magnetar-hero-capabilities > i {
                display: none;
              }

              .magnetar-services-section {
                padding-top: 78px !important;
              }

              .magnetar-services-heading h2 {
                font-size: clamp(38px, 12vw, 54px);
              }

              .magnetar-services-kicker {
                margin-bottom: 19px;
              }

              .magnetar-service-index,
              .magnetar-service-label {
                top: 12px;
                min-height: 28px;
              }

              .magnetar-service-index {
                left: 12px;
              }

              .magnetar-service-label {
                right: 12px;
                max-width: calc(100% - 72px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .magnetar-service-content {
                min-height: 0;
                padding: 22px;
                gap: 16px;
              }

              .magnetar-service-content h3 {
                font-size: clamp(23px, 7.5vw, 30px);
              }

              .magnetar-service-content p {
                font-size: 13px;
              }

              .magnetar-service-arrow {
                width: 41px;
              }

              .magnetar-footer-cta {
                width: min(100%, 280px);
              }

              .magnetar-footer-visual {
                height: 430px;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .magnetar-hero-copy,
              .magnetar-hero-visual,
              .magnetar-hero-image-frame,
              .magnetar-hero-status,
              .magnetar-hero-orbit {
                animation: none !important;
              }

              .magnetar-hero img.magnetar-hero-art,
              .magnetar-hero-primary,
              .magnetar-hero-secondary {
                transition: none !important;
              }

              .magnetar-footer-visual-motion {
                transform: none !important;
                transition: none !important;
              }

              .magnetar-footer-visual-image {
                animation: none !important;
                transition: opacity .3s ease !important;
              }

              .magnetar-feedback-atmosphere::before,
              .magnetar-feedback-orb {
                animation: none !important;
                transform: none !important;
              }

              .magnetar-feedback-card,
              .magnetar-feedback-cta,
              .magnetar-feedback-cta > span:last-child {
                transition: none !important;
              }

              .magnetar-service-card,
              .magnetar-service-card-surface,
              .magnetar-service-media img,
              .magnetar-service-arrow,
              .magnetar-horizontal-service-media img,
              .magnetar-horizontal-service-arrow,
              .magnetar-services-horizontal-motion {
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
              }

              .magnetar-services-nib,
              .magnetar-services-horizontal-nib {
                display: none !important;
              }
            }
          </style>
        `;
        const mediaReplacements: Array<[RegExp, string]> = [
          [
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69ad4171521df4f0bc234d0f_Rectangle%209\.png/g,
            mediaUrl("hero/ai-agent.png"),
          ],
          [
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69ad0fbadd6325cf79cf0dea_Rectangle%205\.png/g,
            mediaUrl("hero/workflow-automation.png"),
          ],
          [
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69ad4172e2f6cf6c085066c0_Rectangle%207\.png/g,
            mediaUrl("hero/saas-dashboard.png"),
          ],
          [
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69ad417163eb1d1417d4efe7_Rectangle%2011\.png/g,
            mediaUrl("hero/business-insights.png"),
          ],
          [
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69ad41712a2f75c0ed1f8027_Rectangle%2010\.png/g,
            mediaUrl("hero/automation-arm.png"),
          ],
          [
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69ad4171baff849bf5f57a38_Rectangle%208\.png/g,
            mediaUrl("hero/creative-ai.png"),
          ],
          [
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69ad41721ce44afffca4eaf8_Rectangle%2012\.png/g,
            mediaUrl("hero/integrations.png"),
          ],
          [
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69ad417169d8a230caca089c_Rectangle%206\.png/g,
            mediaUrl("hero/ai-security.png"),
          ],
        ];

        let page = html
          .replace(/href="\[([^\]]*)\]\((https?:\/\/[^)]+)\)"/g, 'href="$2"')
          .replace(
            /href="https:\/\/qubix-flowdevz\.webflow\.io\/#"/g,
            'href="#email-form"',
          )
          .replace(
            /href="https:\/\/qubix-flowdevz\.webflow\.io\/contact"/g,
            'href="#email-form"',
          )
          .replace(
            /href="https:\/\/qubix-flowdevz\.webflow\.io\/services"(?= class="main-button)/g,
            'href="#Jump-Section"',
          )
          .replace(/Qubix Studio/g, "Magnetar")
          .replace(
            /<section class="hero-section">[\s\S]*?<\/section>\s*(?=<section id="Jump-Section")/i,
            heroMarkup,
          )
          .replace(
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69abe64293a2c4053f4ff30c_Qubix\.svg/g,
            magnetarLogo,
          )
          .replace(/Qubix/g, "Magnetar")
          .replace(
            "</head>",
            `<style id="magnetar-background">html{min-height:100%;background:linear-gradient(180deg,#f7f7fa 0%,#eeedf7 12%,#cbc5ef 24%,#a095e6 36%,#7461d0 47%,#4735aa 59%,#2a1a71 71%,#160d43 83%,#080617 94%,#020204 100%) fixed!important;background-size:100% 100%!important}body{background:transparent!important}section{background-color:transparent!important}img[src*="/media/hero/"]{object-fit:contain!important}.magnetar-show-reel{display:block;width:100%;height:100%;object-fit:cover}.hero-section [data-w-id="bfb744ca-f033-a95a-a5a1-a692c71ac55c"]{display:none!important}.w-webflow-badge{display:none!important;visibility:hidden!important;pointer-events:none!important}</style>${scopedEnhancementCss}</head>`,
          );

        for (const [pattern, replacement] of mediaReplacements) {
          page = page.replace(pattern, replacement);
        }

        page = page.replace(
          /<img\b(?=[^>]*alt="show reel")[^>]*\/>/i,
          `<img src="${showReelGif}" loading="eager" alt="Creative digital production show reel" class="all-image-cover magnetar-show-reel"/>`,
        );

        page = page.replace(
          /(<section class="home-marquee-section">[\s\S]*?<div class="home-marquee-image-child">)[\s\S]*?(<\/div><\/div><\/div><\/div><\/section>\s*(?=<section class="home-service-two">))/i,
          `$1${serviceCardsMarkup}$2`,
        );
        page = page.replace(
          '<div class="home-marquee-view-box">',
          `<div class="home-marquee-view-box">${servicesHorizontalTrailMarkup}`,
        );
        page = page.replace(
          /<section class="home-project-section">[\s\S]*?<\/section>\s*(?=<section class="home-blog-section">)/i,
          featuredProjectsMarkup,
        );

        page = page
          .replace(
            /<section class="home-blog-section">[\s\S]*?<\/section>\s*(?=<section class="form-section">)/i,
            feedbackMarkup,
          )
          .replace(
            /<div class="footer-logo"><img\b[^>]*class="all-image-cover"\/><\/div>/i,
            '<a href="#email-form" class="magnetar-footer-cta"><span>Get in touch</span><span class="magnetar-footer-cta-arrow" aria-hidden="true">&#8599;</span></a>',
          )
          .replace(
            /<div data-w-id="2f6f148c-ce10-742f-3a90-b3d55d53489a">Powered by <a\b[^>]*>Webflow<\/a><\/div>/i,
            "",
          );

        // Spline disabled in favor of the lightweight interactive image.
        // page = page
        //   .replace("</footer>", `${footerSplineMarkup}</footer>`)
        //   .replace("</body>", `${footerSplineLoaderScript}</body>`);

        page = page
          .replace("</footer>", `${footerVisualMarkup}</footer>`)
          .replace(
            "</body>",
            `${servicesFlowScript}${featuredProjectsScript}${footerVisualInteractionScript}</body>`,
          );

        for (const testimonial of testimonials) {
          page = page
            .replace(
              '<div class="body">March 28, 2026</div>',
              `<div class="body">${testimonial.role}</div>`,
            )
            .replace(
              `<div class="text-block-3">${testimonial.sourceTitle}</div>`,
              `<div class="text-block-3">${testimonial.client}</div>`,
            )
            .replace(
              "<div>Explore how clear interfaces, predictable flows, and accessibility can build user drive conversions.</div>",
              `<div>“${testimonial.quote}”</div>`,
            );
        }

        const internetImageReplacements: Array<
          [RegExp, string, string, string]
        > = [
          [
            /<img\b(?=[^>]*69b912493519fc97c96a3c63_Pro-5)[^>]*\/>/i,
            projectGifs.hyrox,
            "Hyrox project showcase",
            "project-img",
          ],
          [
            /<img\b(?=[^>]*69c77169c075f9e550955265_Blog-7)[^>]*\/>/i,
            testimonialImages.operations,
            "Business operations team collaborating",
            "all-image-cover magnetar-testimonial-image",
          ],
          [
            /<img\b(?=[^>]*69c770ddf4fc327cd0a961b8_Blog-6)[^>]*\/>/i,
            testimonialImages.fintech,
            "Product team discussing a digital platform",
            "all-image-cover magnetar-testimonial-image",
          ],
          [
            /<img\b(?=[^>]*69c770b87e10c610127f10e6_Blog-5)[^>]*\/>/i,
            testimonialImages.commerce,
            "Customer experience team planning growth",
            "all-image-cover magnetar-testimonial-image",
          ],
        ];

        for (const [
          pattern,
          src,
          alt,
          className,
        ] of internetImageReplacements) {
          page = page.replace(
            pattern,
            `<img src="${src}" loading="lazy" alt="${alt}" class="${className}"/>`,
          );
        }

        page = page.replace(
          /<img\b(?=[^>]*69b91221cbb0b80352ca1653_Pro-4)[^>]*\/>/i,
          `<video class="project-img magnetar-project-video" autoplay muted loop playsinline preload="metadata" aria-label="Zentro project showcase"><source src="${projectGifs.zentro}" type="video/mp4"></video>`,
        );

        page = page.replace(
          /<img\b(?=[^>]*69b907df3e07040c28653180_Pro-2)[^>]*\/>/i,
          `<video class="project-img magnetar-project-video" autoplay muted loop playsinline preload="metadata" aria-label="Finovo project showcase"><source src="${projectGifs.finovo}" type="video/mp4"></video>`,
        );

        if (active) setSource(page);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-[100dvh] w-full overflow-hidden bg-[#020204]">
      {loadError ? (
        <div className="flex min-h-[100dvh] items-center justify-center bg-[#f0eff8] font-sans text-[#17142b]">
          The supplied page could not be loaded. Refresh to try again.
        </div>
      ) : (
        <>
          <iframe
            title="Magnetar"
            srcDoc={source}
            className="block min-h-[100dvh] w-full border-0"
            style={{ height: "100dvh" }}
            scrolling="yes"
            onLoad={(event) => {
              setHeroEffectRoot(
                event.currentTarget.contentDocument?.getElementById(
                  "magnetar-plasma-wave-root",
                ) ?? null,
              );
            }}
          />
          {heroEffectRoot
            ? createPortal(
                <PlasmaWave
                  colors={["#5d43bf", "#aa93ff"]}
                  speed={0.42}
                  speed1={0.028}
                  speed2={0.022}
                  dir2={-1}
                  bend1={0.72}
                  bend2={0.42}
                  thickness={0.21}
                  focalLength={1.4}
                  rotationDeg={-5}
                  brightness={0.82}
                  glow={0.42}
                  core={0.1}
                  grain={0.01}
                  fade={0.065}
                  opacity={0.36}
                  quality={0.68}
                  dpr={1.25}
                  mouseInteraction
                  intro
                  lightMode
                  style={{ position: "absolute", inset: 0 }}
                />,
                heroEffectRoot,
              )
            : null}
        </>
      )}
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
