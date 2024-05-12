'use client';

export const InviteFriend = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white border border-teal-500">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">Invite a Friend</p>
      </div>
      <div className="cta-container">
        <label className="block mb-2">
          Fill your friend's email address and we'll send them a personal
          invite 💌
        </label>
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email" 
            name="email" 
            placeholder="Email address"
            className="bg-gray-200 text-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-2">
            Invite
          </button>
        </form>
      </div>
    </div>
  );
};