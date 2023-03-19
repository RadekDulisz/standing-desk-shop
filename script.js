window.addEventListener("scroll", function(){
  var nav = document.querySelector(".nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
})

class CarouselItem {
  status = 'visible' // ['visible', 'active', 'off-screen']
  
  constructor(domNode, index, width, carouselInstance) {
    this.element = domNode
    this.index = index
    this.carousel = carouselInstance
    this.width = width

    this.element.style.width = `${width}%`
    this.element.addEventListener('click', () => this.selectSlide())
    this.element.style.left = `${index * width}%`
  }

  selectSlide () {
    this.carousel.setCurrentSlide(this.index)
  }

  updatePosition (offset) {
    this.element.style.left = `${(this.index + offset) * this.width}%`
  }

  setStatus (status) {
    this.status = status
    switch (this.status) {
      case 'active':
        this.element.style.opacity = 1
        return
      case 'visible':
        this.element.style.opacity = 0.4
        return
      case 'off-screen':
        this.element.style.opacity = 0
        return
    
      default:
        this.element.style.opacity = 0.4
    }
  }
}

class Carousel {
  isPaused = false

  constructor({ containerSelector, itemSelector, limit, perSlideTime = 3000, onUpdate = () => {} }) {
    this.container = document.querySelector(containerSelector)
    
    this.limit = limit
    this.onUpdate = onUpdate
    this.perSlideTime = perSlideTime
    this.slideWidth = 100 / limit
    this.centerSlidePosition = Math.ceil(this.limit / 2) - 1
    this.visibleSlidesMargin = Math.floor(this.limit / 2)
    this.currentSlideIndex = this.centerSlidePosition

    this.slides = this.getSlides(itemSelector)
    this.total = this.slides.length

    this.updateSlides()

    this.startCarousel()
  }

  getSlides (itemSelector) {
    return Array.from(this.container.querySelectorAll(itemSelector))
      .map((node, index) => {
        return new CarouselItem(node, index, this.slideWidth, this)
      })
  }

  setCurrentSlide (index) {
    this.currentSlideIndex = index
    this.updateSlides()

    this.onUpdate(this.currentSlideIndex)
  }

  updateSlides () {
    const offset = this.centerSlidePosition - this.currentSlideIndex
    this.slides.forEach((slide, index) => {
      if (index === this.currentSlideIndex) slide.setStatus('active')
      else if (index >= this.currentSlideIndex - this.visibleSlidesMargin && index <= this.currentSlideIndex + this.visibleSlidesMargin) {
        slide.setStatus('visible')
      }
      else slide.setStatus('off-screen')

      slide.updatePosition(offset)
    })
  }

  startCarousel () {
    setInterval(() => this.nextSlide(), this.perSlideTime)

    this.container.addEventListener('mouseenter', () => {
      this.isPaused = true
    })
    this.container.addEventListener('mouseleave', () => {
      this.isPaused = false
    })
  }

  nextSlide () {
    if (this.isPaused) return

    if (this.currentSlideIndex < this.total - 1) this.setCurrentSlide(this.currentSlideIndex + 1)
    else this.setCurrentSlide(0)
  }
}


const quoteContainer = document.querySelector('#quote-container')
const QUOTES = [
  'Habitasse tellus aliquet aliquam a morbi. Et pulvinar urna venenatis duis quam.',
  'Et pulvinar urna venenatis duis quam. Habitasse tellus aliquet aliquam a morbi.',
  'Fusce posuere, neque eu mollis egestas, libero sapien finibus nibh, sagittis.',
  'Praesent interdum, lacus vel hendrerit rhoncus, ligula velit porttitor arcu.',
  'Nam faucibus, metus sed sodales consequat, lorem ipsum.',
  'Habitasse tellus aliquet aliquam a morbi. Et pulvinar urna venenatis duis quam.',
  'Et pulvinar urna venenatis duis quam. Habitasse tellus aliquet aliquam a morbi.',
  'Fusce posuere, neque eu mollis egestas, libero sapien finibus nibh, sagittis.',
  'Praesent interdum, lacus vel hendrerit rhoncus, ligula velit porttitor arcu.',
  'Nam faucibus, metus sed sodales consequat, lorem ipsum.',
  'Praesent interdum, lacus vel hendrerit rhoncus, ligula velit porttitor arcu.',
  'Nam faucibus, metus sed sodales consequat, lorem ipsum.',
]

const limit = window.innerWidth > 1200
  ? 7
  : window.innerWidth > 800
    ? 5
    : 3

const logoCarousel = new Carousel({
  containerSelector: '#logo-carousel',
  itemSelector: '.carousel__logo',
  limit,
  perSlideTime: 3000,
  onUpdate: (selectedIndex) => {
    const quote = QUOTES[selectedIndex]
    quoteContainer.innerText = `"${quote || 'Missing Quote'}"`
  }
})

// discount banner

  const $discountBanner = document.querySelector(".section--discount");
  const $discountBannerButton = $discountBanner.querySelector(".discount__button");

  $discountBannerButton.addEventListener("click", () => {
    $discountBanner.remove();
  });