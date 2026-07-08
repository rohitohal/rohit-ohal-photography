import "./PortfolioFilter.css";

const FILTERS = [
  {
    label: "All",
    value: "all",
  },

  {
    label: "Weddings",
    value: "weddings",
  },

  {
    label: "Portraits",
    value: "portraits",
  },

  {
    label: "Industrial",
    value: "industrial",
  },

  {
    label: "Food & Beverage",
    value: "food-beverage",
  },

  {
    label: "Events",
    value: "events",
  },

  {
    label: "Editorial",
    value: "editorial",
  },
];

export default function PortfolioFilter({
  active,
  onChange,
}) {
  return (
    <nav
      className="portfolio-filter"
      aria-label="Portfolio Categories"
    >
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={
            active === filter.value
              ? "portfolio-filter-btn active"
              : "portfolio-filter-btn"
          }
          onClick={() =>
            onChange(filter.value)
          }
        >
          {filter.label}
        </button>
      ))}
    </nav>
  );
}