import { createSignal, createEffect } from 'solid-js';
import { FiDownload, FiActivity, FiSettings, FiSearch, FiCalendar } from 'solid-icons/fi';
import AuditTrailTable from '../components/Audit/AuditTrailTable';

const AuditDashboard = () => {
  const [auditLogs, setAuditLogs] = createSignal([
    { 
      id: 1, 
      username: 'john_doe',
      activity: 'Login',
      timestamp: '2025-01-16 09:30:00',
      details: 'User login successful'
    },
    {
      id: 2,
      username: 'jane_smith',
      activity: 'SMS Management',
      timestamp: '2025-01-16 10:15:00',
      details: 'Updated SMS template'
    },
    // Add more sample data as needed
  ]);

  const [parameters, setParameters] = createSignal([
    {
      id: 1,
      name: 'SMS Template',
      value: 'Default template',
      lastUpdated: '2025-01-15'
    },
    {
      id: 2,
      name: 'Telco Prefix',
      value: '+62',
      lastUpdated: '2025-01-14'
    }
  ]);

  const [activeTab, setActiveTab] = createSignal('audit');
  const [searchQuery, setSearchQuery] = createSignal('');
  const [dateFilter, setDateFilter] = createSignal('');

  const handleDownload = (format: string) => {
    // Implement download logic here
    console.log(`Downloading in ${format} format`);
  };

  return (
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-screen mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Dashboard Audit</h1>
          <p class="text-gray-600 mt-2">Pantau dan rekam semua aktivitas sistem</p>
        </div>

        {/* Main Content */}
        <div class="bg-white rounded-2xl shadow-lg p-6">
          {/* Tabs */}
          <div class="flex space-x-4 mb-6 border-b">
            <button
              class={`pb-2 px-4 ${activeTab() === 'audit' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('audit')}
            >
              <div class="flex items-center space-x-2">
                <FiActivity />
                <span>Audit Trail</span>
              </div>
            </button>
            <button
              class={`pb-2 px-4 ${activeTab() === 'parameters' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('parameters')}
            >
              <div class="flex items-center space-x-2">
                <FiSettings />
                <span>Parameter</span>
              </div>
            </button>
          </div>

          {/* Filters and Actions */}
          <div class="flex justify-between mb-6">
            <div class="flex space-x-4 ">
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  class="pl-10 pr-4 py-2 border rounded-lg s"
                  value={searchQuery()}
                  onInput={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch class="absolute left-3 top-3 text-gray-400" />
              </div>
              <div class="relative">
                <input
                  type="date"
                  class="pl-10 pr-4 py-2 border rounded-lg"
                  value={dateFilter()}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <FiCalendar class="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                onClick={() => handleDownload('pdf')}
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              >
                <FiDownload />
                <span>Unduh PDF</span>
              </button>
              <button
                onClick={() => handleDownload('excel')}
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
              >
                <FiDownload />
                <span>Unduh Excel</span>
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab() === 'audit' ? (
            <div class="overflow-x-auto min-w-full">
              <AuditTrailTable />
            </div>
          ) : (
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="bg-gray-50">
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terakhir Diperbarui</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {parameters().map((param) => (
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">{param.name}</td>
                      <td class="px-6 py-4 whitespace-nowrap">{param.value}</td>
                      <td class="px-6 py-4 whitespace-nowrap">{param.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditDashboard;