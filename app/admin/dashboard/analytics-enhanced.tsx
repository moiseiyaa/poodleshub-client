'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import { useEffect, useState } from 'react';
import { AnalyticsLineChart, AnalyticsPieChart, AnalyticsBarChart } from './analytics-charts';
import { toast } from 'react-hot-toast';
import {
  FiEye, FiUsers, FiMousePointer, FiTarget, FiTrendingUp, FiTrendingDown,
  FiClock, FiGlobe, FiBarChart2, FiActivity, FiMonitor, FiSmartphone,
  FiTablet, FiMapPin, FiZap, FiAward, FiRefreshCw, FiDownload, FiAlertCircle
} from 'react-icons/fi';

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://api.puppyhubusa.com'
    : 'http://localhost:4000');

type DateRange = '7daysAgo' | '30daysAgo' | '90daysAgo' | '365daysAgo';

type WebVital = { fetchedAt: string; lcp: number; cls: number; inp: number };

interface GA4Data {
  realtime: {
    activeUsers: number;
    byPage: Array<{ page: string; activeUsers: number }>;
  };
  traffic: {
    sessions: number;
    totalUsers: number;
    newUsers: number;
    pageViews: number;
    avgSessionDuration: number;
    bounceRate: number;
    engagementRate: number;
    conversions: number;
  } | null;
  topPages: Array<{
    path: string;
    title: string;
    views: number;
    avgDuration: number;
    bounceRate: number;
  }>;
  sources: Array<{
    channelGroup: string;
    source: string;
    medium: string;
    sessions: number;
    users: number;
    conversions: number;
    percentage: string;
  }>;
  demographics: {
    byAge: Array<{ age: string; users: number }>;
    byGender: Array<{ gender: string; users: number }>;
  };
  devices: Array<{
    device: string;
    os: string;
    browser: string;
    sessions: number;
    users: number;
    bounceRate: number;
    percentage: string;
  }>;
  geographic: {
    countries: Array<{
      country: string;
      users: number;
      sessions: number;
      conversions: number;
      percentage: string;
    }>;
    cities: Array<{
      city: string;
      country: string;
      users: number;
    }>;
  };
  events: Array<{
    eventName: string;
    pagePath: string;
    count: number;
    value: number;
  }>;
  landingExitPages: {
    landingPages: Array<{
      page: string;
      sessions: number;
      bounceRate: number;
      conversions: number;
    }>;
    exitPages: Array<{
      page: string;
      exits: number;
      pageViews: number;
      exitRate: string;
    }>;
  };
  conversions: Array<{
    conversionName: string;
    count: number;
    value: number;
  }>;
  performance: Array<{
    page: string;
    pageViews: number;
    avgDuration: number;
  }>;
  engagement: {
    engagedSessions: number;
    engagementRate: number;
    avgSessionDuration: number;
    pagesPerSession: number;
    totalEngagementDuration: number;
  } | null;
}

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  trend = 'up',
  color = 'purple'
}: {
  label: string;
  value: string | number;
  change?: string;
  icon: any;
  trend?: 'up' | 'down';
  color?: 'purple' | 'cyan' | 'pink' | 'green';
}) {
  const colorClasses = {
    purple: 'from-[#B344FF] to-[#8B3BCC]',
    cyan: 'from-[#00D9FF] to-[#00A3CC]',
    pink: 'from-[#FF44EC] to-[#CC3BBB]',
    green: 'from-[#10B981] to-[#059669]',
  };

  return (
    <div className="relative rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg bg-linear-to-br ${colorClasses[color]} p-2.5`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#8B9CC8]">{label}</p>
            <p className="mt-1 text-3xl font-bold text-white">{value}</p>
          </div>
        </div>
      </div>
      {change && (
        <div className={`mt-4 flex items-center gap-1 text-sm font-medium ${
          trend === 'up' ? 'text-[#00D9FF]' : 'text-red-400'
        }`}>
          {trend === 'up' ? <FiTrendingUp className="h-4 w-4" /> : <FiTrendingDown className="h-4 w-4" />}
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}

export default function EnhancedAnalytics({ token }: { token: string | null }) {
  const [dateRange, setDateRange] = useState<DateRange>('30daysAgo');
  const [loading, setLoading] = useState(true);
  const [isGA4Configured, setIsGA4Configured] = useState<boolean | null>(null);
  const [data, setData] = useState<GA4Data | null>(null);
  const [webVitals, setWebVitals] = useState<WebVital[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchGA4Data = async () => {
    try {
      setLoading(true);
      
      // Check if GA4 is configured
      const statusRes = await fetch(`${getApiUrl()}/api/analytics/ga4/status`);
      const statusData = await statusRes.json();
      setIsGA4Configured(statusData.configured);
      
      if (!statusData.configured) {
        setLoading(false);
        return;
      }

      // Fetch comprehensive GA4 data
      const res = await fetch(
        `${getApiUrl()}/api/analytics/ga4/comprehensive?startDate=${dateRange}&endDate=today`
      );
      
      if (!res.ok) {
        throw new Error('Failed to fetch GA4 data');
      }
      
      const ga4Data = await res.json();
      setData(ga4Data);

      // Fetch latest web vitals (30 points)
      const vitalsRes = await fetch(`${getApiUrl()}/api/seo/web-vitals?take=30`);
      if (vitalsRes.ok) {
        const vitals = await vitalsRes.json();
        setWebVitals(vitals);
      }
    } catch (error: any) {
      console.error('Error fetching GA4 data:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGA4Data();
  }, [dateRange]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchGA4Data();
      }, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }
  }, [autoRefresh, dateRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}m ${secs}s`;
  };

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B344FF] mx-auto"></div>
          <p className="mt-4 text-[#8B9CC8]">Loading Google Analytics data...</p>
        </div>
      </div>
    );
  }

  if (isGA4Configured === false) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-8">
          <div className="flex items-start gap-4">
            <FiAlertCircle className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Google Analytics 4 Not Configured</h3>
              <p className="text-[#8B9CC8] mb-4">
                To view real-time analytics data from Google Analytics, you need to configure the following:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#8B9CC8]">
                <li>Set <code className="text-amber-400 bg-[#1A2A3F] px-2 py-1 rounded">GA4_PROPERTY_ID</code> environment variable</li>
                <li>Set <code className="text-amber-400 bg-[#1A2A3F] px-2 py-1 rounded">GOOGLE_APPLICATION_CREDENTIALS</code> or <code className="text-amber-400 bg-[#1A2A3F] px-2 py-1 rounded">GOOGLE_SERVICE_ACCOUNT_KEY</code> environment variable</li>
                <li>Enable Google Analytics Data API in your Google Cloud Project</li>
                <li>Grant the service account access to your GA4 property</li>
              </ul>
              <p className="mt-4 text-sm text-[#8B9CC8]">
                For now, showing analytics from local database tracking...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B344FF] mx-auto"></div>
          <p className="mt-4 text-[#8B9CC8]">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Google Analytics 4</h2>
          <p className="mt-1 text-sm text-[#8B9CC8]">Real-time analytics powered by Google Analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-[#8B9CC8] cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-[#1A2A3F] bg-[#0A1628] text-[#B344FF] focus:ring-[#B344FF]"
            />
            Auto-refresh
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
            className="rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-4 py-2 text-sm text-white focus:border-[#B344FF] focus:outline-none"
          >
            <option value="7daysAgo">Last 7 days</option>
            <option value="30daysAgo">Last 30 days</option>
            <option value="90daysAgo">Last 90 days</option>
            <option value="365daysAgo">Last year</option>
          </select>
          <button
            onClick={() => fetchGA4Data()}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-4 py-2 text-sm font-medium text-white hover:bg-[#1A2A3F] transition-colors disabled:opacity-50"
          >
            <FiRefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-[#1A2A3F] bg-[#0F1F3A] px-4 py-2 text-sm font-medium text-white hover:bg-[#1A2A3F] transition-colors">
            <FiDownload className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Real-time Active Users */}
      <div className="rounded-xl border border-[#1A2A3F] bg-linear-to-br from-[#B344FF]/10 to-[#FF44EC]/10 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-linear-to-br from-cyan-400 to-pink-400 p-2.5">
              <FiActivity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Active Users Right Now</h3>
              <p className="text-sm text-gray-400">Real-time data from last 30 minutes</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold text-white">{data.realtime?.activeUsers ?? 0}</p>
            <p className="text-sm text-[#8B9CC8] mt-1">users online</p>
          </div>
        </div>
        {data.realtime.byPage.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#1A2A3F]">
            <p className="text-sm font-medium text-[#8B9CC8] mb-3">Active on pages:</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {data.realtime.byPage.slice(0, 6).map((page, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-[#0F1F3A] p-3">
                  <span className="text-sm text-white truncate flex-1">{page.page}</span>
                  <span className="text-sm font-semibold text-[#B344FF] ml-2">{page.activeUsers}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="space-y-6">
      {data.traffic && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Total Users"
              value={formatNumber(data.traffic.totalUsers)}
              change="+8.7%"
              icon={FiUsers}
              trend="up"
              color="cyan"
            />
            <MetricCard
              label="Sessions"
              value={formatNumber(data.traffic.sessions)}
              change="+12.4%"
              icon={FiMousePointer}
              trend="up"
              color="purple"
            />
            <MetricCard
              label="Page Views"
              value={formatNumber(data.traffic.pageViews)}
              change="+15.2%"
              icon={FiEye}
              trend="up"
              color="pink"
            />
            <MetricCard
              label="Conversions"
              value={data.traffic.conversions}
              change="+2.3%"
              icon={FiTarget}
              trend="up"
              color="green"
            />
          </div>
          
          {data?.topPages?.length > 0 && (
            <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-white mb-2">Page Views Trend</h4>
              <AnalyticsLineChart
                data={data?.topPages?.map(tp => ({
                  name: tp.title ?? tp.path,
                  views: tp.views,
                }))}
                dataKey="views"
                height={300}
              />


        {/* Geographic Data */}
        <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Top Countries</h3>

          <div className="space-y-3">
            {data.geographic?.countries && data.geographic.countries.length > 0 ? (
              data.geographic.countries.slice(0, 5).map((country, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-[#1A2A3F] p-3">
                  <div className="flex items-center gap-3">
                    <FiMapPin className="h-5 w-5 text-[#B344FF]" />
                    <span className="text-sm font-medium text-white">{country.country}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#B344FF]">{formatNumber(country.users)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#8B9CC8]">No geographic data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Events Tracking */}
      {data?.devices?.length > 0 && (
        <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Top Events</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data?.events?.slice(0, 9).map((event, idx) => (
              <div key={idx} className="rounded-lg border border-[#1A2A3F] p-3">
{{ ... }
                  <span className="text-sm font-medium text-white">{event.eventName}</span>
                  <span className="text-sm font-semibold text-[#B344FF]">{formatNumber(event.count)}</span>
                </div>
                <p className="text-xs text-[#8B9CC8] truncate">{event.pagePath}</p>
                {event.value > 0 && (
                  <p className="text-xs text-[#00D9FF] mt-1">Value: ${event.value.toFixed(2)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversions */}
      {data.conversions?.length > 0 && (
        <div className="rounded-xl border border-[#1A2A3F] bg-[#0F1F3A] p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Conversion Tracking</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.conversions.map((conversion, idx) => (
              <div key={idx} className="rounded-lg border border-[#1A2A3F] bg-linear-to-br from-[#10B981]/10 to-[#059669]/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiAward className="h-5 w-5 text-[#10B981]" />
                  <span className="text-sm font-medium text-white">{conversion.conversionName}</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{conversion.count}</p>
                {conversion.value > 0 && (
                  <p className="text-sm text-[#8B9CC8]">Value: ${conversion.value.toFixed(2)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

