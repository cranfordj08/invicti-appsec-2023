import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import DrawSVGPlugin from '../plugins/DrawSVGPlugin';
import SplitText from '../plugins/SplitText';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);

const init = () => {
  // Mobile sticky header
  var scrollPosition = window.scrollY;
  var header = document.querySelector('.header');

  window.addEventListener('scroll', function () {
    if (window.innerWidth < 767) {
      scrollPosition = window.scrollY;
      if (scrollPosition >= 80) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }
  });

  // custom hero animation
  const hero = document.querySelector('.hero__container');

  if (hero) {
    const heroText = hero.querySelectorAll('.hero__bg-text');
    const heroCopy = hero.querySelectorAll('.hero__copy');
    const split = new SplitText(heroText, { type: 'lines' });

    gsap.set(heroText, { opacity: 1 });
    gsap
      .timeline({
        delay: 0.5,
        defaults: { ease: 'sine' },
        onComplete: () => {
          split.revert();
        },
      })
      .to(split.lines, { duration: 0.4, x: 0, opacity: 1, stagger: 0.2 })
      .to(heroCopy, { opacity: 1, x: 0, duration: 0.3 }, '>-0.2')
      .to('.hero__wave-image', { opacity: 1, duration: 0.5 }, '>-0.1');
  }

  // vulnerabilities__line-graph one-off animation.
  const vulnerabilitiesCharts = document.querySelectorAll(
    '.vulnerabilities__line-graph'
  );
  if (vulnerabilitiesCharts.length > 0) {
    vulnerabilitiesCharts.forEach((vulnerabilities) => {
      const line = vulnerabilities.querySelector('.the-line');
      const dots = vulnerabilities.querySelectorAll('.plot-point');
      const mobile = vulnerabilities.classList.contains(
        'vulnerabilities__line-graph--mobile'
      );

      const points = !mobile
        ? '82 386, 121 380, 161 385, 201 375, 241 370, 281 375, 321 365, 361 345, 401 335, 441 335, 481 325, 521 295, 561 295, 601 265, 641 257, 681 240, 721 205, 761 185, 801 135'
        : '53 265, 93 275, 133 264, 173 241, 213 238, 253 218, 293 210, 333 170';

      const pointsArray = points.split(', ');

      const yVals = [];

      pointsArray.forEach((point) => {
        const getXY = point.split(' ');
        const num = { y: getXY[1] };
        yVals.push(num);
      });

      const updateAnimation = () => {
        const animationPoints = !mobile
          ? `82 ${yVals[0].y}, 121 ${yVals[1].y}, 161 ${yVals[2].y}, 201 ${yVals[3].y}, 241 ${yVals[4].y}, 281 ${yVals[5].y}, 321 ${yVals[6].y}, 361 ${yVals[7].y}, 401 ${yVals[8].y}, 441 ${yVals[9].y}, 481 ${yVals[10].y}, 521 ${yVals[11].y}, 561 ${yVals[12].y}, 601 ${yVals[13].y}, 641 ${yVals[14].y}, 681 ${yVals[15].y}, 721 ${yVals[16].y}, 761 ${yVals[17].y}, 801 ${yVals[18].y}`
          : `53 ${yVals[0].y}, 93 ${yVals[1].y}, 133 ${yVals[2].y}, 173 ${yVals[3].y}, 213 ${yVals[4].y}, 253 ${yVals[5].y}, 293 ${yVals[6].y}, 333 ${yVals[7].y}`;

        gsap.set(line, { attr: { points: animationPoints } });
      };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: vulnerabilities,
            start: 'top 60%',
            end: 'bottom top',
            once: true,
          },
          onUpdate: updateAnimation,
        })
        .set(line, { autoAlpha: 1 })
        .from(yVals, {
          y: !mobile ? 443 : 309,
          duration: 0.333,
          stagger: { amount: 0.666 },
        })
        .from(
          dots,
          {
            autoAlpha: 0,
            attr: { cy: !mobile ? 443 : 309 },
            duration: 0.333,
            stagger: { amount: 0.666 },
          },
          0
        );
    });
  }

  // csrf chart one-off animation
  const csrfCharts = document.querySelectorAll('.csrf__graph');
  if (csrfCharts.length > 0) {
    csrfCharts.forEach((chart) => {
      const polygon = chart.querySelector('.chart-bg');
      const dots = chart.querySelectorAll('.point');
      const verts = chart.querySelectorAll('.vert');
      const desktop = chart.classList.contains('csrf__graph--desktop');
      const yVals = desktop
        ? [{ y: 186 }, { y: 240 }, { y: 374 }, { y: 256 }]
        : [{ y: 267 }, { y: 293 }, { y: 345 }, { y: 308 }];
      const duration = 0.4;

      gsap.set(dots, { transformOrigin: '50% 50%' });
      gsap.set(verts, { transformOrigin: '50% 100%' });
      gsap.set(polygon, {
        attr: {
          points: desktop
            ? '43,517 43,517 444,517 848,517 1244,517 1244,517'
            : '31,432 31,432 130,432 233,432 333,432 333,432',
        },
      });

      const updateAnimation = () => {
        const animationPoints = desktop
          ? `43,517 43,${yVals[0].y} 444,${yVals[1].y} 848,${yVals[2].y} 1244,${yVals[3].y} 1244,517`
          : `31,432 31,${yVals[0].y} 130,${yVals[1].y} 233,${yVals[2].y} 333,${yVals[3].y} 333,432`;

        gsap.set(polygon, { attr: { points: animationPoints } });
      };

      gsap
        .timeline({
          onUpdate: updateAnimation,
          defaults: {
            ease: 'sine',
            duration,
          },
          scrollTrigger: {
            start: '90% bottom',
            end: '25% top',
            trigger: chart,
            once: true,
          },
        })
        .from(yVals, {
          y: desktop ? 517 : 432,
          stagger: { amount: 0.5 },
        })
        .from(verts, { scaleY: 0, stagger: { amount: 0.5 } }, 0)
        .from(
          dots,
          { scale: 0, stagger: { amount: 0.5 }, duration: 0.2 },
          duration
        );
    });
  }

  // improve one-off
  const improveLines = document.querySelector('.improve');
  if (improveLines) {
    const line1 = improveLines.querySelectorAll('.improve__start-line');
    const line2 = improveLines.querySelectorAll('.improve__horizontal-line');
    const line3 = improveLines.querySelectorAll('.improve__end-line');
    const dot1 = improveLines.querySelectorAll('.improve__dot--start');
    const dot2 = improveLines.querySelectorAll('.improve__dot--end');
    const trigger = improveLines.querySelector('.improve__left-box');

    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          start: '50% 50%',
          end: '50% 50%',
          trigger,
          once: true,
        },
      })
      .from(dot1, { scale: 0, duration: 0.2 })
      .from(line1, { scaleY: 0, duration: 0.3 }, 0)
      .from(line2, { scaleX: 0, duration: 0.4 })
      .from(line3, { scaleY: 0, duration: 0.2 })
      .from(dot2, { scale: 0, duration: 0.2 });
  }

  // legacyBarChart one-off animation.
  const legacyBarChart = document.querySelector('.legacy__graph');

  if (legacyBarChart) {
    const bars = legacyBarChart.querySelectorAll('.bar');
    const lines = legacyBarChart.querySelectorAll('.line');
    const text = legacyBarChart.querySelectorAll('.text');
    const barMobile = legacyBarChart.querySelectorAll('.bar-mobile');
    const textMobile = legacyBarChart.querySelectorAll('.text-mobile');

    gsap.set([bars, lines, text, textMobile], { autoAlpha: 1 });
    gsap.set(barMobile, { visibility: 'visible', scaleY: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: legacyBarChart,
          start: 'top 40%',
          end: 'bottom top',
        },
      })
      .from(bars, { scaleY: 0, stagger: 0.2 })
      .from(lines, { scaleX: 0, stagger: 0.2 }, '-=.2')
      .from(text, { opacity: 0, stagger: 0.2, duration: 1 }, 0.4);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: legacyBarChart,
          start: 'top 75%',
          end: 'bottom top',
        },
      })
      .to(barMobile, { scaleY: 1, stagger: 0.2 })
      .fromTo(
        barMobile,
        { opacity: 0 },
        { opacity: 1, stagger: 0.2, duration: 0.2 },
        0
      )
      .from(textMobile, { autoAlpha: 0, stagger: -0.2, duration: 1 }, 0.2);
  }

  // data set numbers animation
  const dataSets = gsap.utils.toArray('.animated-big-stat');

  if (dataSets.length > 0) {
    dataSets.forEach((dataSet) => {
      const statText = dataSet.querySelector('.big-stat-text');

      gsap
        .timeline({
          scrollTrigger: {
            trigger: dataSet,
            start: 'top 75%',
            end: 'bottom 10%',
            once: true,
          },
        })
        .to(dataSet, { '--num-bg-x': '100%', ease: 'sine.in', duration: 0.666 })
        .from(statText, { yPercent: 100, autoAlpha: 0 }, 0.25);
    });
  }

  // SSRF chart animation
  const animatedSSRF = document.querySelectorAll('.animated-ssrf');
  if (animatedSSRF.length > 0) {
    animatedSSRF.forEach((ssrf) => {
      const rings = ssrf.querySelectorAll('.ssrf-ring');
      const line = ssrf.querySelector('line');
      gsap.set(rings, { transformOrigin: '50% 50%' });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ssrf,
            start: 'bottom bottom',
            end: 'top top',
          },
        })
        .from(line, { drawSVG: 0 })
        .fromTo(rings, { scale: 0 }, { scale: 1, stagger: -0.2 }, 0);
    });
  }

  // UTILITY - heading animations add class js-animated-heading animated-fade-up directly to element
  const animatedHeadings = gsap.utils.toArray('.animated-fade-up');

  if (animatedHeadings.length > 0) {
    animatedHeadings.forEach((heading) => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 90%',
          end: 'bottom 10%',
          once: true,
        },
        y: 30,
        autoAlpha: 0,
        ease: 'sine',
        duration: 0.666,
      });
    });
  }

  // UTILITY - paragraph copy animations. use class animated-inner-content on p wrapper
  const animatedCopy = gsap.utils.toArray('.animated-inner-content');
  if (animatedCopy.length > 0) {
    animatedCopy.forEach((copy) => {
      const paragraphs = copy.querySelectorAll('p');
      if (!paragraphs.length > 0) return;

      gsap.from(paragraphs, {
        scrollTrigger: {
          trigger: copy,
          start: 'top 90%',
          end: 'bottom 10%',
          once: true,
        },
        y: 30,
        autoAlpha: 0,
        stagger: 0.2,
        duration: 0.666,
      });
    });
  }

  // UTILITY cover icon animations
  const floatingCovers = document.querySelectorAll('.animated-floating-covers');

  if (floatingCovers.length > 0) {
    floatingCovers.forEach((coverWrapper) => {
      const covers = coverWrapper.querySelectorAll('.floating-cover');

      if (covers.length === 3) {
        gsap.fromTo(
          covers,
          {
            yPercent: gsap.utils.wrap([50, 20, 10]),
            rotate: gsap.utils.wrap([-50, 0, 30]),
          },
          {
            yPercent: gsap.utils.wrap([-60, -20, -10]),
            rotate: gsap.utils.wrap([60, 0, -40]),
            ease: 'none',
            scrollTrigger: {
              trigger: coverWrapper,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    });
  }

  const mapCards = document.querySelectorAll('.animated-map-card');

  if (mapCards.length > 0) {
    mapCards.forEach((mapCard) => {
      gsap.from(mapCard, {
        scale: 0,
        ease: 'sine',
        scrollTrigger: {
          trigger: mapCard,
          start: 'top 80%',
          end: 'bottom 20%',
          once: true,
        },
      });
    });
  }

  // same-old parallax numbers
  const shadowNumbers = document.querySelectorAll('.same-old__shadow-number');

  if (shadowNumbers.length > 0) {
    shadowNumbers.forEach((shadowNumber) => {
      gsap.fromTo(
        shadowNumber,
        {
          yPercent: 30,
        },
        {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: shadowNumber,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });
  }

  // pinwheeling animation
  const scarcerPinwheel = document.querySelector('.scarcer__graphic');

  if (scarcerPinwheel) {
    const pinwheels = scarcerPinwheel.querySelectorAll('.pin-wheel');
    gsap.set(pinwheels, { transformOrigin: '50% 50%' });
    gsap.fromTo(
      pinwheels,
      {
        rotate: gsap.utils.wrap([-45, 45, -45]),
      },
      {
        rotate: gsap.utils.wrap([45, -45, 45]),
        ease: 'none',
        scrollTrigger: {
          trigger: scarcerPinwheel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }

  const foundationalPinwheel = document.querySelector('.foundational__circle');

  if (foundationalPinwheel) {
    const pinwheel = foundationalPinwheel.querySelectorAll('.pin-wheel');

    gsap.set(pinwheel, { transformOrigin: '50% 50%' });
    gsap.fromTo(
      pinwheel,
      {
        rotate: -20,
      },
      {
        rotate: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: foundationalPinwheel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }

  const whatsNextPinwheel = document.querySelector('.whats-next__graphic');

  if (whatsNextPinwheel) {
    const pinwheels = whatsNextPinwheel.querySelectorAll('.pin-wheel');
    gsap.fromTo(
      pinwheels,
      {
        rotate: -90,
      },
      {
        rotate: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: whatsNextPinwheel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }

  // in-action__card animations
  const actionCards = gsap.utils.toArray('.in-action__card');
  if (actionCards.length > 0) {
    actionCards.forEach((card) => {
      const icon = card.querySelector('.in-action__icon');
      const title = card.querySelector('.in-action__card-heading');
      const copy = card.querySelector('.in-action__card-copy');

      gsap
        .timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 66.6%',
            end: 'bottom 10%',
            once: true,
          },
        })
        .from(icon, {
          scale: 0.5,
          autoAlpha: 0,
        })
        .from(
          [title, copy],
          {
            y: 30,
            autoAlpha: 0,
            stagger: 0.2,
          },
          0.2
        );
    });
  }

  // security hygiene section specific animation
  const securityHygiene = document.querySelector('.security-hygiene');

  if (securityHygiene) {
    const securityHygieneGraphic = securityHygiene.querySelector(
      '.security-hygiene__graphic'
    );
    const securityHygieneStroke =
      securityHygiene.querySelectorAll('.circle-stroke');
    const securityHygieneFill =
      securityHygiene.querySelectorAll('.circle-fill');
    const securityHygieneEndCircle =
      securityHygiene.querySelectorAll('.end-circle');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: securityHygieneGraphic,
          start: 'top 50%',
          end: 'bottom 50%',
          once: true,
        },
      })
      .from(securityHygiene, { '--down-line': 0, duration: 0.2 })
      .from(securityHygiene, { '--bottom-line': 0, duration: 0.6 }, 0.2)
      .from(securityHygiene, { '--up-line': 0, duration: 0.2 }, 0.8)
      .from(securityHygieneEndCircle, {
        scale: 0,
        transformOrigin: '50% 100%',
        duration: 0.1,
      })
      .from(
        securityHygieneStroke,
        {
          drawSVG: '50% 50%',
          ease: 'none',
          stagger: {
            amount: 1.25,
            ease: 'sine.in',
          },
        },
        0
      )
      .from(
        securityHygieneFill,
        {
          opacity: 0,
          ease: 'none',
          stagger: {
            amount: 1.25,
            ease: 'sine.in',
          },
        },
        0
      );
  }

  // ring chart with number inside utility animation
  const rings = gsap.utils.toArray('.ring');

  if (rings.length > 0) {
    rings.forEach((ring) => {
      const number = ring.getAttribute('data-number');
      const chartLine = ring.querySelector('.chart-line');
      const countNumber = ring.querySelector('.ring-number');
      const num = { count: 0 };

      gsap.set(chartLine, { autoAlpha: 1 });

      gsap
        .timeline({
          defaults: { duration: 1, ease: 'sine.out' },
          scrollTrigger: {
            trigger: ring,
            start: 'top 66.66%',
            end: 'bottom 33.333%',
            once: true,
          },
        })
        .fromTo(chartLine, { drawSVG: 0 }, { drawSVG: `${number}%` }, 0)
        .to(
          num,
          {
            count: number,
            onUpdate: () => {
              countNumber.innerHTML = `${num.count.toFixed(0)}%`;
            },
          },
          0
        );
    });
  }

  // UTILITY - data card animations
  const dataCards = gsap.utils.toArray('.animated-data-card');

  if (dataCards.length > 0) {
    dataCards.forEach((dataCard) => {
      const iconBars = dataCard.querySelectorAll('.data-card-icon-bar');
      const iconArrow = dataCard.querySelector('.data-card-icon-arrow');

      // be sure these classes are added in the HTML
      const number = dataCard.querySelector('.data-card-number');
      const info = dataCard.querySelectorAll('.data-card-copy');

      if (!number || !info || !iconArrow) return;

      gsap.set([iconBars, iconArrow], { autoAlpha: 1 });
      gsap.set(iconBars, { scaleY: 0, transformOrigin: '100% 100%' });
      gsap.set(iconArrow, { scale: 0, transformOrigin: '50% 50%' });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: dataCard,
            start: 'top 75%',
            end: 'bottom top',
            once: true,
          },
        })
        .from(number, { autoAlpha: 0 })
        .to(iconBars, { scaleY: 1, stagger: 0.0125 }, 0)
        .to(iconArrow, { scale: 1, duration: 0.2 }, '-=.2')
        .from(info, { y: 10, autoAlpha: 0, stagger: 0.125 }, '-=.2');
    });
  }

  // vertical bar chart utility animation
  const verticalBarCharts = gsap.utils.toArray('.animated-bar-chart-vertical');

  if (verticalBarCharts.length > 0) {
    verticalBarCharts.forEach((chart) => {
      const bars = chart.querySelectorAll('.bar');
      const value = chart.querySelectorAll('.value');

      if (!bars || !value) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: chart,
            start: 'top 60%',
            end: 'bottom top',
            once: true,
          },
        })
        .from(bars, {
          transformOrigin: '50% 100%',
          duration: 0.4,
          scaleY: 0,
          stagger: 0.125,
        })
        .from(
          value,
          {
            transformOrigin: '50% 50%',
            scale: 0,
            duration: 0.2,
            stagger: 0.125,
          },
          0.3
        );
    });
  }

  // horizontal bar chart utility animation
  const horizontalBarCharts = gsap.utils.toArray(
    '.animated-bar-chart-horizontal'
  );

  if (horizontalBarCharts.length > 0) {
    horizontalBarCharts.forEach((chart) => {
      const bars = chart.querySelectorAll('.bar');
      const value = chart.querySelectorAll('.value');

      if (!bars || !value) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: chart,
            start: 'top 50%',
            end: 'bottom top',
            once: true,
          },
        })
        .from(bars, {
          transformOrigin: '0% 50%',
          duration: 0.6,
          scaleX: 0,
          stagger: 0.125,
        })
        .from(
          value,
          {
            transformOrigin: '50% 50%',
            scale: 0,
            duration: 0.3,
            stagger: 0.125,
          },
          0.3
        );
    });
  }
};

export { init };
