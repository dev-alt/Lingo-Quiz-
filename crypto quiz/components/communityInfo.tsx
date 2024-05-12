export const CommunityBar = () => {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white border-4 border-teal-500">
           
                <h3 className="text-lg font-semibold mb-4">Make friends and learn together in the LingoQuiz Community</h3>
                <div className="opc-stats">
                    <ul>
                        <li className="flex items-center">
                            <img src="/images/UserDashboard/users.svg" alt="total members" className="mr-2" />
                            <p>398 Members</p>
                        </li>
                        <li className="flex items-center">
                            <img src="/images/UserDashboard/comment.svg" alt="new posts" className="mr-2" />
                            <p>76 New Posts</p>
                        </li>
                        <li className="flex items-center">
                            <img src="/images/UserDashboard/calendar.svg" alt="events" className="mr-2" />
                            <p>3 Upcoming Events</p>
                        </li>
                    </ul>
                </div>
                <button className="arrow">
                    <img src="/images/UserDashboard/arrow-right.svg" alt="arrow indicator" />
                </button>
            </div>
)}