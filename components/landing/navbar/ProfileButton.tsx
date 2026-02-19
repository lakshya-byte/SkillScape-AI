"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { getMyself } from "@/lib/authApi";

type UserData = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
};

export default function ProfileButton() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    getMyself()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return null;

  const hasAvatar = !!user.avatar;

  return (
    <motion.button
      onClick={() => router.push(`/profile/${user._id}`)}
      className="relative w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(147,51,234,0.25)] group"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Go to profile"
    >
      {/* Glow ring on hover */}
      <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-300" />

      {hasAvatar ? (
        <Image
          src={user.avatar!}
          alt={user.name}
          width={40}
          height={40}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-indigo-600/30 text-purple-300">
          <User className="w-5 h-5" />
        </div>
      )}
    </motion.button>
  );
}
