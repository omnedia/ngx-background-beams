# ngx-background-beams

`@omnedia/ngx-background-beams` is an Angular component that generates dynamic animated background beams with customizable gradients and motion paths. It creates visually captivating backgrounds, ideal for enhancing the aesthetics of your application with smooth, animated beams.

## Features

- Dynamic Paths: Generates smooth, animated SVG path beams that are customizable in quantity and motion.
- Customizable Gradients: Define up to 3 gradient colors to create unique color transitions for the beams.
- Responsive & Interactive: Animations are tied to the viewport using an intersection observer, so they trigger only when visible.

## Installation

Install the library using npm:

```bash
npm install @omnedia/ngx-background-beams
```

## Usage

Import the `NgxBackgroundBeamsComponent` in your Angular module or component:

```typescript
import {NgxBackgroundBeamsComponent} from '@omnedia/ngx-background-beams';

@Component({
  ...
    imports:
[
  ...
    NgxBackgroundBeamsComponent,
],
...
})
```

Use the component in your template:

```html

<om-background-beams
  [gradientColorValues]="['#18CCFC', '#6344F5', '#AE48FF']"
  pathColor="rgba(255, 255, 255, 0.1)"
  [pathQuantity]="30"
>
  <div class="your-content">

  </div>
</om-background-beams>
```

This creates a dynamic background with animated beams using the specified gradient colors and path count.
Example with Content

```html

<om-background-beams
  [gradientColorValues]="['#18CCFC', '#6344F5', '#AE48FF']"
  pathColor="rgba(255, 255, 255, 0.08)"
  [pathQuantity]="50"
>
  <div class="content">
    <h1>Welcome to the Dynamic World of Beams!</h1>
    <p>Beautiful background animations for your Angular apps.</p>
  </div>
</om-background-beams>
```

## How It Works

- Path Generation: The component calculates multiple dynamic SVG paths, animating them over time. Each path has randomized motion, start and end points, giving a lively, fluid feel to the background.
- Viewport Awareness: With an intersection observer, animations start when the component enters the viewport, ensuring performance is optimized.
- Gradient Motion: The beams use a linear gradient that dynamically shifts over time, providing a mesmerizing, continuous motion effect.

## API

```html

<om-background-beams
  [gradientColorValues]="['#18CCFC', '#6344F5', '#AE48FF']"
  [pathColor]="'rgba(255, 255, 255, 0.08)'"
  [pathQuantity]="50"
>
  <ng-content></ng-content>
</om-background-beams>
```

- `gradientColorValues` (optional):  Array of exactly 3 colors for the gradient. Must provide exactly 3 colors. Defaults to `['#18CCFC', '#6344F5', '#AE48FF']`.
- `pathColor` (optional):  Defines the color of the path lines. Defaults to `rgba(255, 255, 255, 0.08)`.
- `pathQuantity` (optional): Number of animated paths to generate. Defaults to `50`.

Example

```html

<om-background-beams
  [gradientColorValues]="['#FF5733', '#C70039', '#900C3F']"
  pathColor="rgba(255, 255, 255, 0.1)"
  [pathQuantity]="30"
>
  <div class="example-content">
    <h1>Stunning Visual Effects</h1>
  </div>
</om-background-beams>
```

This example draws 30 animated beams with a red-to-purple gradient, creating an eye-catching background for your content.

## Performance Considerations

- Path Quantity: Higher numbers of paths can add complexity and visual density, but may affect performance on low-end devices or with large screen resolutions.
- Viewport Optimization: The component uses an intersection observer to ensure animations are only running when the component is visible on the screen, which helps save resources.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.
