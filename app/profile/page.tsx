"use client";

import { useState, useEffect } from "react";
import { getProfileFromToken, UserPayload } from "../utils/utilFunc";

// // Sample user data based on the provided type
// const sampleUser = {
//   user_id: 12345,
//   username: "johndoe",
//   email: "john.doe@example.com",
//   role: "USER",
//   iat: 1680789600, // April 6, 2023
//   exp: 1712325600, // April 6, 2024
// };

export default function UserProfile() {
  const [timeRemaining] = useState(""); //setTimeRemaining

  const [userProfile, setUserProfile] = useState<UserPayload | null>(null);
  useEffect(() => {
    const savedUserData = getProfileFromToken();
    setUserProfile(savedUserData);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-none border-l-4 border-red-900 shadow-lg overflow-hidden">
        {/* Header bar */}
        <div className="bg-red-900 p-3 flex justify-between items-center">
          <h1 className="text-lg font-bold text-white uppercase tracking-wide">
            My Account
          </h1>
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {userProfile && userProfile.role}
          </span>
        </div>

        {!userProfile ? (
          <div className="w-full h-full">
            <h1>Loading LOL....</h1>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-black rounded-none flex items-center justify-center text-xl text-red-600 font-bold border border-red-800">
                {userProfile.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">
                  {userProfile.username}
                </h2>
                <p className="text-red-400 text-sm">{userProfile.email}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-zinc-800 mb-4"></div>

            {/* User details */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-zinc-400 text-sm uppercase tracking-wider">
                  User ID
                </span>
                <span className="text-white font-mono">
                  {userProfile.user_id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400 text-sm uppercase tracking-wider">
                  Role
                </span>
                <span
                  className={`px-3 py-1 text-xs font-medium ${
                    userProfile.role === "ADMIN"
                      ? "bg-red-900 text-white"
                      : "bg-zinc-800 text-zinc-200"
                  }`}
                >
                  {userProfile.role}
                </span>
              </div>

              {/* Security details with industrial styling */}
              <div className="mt-6 bg-black p-4 border-l-2 border-red-800">
                <h3 className="text-red-500 text-sm font-bold uppercase tracking-wider mb-3">
                  Security
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-xs uppercase">
                      Issued
                    </span>
                    <span className="text-zinc-300 text-sm">
                      {formatDate(userProfile.iat)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-xs uppercase">
                      Expires
                    </span>
                    <div className="flex items-center">
                      <span className="text-zinc-300 text-sm mr-2">
                        {formatDate(userProfile.exp)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs ${
                          timeRemaining === "Expired"
                            ? "bg-red-900 text-white"
                            : "bg-zinc-800 text-red-300 border border-red-900"
                        }`}
                      >
                        {timeRemaining}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action button with Dickies-inspired styling */}
              <button className="w-full mt-4 bg-red-900 hover:bg-red-800 text-white py-2 font-bold uppercase tracking-wider text-sm transition-colors duration-200">
                Update Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
