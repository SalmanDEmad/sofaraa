import { Bar, Line } from 'react-chartjs-2';
import Card from './Card';

const Overview = () => {
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
                <Card className="col-span-1 lg:col-span-2 flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">Monthly Sales</h3>
                    <div className="flex-grow">
                        <Bar data={barChartData} options={{ responsive: true }} />
                    </div>
                </Card>

                {/* Line Chart */}
                <Card className="col-span-1 lg:col-span-2 flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">Website Traffic</h3>
                    <div className="flex-grow">
                        <Line data={lineChartData} options={{ responsive: true }} />
                    </div>
                </Card>

                {/* Top Tutors */}
                <Card className="col-span-1">
                    <h3 className="text-xl font-semibold mb-4">Top Tutors</h3>
                    <ul className="space-y-2">
                        <li className="bg-gray-100 p-4 rounded shadow-md">Dr. Alice - 20 sessions</li>
                        <li className="bg-gray-100 p-4 rounded shadow-md">Prof. Bob - 15 sessions</li>
                        <li className="bg-gray-100 p-4 rounded shadow-md">Ms. Clara - 10 sessions</li>
                    </ul>
                </Card>

                {/* Upcoming Events */}
                <Card className="col-span-1">
                    <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
                    <ul className="space-y-2">
                        <li className="bg-gray-100 p-4 rounded shadow-md">Math Workshop - Aug 15</li>
                        <li className="bg-gray-100 p-4 rounded shadow-md">Science Q&A - Aug 20</li>
                        <li className="bg-gray-100 p-4 rounded shadow-md">History Debate - Aug 25</li>
                    </ul>
                </Card>

                {/* Recent Feedback */}
                <Card className="col-span-1">
                    <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
                    <div className="space-y-2">
                        <p className="bg-gray-100 p-4 rounded shadow-md"><strong>John Doe:</strong> “Great session, very helpful!”</p>
                        <p className="bg-gray-100 p-4 rounded shadow-md"><strong>Jane Smith:</strong> “Could use more interactive elements.”</p>
                        <p className="bg-gray-100 p-4 rounded shadow-md"><strong>Emily Johnson:</strong> “Excellent explanation and support!”</p>
                    </div>
                </Card>

                {/* System Status */}
                <Card className="col-span-1">
                    <h3 className="text-xl font-semibold mb-4">System Status</h3>
                    <div className="space-y-2">
                        <p className="bg-gray-100 p-4 rounded shadow-md"><strong>Server:</strong> All systems operational</p>
                        <p className="bg-gray-100 p-4 rounded shadow-md"><strong>Database:</strong> No issues detected</p>
                        <p className="bg-gray-100 p-4 rounded shadow-md"><strong>API:</strong> Responding normally</p>
                    </div>
                </Card>

                {/* Recent Achievements */}
                <Card className="col-span-1 lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
                    <ul className="space-y-2">
                        <li className="bg-gray-100 p-4 rounded shadow-md">Reached 1,000 active users</li>
                        <li className="bg-gray-100 p-4 rounded shadow-md">Launched new feature: Live Chat</li>
                        <li className="bg-gray-100 p-4 rounded shadow-md">Received 100+ 5-star reviews</li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default Overview;