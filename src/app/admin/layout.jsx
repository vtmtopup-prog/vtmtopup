export const metadata = {
  title: "VTM TOPUP • Admin Panel",
  description: "Admin dashboard for VTM TOPUP game top-up management.",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0c1222] text-white font-sans !pb-0">
      {children}
    </div>
  );
}
