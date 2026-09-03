import { Easing, FadeInLeft, FadeInRight, FadeOutLeft, FadeOutRight } from 'react-native-reanimated';

const SWITCH_DURATION = 280;
const SWITCH_EXIT_DURATION = 220;
const SWITCH_SLIDE = 18;
const SWITCH_EASING = Easing.out(Easing.cubic);

export type AuthSlideDirection = 'left' | 'right';

export function authFadeIn(from: AuthSlideDirection) {
  const translateX = from === 'right' ? SWITCH_SLIDE : -SWITCH_SLIDE;
  const entering = from === 'right' ? FadeInRight : FadeInLeft;

  return entering
    .duration(SWITCH_DURATION)
    .easing(SWITCH_EASING)
    .withInitialValues({
      opacity: 0,
      transform: [{ translateX }],
    });
}

export function authFadeOut(to: AuthSlideDirection) {
  const exiting = to === 'right' ? FadeOutRight : FadeOutLeft;
  return exiting.duration(SWITCH_EXIT_DURATION).easing(SWITCH_EASING);
}
