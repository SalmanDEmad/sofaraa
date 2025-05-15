import React, { useState, ReactNode } from 'react';

interface TabProps {
    children: ReactNode[]; // Ensure that children is an array of ReactNode
    tabs: string[];
}

const Tab: React.FC<TabProps> = ({ children, tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex -mb-px">
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={`mr-2 ${activeTab === index ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 dark:text-gray-400'} cursor-pointer px-4 py-2`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                {children && children[activeTab]} {/* Ensure children exists and is an array */}
            </div>
        </div>
    );
};

export default Tab;
