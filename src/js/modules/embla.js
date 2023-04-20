import EmblaCarousel from 'embla-carousel';

const init = () => {
  const initCarousel = () => {
    const rootNode = document.querySelector('.map__carousel');
    const viewportNode = rootNode.querySelector('.map__carousel-viewport');
    const dotsNode = document.querySelector('.map__dots');
    const options = { loop: true };

    const emblaApi = EmblaCarousel(viewportNode, options);

    // Grab button nodes
    const prevButtonNode = rootNode.querySelector('.map__prev');
    const nextButtonNode = rootNode.querySelector('.map__next');

    // Add click listeners
    prevButtonNode.addEventListener('click', emblaApi.scrollPrev, false);
    nextButtonNode.addEventListener('click', emblaApi.scrollNext, false);

    let dotNodes = [];

    const addDotBtnsWithClickHandlers = () => {
      dotsNode.innerHTML = emblaApi
        .scrollSnapList()
        .map(() => '<button class="map__dot flex" type="button"></button>')
        .join('');

      dotNodes = Array.from(dotsNode.querySelectorAll('.map__dot'));
      dotNodes.forEach((dotNode, index) => {
        dotNode.addEventListener(
          'click',
          () => emblaApi.scrollTo(index),
          false
        );
      });
    };

    const toggleDotBtnsActive = () => {
      const previous = emblaApi.previousScrollSnap();
      const selected = emblaApi.selectedScrollSnap();
      dotNodes[previous].classList.remove('map__dot--selected');
      dotNodes[selected].classList.add('map__dot--selected');
    };

    emblaApi
      .on('init', addDotBtnsWithClickHandlers)
      .on('reInit', addDotBtnsWithClickHandlers)
      .on('init', toggleDotBtnsActive)
      .on('reInit', toggleDotBtnsActive)
      .on('select', toggleDotBtnsActive);

    return () => {
      dotsNode.innerHTML = '';
    };
  };

  const handleMediaMatch = (e) => {
    if (e.matches) {
      initCarousel();
    }
  };

  const matchMedia = window.matchMedia('screen and (max-width: 767px)');
  handleMediaMatch(matchMedia);

  matchMedia.addEventListener('change', () => {
    handleMediaMatch(matchMedia);
  });
};

export { init };
