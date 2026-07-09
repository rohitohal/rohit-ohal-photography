import {
  FolderKanban,
  Images,
  BookOpen,
  HardDrive,
} from "lucide-react";

const icons = {
  projects: FolderKanban,
  images: Images,
  journal: BookOpen,
  storage: HardDrive,
};

export default function StatCard({
  title,
  value,
  type,
  change,
}) {
  const Icon = icons[type];

  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div className="stat-icon">
          <Icon size={22} />
        </div>

        <span className="stat-change">
          {change}
        </span>

      </div>

      <h3>{value}</h3>

      <p>{title}</p>

    </div>
  );
}