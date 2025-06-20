import styles from './StatBar.module.css';

interface StatBarProps {
  label: string;
  value: number;
  percentage: number;
}

const getBarColorClass = (percentage: number): string => {
  if (percentage <= 25) return styles.red;
  if (percentage <= 50) return styles.orange;
  if (percentage <= 75) return styles.yellow;
  if (percentage <= 90) return styles.green;
  return styles.blue;
};

const StatBar = ({ label, value, percentage }: StatBarProps) => {
  const barColor = getBarColorClass(percentage);

  return (
    <div className={styles.statRow}>
      <span className={styles.label}>
        {label}: {value}
      </span>
      <div className={styles.barContainer}>
        <div
          className={`${styles.bar} ${barColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;
