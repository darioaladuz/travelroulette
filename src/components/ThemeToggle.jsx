import styles from "../styles.module.css";

const defaultOptions = {
  invertedIconLogic: false
};

export default function ReactThemeToggleButton ({
  isDark,
  onChange,
  invertedIconLogic = defaultOptions.invertedIconLogic
}) {
    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          className={styles.container}
          title={isDark ? "Activate light mode" : "Activate dark mode"}
          aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
        >
          <input
            type="checkbox"
            defaultChecked={invertedIconLogic ? isDark : !isDark}
            onChange={onChange}
          />
          <div />
        </label>
      )
}