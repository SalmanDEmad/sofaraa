import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Card from './Card';
import ReactPlayer from 'react-player';
import Calendar from 'react-calendar';
import { FaChartBar, FaChartLine, FaTv, FaCoins, FaUser, FaCalendarAlt, FaVenus, FaComments, FaServer, FaTrophy } from 'react-icons/fa';

type Status = {
    server: string;
    database: string;
    api: string;
};

const status: Status = {
    server: 'down', // or 'down'
    database: 'operational', // or 'down'
    api: 'normal' // or 'down'
};

const Overview: React.FC = () => {
    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Monthly Sales',
                data: [12, 19, 3, 5, 2, 3, 7],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Website Traffic',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Bar Chart */}
                <Card className="col-span-1 lg:col-span-2 flex flex-col bg-blue-700 text-gray-200">
                    <div className="flex items-center mb-4">
                        <FaChartBar className="text-2xl mr-2" />
                        <h3 className="text-xl font-bold">Monthly Sales</h3>
                    </div>
                    <div className="flex-grow">
                        <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { labels: { color: 'gray' } } } }} />
                    </div>
                </Card>

                {/* Line Chart */}
                <Card className="col-span-1 lg:col-span-2 flex flex-col bg-purple-700 text-gray-200">
                    <div className="flex items-center mb-4">
                        <FaChartLine className="text-2xl mr-2" />
                        <h3 className="text-xl font-bold">Website Traffic</h3>
                    </div>
                    <div className="flex-grow">
                        <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { labels: { color: 'gray' } } } }} />
                    </div>
                </Card>

                {/* Live Stream Feed */}
                <Card className="col-span-1 bg-green-700 text-gray-200">
                    <div className="flex items-center mb-4">
                        <FaTv className="text-2xl mr-2" />
                        <h3 className="text-xl font-bold">Live Stream Feed</h3>
                    </div>
                    <div className="space-y-4">
                        <ReactPlayer url='https://www.twitch.tv/some_channel' controls />
                    </div>
                </Card>

{/* Token Balance */}
<Card className="col-span-1 lg:col-span-2 bg-yellow-800 text-gray-100 rounded-xl shadow-lg">
    <div className="flex items-center justify-between p-4 bg-yellow-900 rounded-t-lg">
        <div className="flex items-center">
            <FaCoins className="text-3xl text-yellow-400 mr-3" />
            <h3 className="text-xl font-semibold">Token Balance</h3>
        </div>
        <span className="text-sm text-yellow-300">Updated August 2024</span>
    </div>
    <div className="p-6">
        <p className="mb-4"><strong>Current Balance:</strong> <span className="text-yellow-300">500 Tokens</span></p>
        <p className="font-semibold mb-2">Recent Transactions:</p>
        <ul className="list-disc ml-4 space-y-2 text-yellow-100">
            <li className="p-2 bg-yellow-600 rounded-lg shadow-sm">Purchased 100 Tokens - Aug 15</li>
            <li className="p-2 bg-yellow-600 rounded-lg shadow-sm">Purchased 50 Tokens - Aug 10</li>
        </ul>
    </div>
</Card>

{/* Featured Tutors */}
<Card className="col-span-1 lg:col-span-2 bg-red-800 text-gray-100 rounded-xl shadow-lg">
    <div className="flex items-center justify-between p-4 bg-red-900 rounded-t-lg">
        <div className="flex items-center">
            <FaUser className="text-3xl text-red-400 mr-3" />
            <h3 className="text-xl font-semibold">Featured Tutors</h3>
        </div>
        <span className="text-sm text-red-300">August 2024</span>
    </div>
    <div className="p-6">
        <ul className="space-y-3">
            <li className="p-4 bg-red-700 rounded-lg shadow-sm hover:bg-red-600 transition">
                <strong>Dr. Alice</strong> - 20 sessions
            </li>
            <li className="p-4 bg-red-700 rounded-lg shadow-sm hover:bg-red-600 transition">
                <strong>Prof. Bob</strong> - 15 sessions
            </li>
            <li className="p-4 bg-red-700 rounded-lg shadow-sm hover:bg-red-600 transition">
                <strong>Ms. Clara</strong> - 10 sessions
            </li>
        </ul>
    </div>
</Card>

{/* Session Calendar */}
<Card className="col-span-1 lg:col-span-2 bg-teal-800 text-gray-100 rounded-xl shadow-lg">
    <div className="flex items-center justify-between p-4 bg-teal-900 rounded-t-lg">
        <div className="flex items-center">
            <FaCalendarAlt className="text-3xl text-teal-400 mr-3" />
            <h3 className="text-xl font-semibold">Session Calendar</h3>
        </div>
        <span className="text-sm text-teal-300">August 2024</span>
    </div>
    <div className="p-6">
        <Calendar className="text-gray-100 bg-teal-700 rounded-lg shadow-sm" />
    </div>
