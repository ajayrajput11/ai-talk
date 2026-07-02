import MainLayout from "../layouts/MainLayout";
import { useAuthStore } from "../store/authStore";

import {
  User,
  Mail,
  Circle,
  Shield,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
          <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f7f7f7] px-4 sm:px-6 lg:px-8 py-6">

        {/* Hero */}
        <div className="bg-white rounded-[36px] border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">

            {/* Avatar */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-900 text-white flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* Info */}
            <div className="text-center lg:text-left">
              <p className="text-sm font-medium text-slate-500">
                Profile
              </p>

              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                {user.name}
              </h1>

              <p className="mt-3 text-slate-500 text-lg break-all">
                {user.email}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100">
                <Circle
                  size={10}
                  fill="currentColor"
                  className={user.isOnline ? "text-green-500" : "text-slate-400"}
                />

                <span className="text-sm text-slate-700">
                  {user.isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <User size={20} className="text-slate-700" />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Full Name
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {user.name}
            </h3>
          </div>

          <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm p-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Mail size={20} className="text-slate-700" />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Email Address
            </p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900 break-all">
              {user.email}
            </h3>
          </div>
        </div>

        {/* Account Details */}
        <div className="mt-6 bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Account Information
          </h2>

          <div className="mt-8 divide-y divide-slate-200">

            <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-slate-500">Name</p>
              <p className="font-medium text-slate-900">
                {user.name}
              </p>
            </div>

            <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-slate-500">Email</p>
              <p className="font-medium text-slate-900 break-all">
                {user.email}
              </p>
            </div>

            <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-slate-500">Status</p>
              <p className={user.isOnline ? "text-green-500 font-medium" : "text-slate-500 font-medium"}>
                {user.isOnline ? "Online" : "Offline"}
              </p>
            </div>

            <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-slate-500">Security</p>
              <div className="flex items-center gap-2 text-slate-900">
                <Shield size={18} />
                Protected
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;