export const metadata = {
  title: "FF Nexus • Admin Control Center",
  description: "Admin dashboard for FF Nexus game top-up management.",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0b12] text-[#f3f4ff] font-sans !pb-0">
      {children}
    </div>
  );
}
