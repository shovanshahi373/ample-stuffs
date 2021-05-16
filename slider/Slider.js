const options = {
  nodes: {
    container__element: "",
    wrapper__element: "",
  },
  aspect__ratio: "",
  size: "",
};

class Controller {
  constructor(container) {
    this.display = new Display(container);
  }
  /**
   *
   * @param {HTMLElement} element
   * @param {Function} handler
   */
  register(type, handler) {
    this.target.slider.addEventListener(type, handler);
  }
  /**
   *
   * @param {MouseEvent} event
   * @param {Object} slider
   */
  static handleMouseDown(instance) {
    return (event) => {
      instance.slider.classList.add("grabbing");
      instance.clicking = true;
      instance.startX = event.offsetX;
      instance.currentX = event.offsetX;
      instance.diffX = instance.startX - instance.currentX + instance.translated;
      this.display.animate(instance);
    };
  }

  static handleMouseUp(instance) {
    return (e) => {
      instance.slider.classList.remove("grabbing");
      instance.clicking = false;
      const movedBy = instance.startX - instance.currentX;
      if (movedBy >= 100 && instance.currentIndex < 2) {
        instance.currentIndex += 1;
      } else if (movedBy <= -100 && instance.currentIndex > 0) {
        instance.currentIndex -= 1;
      }
      instance.translated = instance.currentIndex * this.display.container__width;
      this.display.endAnimation();
      this.display.setPositionX(instance.slider,instance.translated);
      instance.changeStagedImages();
    };
  }

  static handleMouseMove(instance) {
    return e => {
      if (instance.clicking) {
        instance.currentX = e.offsetX;
        instance.diffX =
          instance.startX - instance.currentX + instance.translated;
      }
    }
  }

  static handleMouseLeave(instance) {
    return e => {
      instance.slider.classList.remove("grabbing");
      instance.clicking = false;
      this.display.endAnimation();
      this.display.setPositionX(instance.slider,instance.translated);
    }
  }
}

class Slider {
  constructor(options = options) {
    this.slider = options.nodes.wrapper__element;
    this.container = options.nodes.container__element;
    this.imagestore = [];
    this.currentIndex = -1;
    this.stagedImages = [];
    this.size = options.size || 100;
    this.height = this.size * 1.2;
    this.width = this.size * 2;
    this.startX = 0;
    this.currentX = 0;
    this.diffX = 0;
    this.translated = 0;
    this.clicking = false;
  }
  /**
   *
   * @param {Array} images
   *
   */
  loadImages(images) {
    this.imagestore = images;
    
  }
  addEvent(event, handler) {
    try {
      const controller = new Controller(this.container);
      controller.register(event, handler(this));
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  changeStagedImages() {
    if(this.currentIndex > 0) {
      const prev = this.imagestore[this.currentIndex - 1];
    }
    // const prev = this.imagestore[this.currentIndex - 1]
    const current = this.imagestore[this.currentIndex];
    if(this.currentIndex < this.stagedImages.length - 1) {
      const next = this.imagestore[this.currentIndex + 1];
    }
  }
}

class Display {
  constructor(container) {
    this.animationId = null;
    this.container__element = container;
    this.container__width = this.container__element.getBoundingClientRect().width;
  }
  startAnimation(instance) {
    this.animate(instance);
  }
  animate(instance) {
    this.setPositionX(instance.slider,instance.value);
    this.animationId = requestAnimationFrame(() => this.animate(instance));
  }
  endAnimation() {
    cancelAnimationFrame(this.animationId);
  }
  setPositionX(element,value) {
    element.style.transform = `translateX(calc(-1px * ${value}))`;
  }
}
