"use client";

// Local analytics dashboard (no GA4)
import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  EyeIcon,
  UsersIcon,
  ClockIcon,
  ActivityIcon,
} from "lucide-react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.puppyhubusa.com"
    : "http://localhost:4000");

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number; // percentage
  avgSessionDuration: number | null; // seconds
  topPages: Array<{ path: string; views: number; title: string }>;
  pageViewsByDay: Array<{ date: string; count: number }>;
  events: Array<{ id: string; eventType: string; pathname: string; timestamp: string; metadata: any }>;
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsLocalDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<number>(30);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [summaryRes, pagesRes, trendRes, eventsRes] = await Promise.all([
          fetch(`${API_BASE}/api/analytics/summary?days=${range}`),
          fetch(`${API_BASE}/api/analytics/popular-pages?limit=10&days=${range}`),
          fetch(`${API_BASE}/api/analytics/page-views-by-day?days=${range}`),
          fetch(`${API_BASE}/api/analytics/events?limit=50`),
        ]);
        if (!summaryRes.ok || !pagesRes.ok || !trendRes.ok || !eventsRes.ok) {
          throw new Error("Failed to fetch analytics");
        }
        const summary = await summaryRes.json();
        const pages = await pagesRes.json();
        const trend = await trendRes.json();
        const events = await eventsRes.json();
        setData({
          pageViews: summary.total || 0,
          uniqueVisitors: summary.uniqueVisitors || 0,
          bounceRate: summary.bounceRate || 0,
          avgSessionDuration: summary.avgSessionDuration,

          topPages: pages.map((p: any) => ({
            path: p.path,
            views: Number(p.views),
            title:
              p.path.split("/").pop()?.replace(/-/g, " ") || p.path,
          })),
          pageViewsByDay: trend,
          events,
        });
      } catch (err) {
        console.error(err);
        toast.error("Unable to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [range]);

  if (loading || !data) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <select
          value={range}
          onChange={(e) => setRange(parseInt(e.target.value))}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Page Views"
              value={data.pageViews.toLocaleString()}
              description={`${Math.round(data.pageViews / range)} per day`}
              icon={<EyeIcon className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Unique Visitors"
              value={data.uniqueVisitors.toLocaleString()}
              description={`${Math.round(data.uniqueVisitors / range)} per day`}
              icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Avg. Time on Page"
              value={data.avgSessionDuration ? `${Math.round(data.avgSessionDuration/60)}m` : '--'}
              description="avg per session"
              icon={<ClockIcon className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Bounce Rate"
              value={`${data.bounceRate.toFixed(1)}%`}
              description="single-page sessions"
              icon={<ActivityIcon className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Page Views</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <ReBarChart data={data.pageViewsByDay}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-md border bg-popover p-2 text-sm shadow">
                            <p>{payload[0].payload.date}</p>
                            <p className="font-semibold">{payload[0].value} views</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pages */}
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages (last {range} days)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.topPages.map((p) => (
                    <TableRow key={p.path}>
                      <TableCell className="font-medium max-w-xs truncate">
                        {p.title}
                        <div className="text-xs text-muted-foreground">{p.path}</div>
                      </TableCell>
                      <TableCell className="text-right">{p.views.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Latest tracked interactions</CardDescription>
            </CardHeader>
            <CardContent>
              {data.events.length === 0 ? (
                <p className="text-sm text-muted-foreground">No events yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Path</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.events.map((ev) => (
                      <TableRow key={ev.id}>
                        <TableCell className="font-medium">{ev.eventType}</TableCell>
                        <TableCell className="max-w-xs truncate text-muted-foreground">
                          {ev.pathname}
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {format(new Date(ev.timestamp), "MMM d, HH:mm")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-8 w-full mb-1" />
            <Skeleton className="h-4 w-full" />
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-[300px] w-full" />
      </Card>
    </div>
  );
}
