import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuthStore } from "../store/authStore";

import {
  User,
  Shield,
  LogOut,
  Trash2,
  Save,
} from "lucide-react";

const Settings = () => {
  const {
    user,
    updateProfile,
    deleteAccount,
    logout,
    isLoading,
  } = useAuthStore();

  const [name, setName] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const handleSave = async () => {
    await updateProfile({ name });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="text-slate-500 mt-3 max-w-xl">
            Manage your account preferences and security settings.
          </p>
        </div>

        {/* Account Section */}
        <div className="mt-6 bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <User className="text-slate-700" size={20} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Account Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-500">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 bg-white border border-slate-200 rounded-2xl p-4 outline-none focus:border-slate-400"
              />
            </div>

            <div>
              <label className="text-sm text-slate-500">
                Email Address
              </label>

              <input
                value={user?.email || ""}
                disabled
                className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-500"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isLoading}
            className="mt-6 px-6 py-3 rounded-2xl bg-slate-900 text-white hover:bg-black transition flex items-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>

        {/* Security Section */}
        <div className="mt-6 bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Shield className="text-slate-700" size={20} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Security
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white transition flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-xl">
              <h2 className="text-2xl font-bold text-slate-900">
                Logout
              </h2>

              <p className="text-slate-500 mt-3">
                Are you sure you want to logout?
              </p>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 border border-slate-200 py-3 rounded-2xl"
                >
                  Cancel
                </button>

                <button
                  onClick={logout}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-2xl"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-xl">
              <h2 className="text-2xl font-bold text-red-500">
                Delete Account
              </h2>

              <p className="text-slate-500 mt-3">
                This action cannot be undone. All chats and data will be deleted permanently.
              </p>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 border border-slate-200 py-3 rounded-2xl"
                >
                  Cancel
                </button>

                <button
                  onClick={deleteAccount}
                  className="flex-1 bg-red-500 text-white py-3 rounded-2xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Settings;