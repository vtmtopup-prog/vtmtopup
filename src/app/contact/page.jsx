"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  Phone,
  Mail,
  Send,
  Blocks,
  HomeIcon,
  PlayCircle,
  Compass,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
const MessengerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
    <path d="M16.5 10.5c-2.2.8-4.3-1.3-3.5-3.5s3.5-3.5 3.5-3.5-2.7 5.7-3.5 3.5z"></path>
  </svg>
);
export default function ContactPage() {
  const contactOptions = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      text: "আমাদের সাথে সরাসরি কথা বলতে এখানে ক্লিক করুন।",
      href: "tel:+8801940863413",
    },
    {
      icon: <MessengerIcon />,
      text: "মেসেঞ্জারে লাইভ চ্যাটের জন্য এখানে ক্লিক করুন।",
      href: "https://m.me/your-messenger-id",
    },
    {
      icon: <WhatsAppIcon />,
      text: "হোয়াটসঅ্যাপে লাইভ চ্যাটের জন্য এখানে ক্লিক করুন।",
      href: "https://wa.me/01940863413",
    },
    {
      icon: <Send className="w-6 h-6 text-primary" />,
      text: "টেলিগ্রাম সাপোর্টে কথা বলার জন্য এখানে ক্লিক করুন।",
      href: "https://t.me/your-telegram-id",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      text: "আমাদের সাপোর্টে ইমেইল করতে এখানে ক্লিক করুন।",
      href: "mailto:sayedhasandipto@gmail.com",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-background/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Contact Us</h1>
            <div className="w-6"></div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center font-bangla">
              যোগাযোগ করুন
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactOptions.map((option, index) => (
              <a
                key={index}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                {option.icon}
                <span className="font-bangla text-sm">{option.text}</span>
              </a>
            ))}
          </CardContent>
        </Card>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center h-16">
            <Link
              href="/"
              className="flex flex-col items-center text-muted-foreground hover:text-primary"
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </Link>
            <a
              href="https://youtu.be/OSE4qFSRqgs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-muted-foreground hover:text-primary"
            >
              <PlayCircle className="w-6 h-6" />
              <span className="text-xs">Tutorial</span>
            </a>
            <Link
              href="/topup"
              className="flex flex-col items-center text-muted-foreground hover:text-primary"
            >
              <Compass className="w-6 h-6" />
              <span className="text-xs">TopUp</span>
            </Link>
            <Link
              href="/orders"
              className="flex flex-col items-center text-muted-foreground hover:text-primary"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="text-xs">My Orders</span>
            </Link>
            <Link
              href="/contact"
              className="flex flex-col items-center text-primary"
            >
              <Blocks className="w-6 h-6" />
              <span className="text-xs">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
