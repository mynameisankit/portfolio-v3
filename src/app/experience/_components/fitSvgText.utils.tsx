export function fitSvgText(element: SVGTextElement, maxWidth: number) {
  element.removeAttribute('textLength');
  if (element.getComputedTextLength() > maxWidth) {
    element.setAttribute('textLength', String(maxWidth));
  }
}
