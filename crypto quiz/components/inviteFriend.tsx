'use client';
import { Icon } from '@iconify/react';

export const InviteFriend = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white border-4 border-teal-500">

      {/* --- Heading Section --- */}
      <div className="flex items-center justify-center mb-4">
        <Icon icon="mdi:email-outline" className="text-teal-400 mr-2" />
        <p className="text-lg font-semibold">Invite a Friend</p>
      </div>

      {/* --- Form Section --- */}
      <div className="cta-container">
        <label className="block mb-2">
          Fill your friend's email address and we'll send them a personal
          invite{' '}
          <Icon icon="mdi:card-giftcard" className="inline text-yellow-400" />
        </label>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            className="bg-gray-200 text-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2" // Add margin-bottom
          />

          {/* --- Button Section --- */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-900 text-white text-sm rounded-md md:text-base font-bold py-2 px-4 border-2 border-black shadow-lg"
            >
              Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};