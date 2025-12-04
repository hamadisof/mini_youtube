export const formatViews = (n) =>
    n >= 1_000_000
        ? (n / 1_000_000).toFixed(1).replace(".0", "") + " M"
        : n >= 1_000
            ? (n / 1_000).toFixed(1).replace(".0", "") + " k"
            : n.toString();
