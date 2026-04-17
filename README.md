# Unfold

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Unfold** is a lightweight FAQ (Frequently Asked Questions) accordion component built entirely with vanilla TypeScript — no frameworks, no runtime dependencies. It renders a list of questions where each item can be expanded to reveal its answer. Only one question can be open at a time: clicking an open question collapses it, and clicking a different one automatically closes the current one before opening the new one.

The component is designed as a self-contained, embeddable section meant to be dropped into any web page. It follows a clean component lifecycle pattern where each element exposes an optional `cleanup()` method to safely remove event listeners when the component is unmounted, preventing memory leaks in long-lived applications.

Under the hood, the architecture separates concerns into two layers: the `Question` component handles the rendering and interaction of a single expandable item, while `UnfoldPage` orchestrates the full list, manages the single-open state, and delegates cleanup to each child. Questions data is loaded from a static constants file, making it trivial to swap in dynamic data from an API.

The project includes a full test suite using Jest, Testing Library, and ts-jest, with coverage enforced at 70% across branches, functions, lines, and statements. Code quality is maintained through ESLint, Prettier, and a Husky pre-commit hook that runs lint and format checks on staged files automatically.

## Technologies used

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/unfold`](https://www.diegolibonati.com.ar/#/project/unfold)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
