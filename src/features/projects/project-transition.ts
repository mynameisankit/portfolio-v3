export function createProjectTransition() {
  const state = { animations: [] as Animation[] };
  const cancel = () => {
    state.animations.forEach((animation) => animation.cancel());
    state.animations = [];
  };
  async function animate(
    board: HTMLElement,
    card: HTMLElement,
    expanding: boolean,
    commit: () => void,
  ) {
    const before = card.getBoundingClientRect();
    const boardBefore = board.getBoundingClientRect();
    commit();
    const after = card.getBoundingClientRect();
    const boardAfter = board.getBoundingClientRect();
    const final = getComputedStyle(card).transform;
    const origin = card.style.transformOrigin;
    card.style.transformOrigin = 'top left';
    const timing: KeyframeAnimationOptions = {
      duration: 460,
      easing: 'cubic-bezier(.22,1,.36,1)',
      fill: 'both',
    };
    try {
      state.animations = [
        card.animate(
          [
            {
              transform: `translate(${before.left - after.left}px,${
                before.top - after.top
              }px) scale(${before.width / after.width},${before.height / after.height})`,
            },
            { transform: final === 'none' ? 'none' : final },
          ],
          timing,
        ),
        board.animate(
          [{ height: `${boardBefore.height}px` }, { height: `${boardAfter.height}px` }],
          timing,
        ),
      ];
      const detail = card.querySelector<HTMLElement>('.project-detail');
      if (expanding && detail) {
        state.animations.push(
          detail.animate(
            [
              { opacity: 0, transform: 'translateY(12px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 250, delay: 160, fill: 'both' },
          ),
        );
      }
      if (!expanding) {
        board.querySelectorAll<HTMLElement>(':scope > *').forEach((item) => {
          if (item !== card) {
            state.animations.push(
              item.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 250,
                delay: 100,
                fill: 'both',
              }),
            );
          }
        });
      }
      await Promise.all(state.animations.map((a) => a.finished.catch(() => {})));
    } finally {
      state.animations.forEach((a) => a.cancel());
      state.animations = [];
      card.style.transformOrigin = origin;
    }
  }
  return { animate, cancel };
}
