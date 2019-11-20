function SetupSlider(sliderId) {
    this.isClicked = false;
    this.position = 0;
    this.percentages = 0;
    this.sliderId = sliderId;
}

SetupSlider.prototype.init = function() {
    this.slider = document.querySelector(`#${this.sliderId} .slider`);
    this.pin = document.querySelector(`#${this.sliderId} .pin`);
    this.percentagesLabel = document.querySelector(`#${this.sliderId} .percentages`);

    this.pin.addEventListener("mousedown", e => {
        if (!this.position) this.position = e.clientX;
        this.isClicked = true;
    });

    this.slider.addEventListener("mousedown", e => {
        this.moveSlider(e);
    });

    document.addEventListener("mouseup", e => {
        this.isClicked = false;
    });

    this.slider.addEventListener("mousemove", e => {
        if (this.isClicked) {
            this.moveSlider(e);
        }
    });
};

SetupSlider.prototype.moveSlider = function (e) {
    let pos = e.layerX - this.pin.offsetWidth / 2;
    let maxPos = this.slider.offsetWidth - this.pin.offsetWidth / 2;
    let minPos = 0 - this.pin.offsetWidth / 2;

    if (pos >= minPos && pos <= maxPos) {
        this.percentages = Math.trunc(
            (pos + this.pin.offsetWidth / 2) / this.slider.offsetWidth * 100
        );
        this.percentagesLabel.innerHTML = `${this.percentages}%`;
        this.pin.style.transform = `translateX(${pos}px)`;
        this.slider.style.background = `linear-gradient(to right, #a2ea4c ${pos +
        this.pin.offsetWidth / 2}px, #07aa91 0, #07aa91)`;
    }
};

const slider = new SetupSlider("setupSlider");
slider.init();

const slider_2 = new SetupSlider("setupSlider_2");
slider_2.init();
