"use client";

import React, { useState } from 'react';
import AllUser from './allUser/page';

const Dashboard: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string>('home');

    const renderContent = () => {
        switch (activeComponent) {
            case 'allUsers':
                return <AllUser />;
            case 'home':
            default:
                return <div>Home Page Content</div>;
        }
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <label htmlFor="sidebar-toggle" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
                <div className="p-4 w-full">
                    {renderContent()}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="sidebar-toggle" className="drawer-overlay" aria-label="close sidebar"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <li><a href="../dashboard/allUser" onClick={() => setActiveComponent('allUsers')}>All Users</a></li>
                    <li><a href="/" onClick={() => setActiveComponent('home')}>Log out</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
