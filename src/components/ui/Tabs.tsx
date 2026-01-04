'use client';

import { useState, ReactNode } from 'react';

interface TabPanelProps {
  title: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactNode;
}

export function TabPanel({ children }: { children: ReactNode }) {
  return <div className="tab-panel-content">{children}</div>;
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Extract tab panels and their titles
  const tabPanels = Array.isArray(children) ? children : [children];
  const panels = tabPanels.filter(child => 
    child && 
    typeof child === 'object' && 
    'props' in child && 
    child.props && 
    'title' in child.props
  );

  if (panels.length === 0) {
    return <div>{children}</div>;
  }

  // Generate unique IDs for accessibility
  const tabListId = `tablist-${Math.random().toString(36).substr(2, 9)}`;
  const getTabId = (index: number) => `${tabListId}-tab-${index}`;
  const getTabPanelId = (index: number) => `${tabListId}-panel-${index}`;

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    switch (event.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % panels.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + panels.length) % panels.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = panels.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveTab(newIndex);
  };

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 mb-6">
        <div 
          className="flex space-x-1" 
          role="tablist"
          aria-label="Calculator guide sections"
        >
          {panels.map((panel: any, index: number) => {
            const title = panel.props.title || `Tab ${index + 1}`;
            return (
              <button
                key={index}
                id={getTabId(index)}
                onClick={() => setActiveTab(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`
                  px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${activeTab === index
                    ? 'bg-blue-50 text-blue-800 border-b-2 border-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }
                `}
                aria-selected={activeTab === index}
                aria-controls={getTabPanelId(index)}
                tabIndex={activeTab === index ? 0 : -1}
                role="tab"
                type="button"
                aria-label={`View ${title} section`}
              >
                {title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {panels.map((panel: any, index: number) => (
        <div
          key={index}
          id={getTabPanelId(index)}
          role="tabpanel"
          aria-labelledby={getTabId(index)}
          tabIndex={0}
          className={index === activeTab ? 'block' : 'hidden'}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}