</Card>


                {/* Upcoming Events */}
                <Card className="col-span-1 bg-indigo-900 text-gray-100 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between p-4 bg-[#3b3f51] rounded-t-lg">
                        <div className="flex items-center">
                            <FaVenus className="text-3xl text-indigo-300 mr-3" />
                            <h3 className="text-xl font-semibold">Upcoming Events</h3>
                        </div>
                        <span className="text-sm text-indigo-400">August 2024</span>
                    </div>
                    <div className="p-6">
                        <ul className="space-y-3">
                            <li className="p-4 bg-indigo-700 rounded-lg shadow-md hover:bg-indigo-600 transition">
                                <strong>Math Workshop:</strong> Aug 15
                            </li>
                            <li className="p-4 bg-indigo-700 rounded-lg shadow-md hover:bg-indigo-600 transition">
                                <strong>Science Q&A:</strong> Aug 20
                            </li>
                            <li className="p-4 bg-indigo-700 rounded-lg shadow-md hover:bg-indigo-600 transition">
                                <strong>History Debate:</strong> Aug 25
                            </li>
                        </ul>
                    </div>
                </Card>


                {/* Recent Feedback */}
                <Card className="col-span-1 bg-gradient-to-br from-[#1c1e3e] via-[#3a405a] to-[#1c1e3e] text-gray-200 shadow-lg rounded-xl">
                <div className="flex items-center justify-between p-4 bg-[#3e497a] rounded-t-xl">
                <div className="flex items-center">
                            <FaComments className="text-2xl text-yellow-400 mr-3" />
                            <h3 className="text-xl font-extrabold tracking-wide">Feedback</h3>
                        </div>
                        <span className="text-sm text-gray-400 italic">Recent Reviews</span>
                    </div>
                    <div className="divide-y divide-gray-700">
                        <div className="p-4 hover:bg-gray-800 transition duration-300 ease-in-out">
                            <p><strong className="text-yellow-400">John Doe:</strong> <span className="text-sm text-gray-300">“Great session, very helpful!”</span></p>
                        </div>
                        <div className="p-4 hover:bg-gray-800 transition duration-300 ease-in-out">
                            <p><strong className="text-yellow-400">Jane Smith:</strong> <span className="text-sm text-gray-300">“Could use more interactive elements.”</span></p>
                        </div>
                        <div className="p-4 hover:bg-gray-800 transition duration-300 ease-in-out">
                            <p><strong className="text-yellow-400">Emily Johnson:</strong> <span className="text-sm text-gray-300">“Excellent explanation and support!”</span></p>
                        </div>
                    </div>
                </Card>


                {/* System Status */}
                <Card className="col-span-1 bg-orange-700 text-gray-200">
                    <div className="bg-orange-900 p-4 rounded-t-lg">
                        <div className="flex items-center">
                            <FaServer className="text-2xl mr-2" />
                            <h3 className="text-xl font-bold">System Status</h3>
                        </div>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-2">
                            <li className={`p-2 rounded ${status.server === 'operational' ? 'bg-green-600' : 'bg-red-600'}`}>
                                <strong>Server:</strong> {status.server === 'operational' ? 'All systems operational' : 'Issue detected'}
                            </li>
                            <li className={`p-2 rounded ${status.database === 'operational' ? 'bg-green-600' : 'bg-red-600'}`}>
                                <strong>Database:</strong> {status.database === 'operational' ? 'No issues detected' : 'Issue detected'}
                            </li>
                            <li className={`p-2 rounded ${status.api === 'normal' ? 'bg-green-600' : 'bg-red-600'}`}>
                                <strong>API:</strong> {status.api === 'normal' ? 'Responding normally' : 'Issue detected'}
                            </li>
                        </ul>
                    </div>
                </Card>



                {/* Recent Achievements */}
                <Card className="col-span-1 lg:col-span-2 bg-cyan-700 text-gray-200">
                    <div className="bg-cyan-900 p-4 rounded-t-lg">
                        <div className="flex items-center">
                            <FaTrophy className="text-2xl mr-2" />
                            <h3 className="text-xl font-bold">Recent Achievements</h3>
                        </div>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-2">
                            <li className="p-2 rounded">Awarded Best Tutor - Aug 2024</li>
                            <li className="p-2 rounded">Top 5% Performer - July 2024</li>
                            <li className="p-2 rounded">1000 Sessions Completed - June 2024</li>
                        </ul>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default Overview;