import {AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'om-background-beams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-background-beams.component.html",
  styleUrl: "./ngx-background-beams.component.scss",
})
export class NgxBackgroundBeamsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('OmBackgroundBeams') componentRef!: ElementRef<HTMLElement>;

  @Input()
  set gradientColorValues(colors: string[]) {
    if (colors.length !== 3) {
      throw new Error('om-background-beams: gradient colors need to be exactly 3 values.');
    }

    this.gradientColors = colors;
  }

  gradientColors: string[] = ['#18CCFC', '#6344F5', '#AE48FF'];

  @Input()
  pathColor: string = 'rgba(255, 255, 255, 0.08)';

  @Input() pathQuantity: number = 50;

  paths: string[] = [];

  x1: string[] = [];
  x2: string[] = [];
  y1: string[] = [];
  y2: string[] = [];

  delays: number[] = [];
  durations: number[] = [];

  private animationFrameId?: number;
  private observer?: IntersectionObserver;
  private inViewport = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.generatePaths();
      this.initializeIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.observer && this.componentRef.nativeElement) {
      this.observer.unobserve(this.componentRef.nativeElement);
    }
  }

  generatePaths(): void {
    this.paths = [];
    this.x1 = [];
    this.x2 = [];
    this.y1 = [];
    this.y2 = [];
    this.delays = [];
    this.durations = [];

    const firstPath = {
      mX1: -380, mY1: -189, cX1: -380, cY1: -189, cX2: -312, cY2: 216,
      cX3: 152, cY3: 343, cX4: 616, cY4: 470, cX5: 684, cY5: 875
    };

    const lastPath = {
      mX1: -37, mY1: -581, cX1: -37, cY1: -581, cX2: 31, cY2: -176,
      cX3: 495, cY3: -49, cX4: 959, cY4: 78, cX5: 1027, cY5: 483
    };

    for (let i = 0; i < this.pathQuantity; i++) {
      const t = i / (this.pathQuantity - 1);

      const mX1 = firstPath.mX1 + t * (lastPath.mX1 - firstPath.mX1);
      const mY1 = firstPath.mY1 + t * (lastPath.mY1 - firstPath.mY1);
      const cX1 = firstPath.cX1 + t * (lastPath.cX1 - firstPath.cX1);
      const cY1 = firstPath.cY1 + t * (lastPath.cY1 - firstPath.cY1);
      const cX2 = firstPath.cX2 + t * (lastPath.cX2 - firstPath.cX2);
      const cY2 = firstPath.cY2 + t * (lastPath.cY2 - firstPath.cY2);
      const cX3 = firstPath.cX3 + t * (lastPath.cX3 - firstPath.cX3);
      const cY3 = firstPath.cY3 + t * (lastPath.cY3 - firstPath.cY3);
      const cX4 = firstPath.cX4 + t * (lastPath.cX4 - firstPath.cX4);
      const cY4 = firstPath.cY4 + t * (lastPath.cY4 - firstPath.cY4);
      const cX5 = firstPath.cX5 + t * (lastPath.cX5 - firstPath.cX5);
      const cY5 = firstPath.cY5 + t * (lastPath.cY5 - firstPath.cY5);

      const path = `M${mX1} ${mY1}` +
        `C${cX1} ${cY1} ${cX2} ${cY2} ${cX3} ${cY3}` +
        `C${cX4} ${cY4} ${cX5} ${cY5} ${cX5} ${cY5}`;

      this.paths.push(path);

      this.x1.push('0%');
      this.x2.push('0%');
      this.y1.push('0%');
      this.y2.push('0%');

      this.delays.push(Math.random() * 10);
      this.durations.push(Math.random() * 10 + 10);
    }
  }

  initializeIntersectionObserver() {
    let observerTimeout: any;
    this.observer = new IntersectionObserver(([entry]) => {
      clearTimeout(observerTimeout);
      observerTimeout = setTimeout(() => {
        if (entry.isIntersecting) {
          this.inViewport = true;
          this.startAnimations();
        } else {
          this.inViewport = false;
          this.generatePaths();
        }
      }, 100);
    });

    // Observe the component
    if (this.observer && this.componentRef.nativeElement) {
      this.observer.observe(this.componentRef.nativeElement);
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  startAnimations(): void {
    this.paths.forEach((_, index) => {
      const delay = this.delays[index] * 1000;
      const duration = this.durations[index] * 1000;

      setTimeout(() => {
        this.animateGradient(index, duration);
      }, delay);
    });
  }

  animateGradient(index: number, duration: number): void {
    const startTime = performance.now();
    const randomY2Value = 93 + Math.random() * 8;

    const animate = (currentTime: number) => {
      if (!this.inViewport) {
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.x1[index] = `${progress * 100}%`;
      this.x2[index] = `${progress * 95}%`;
      this.y1[index] = `${progress * 100}%`;
      this.y2[index] = `${progress * randomY2Value}%`;

      this.updateGradientAttributes(index);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.restartAnimation(index, duration);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  updateGradientAttributes(index: number): void {
    const gradientElement = document.getElementById(`linearGradient-${index}`);
    if (gradientElement) {
      gradientElement.setAttribute('x1', this.x1[index]);
      gradientElement.setAttribute('x2', this.x2[index]);
      gradientElement.setAttribute('y1', this.y1[index]);
      gradientElement.setAttribute('y2', this.y2[index]);
    }
  }

  restartAnimation(index: number, duration: number): void {
    setTimeout(() => {
      this.x1[index] = '0%';
      this.x2[index] = '0%';
      this.y1[index] = '0%';
      this.y2[index] = '0%';

      this.animateGradient(index, duration);
    }, Math.random() * 10000);
  }
}
