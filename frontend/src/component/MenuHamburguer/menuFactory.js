export default function menuFactory(styles) {
    return {
      menuWrap: (isOpen) => styles.menuWrap(isOpen),
      overlay: (isOpen) => styles.overlay(isOpen),
      burgerIcon: (isOpen) => styles.burgerIcon(isOpen),
    };
  }
  