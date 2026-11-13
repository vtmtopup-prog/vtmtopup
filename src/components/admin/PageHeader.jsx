// src/components/admin/PageHeader.jsx
// Shared admin page header with title + optional action slot

export default function PageHeader({ title, description, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground leading-none">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

