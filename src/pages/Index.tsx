import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import ChartCard from '../components/Dashboard/ChartCard';
import ReasonsLostGrid from '../components/Dashboard/ReasonsLostGrid';

/**
 * DashboardOverviewPage serves as the main landing page for the Leads Dashboard.
 * It aggregates various an_alytical and informational components to provide a comprehensive
 * overview of sales and leads activities.
 *
 * The page is structured using MainAppLayout, which provides the sidebar and top header.
 * The main content area is a vertical stack of:
 *  - PageHeader: For tabs (Sales/Leads) and a date range picker.
 *  - StatsCardGrid: Displaying key statistics like funnel count and lead sources.
 *  - ChartCard: Showing leads tracking over time with interactive filters.
 *  - ReasonsLostGrid: Presenting data on why leads were lost and other miscellaneous stats.
 */
const DashboardOverviewPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard" activePath="/dashboard">
      <div className="flex flex-col gap-6">
        <PageHeader />
        <StatsCardGrid />
        <ChartCard />
        <ReasonsLostGrid />
      </div>
    </MainAppLayout>
  );
};

export default DashboardOverviewPage;
