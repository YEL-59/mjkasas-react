import React from 'react';
import WelcomeSection from './components/WelcomeSection';
import SummaryCards from './components/SummaryCards';
import WorkOrderActivity from './components/WorkOrderActivity';
import QuickActions from './components/QuickActions';
import UpcomingDeadlines from './components/UpcomingDeadlines';

const ManagerHome = () => {
    return (
        <div className="space-y-6 pb-8">
            <WelcomeSection />
            <SummaryCards />
            <WorkOrderActivity />

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickActions />
                <UpcomingDeadlines />
            </div>



        </div>
    );
};

export default ManagerHome;