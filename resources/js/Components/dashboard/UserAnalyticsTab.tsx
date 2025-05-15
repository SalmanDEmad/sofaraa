import { Bar, Line } from 'react-chartjs-2';
import Card from './Card';

const UserAnalyticsTab = () => {
    const userAnalyticsBarData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Total Users',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: '#ffc926',
            },
        ],
    };

    const userAnalyticsLineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Unique Users',
                data: [45, 50, 60, 70, 65, 75],
                fill: false,
                borderColor: '#ff7f50',
            },
        ],
    };

    return (
        <>
            <Card>
                <h3 className="text-lg font-semibold mb-4">Total Users</h3>
                <Bar data={userAnalyticsBarData} options={{ responsive: true }} />
            </Card>
            <Card>
                <h3 className="text-lg font-semibold mb-4">Unique Users</h3>
                <Line data={userAnalyticsLineData} options={{ responsive: true }} />
            </Card>
        </>
    );
};

export default UserAnalyticsTab;
