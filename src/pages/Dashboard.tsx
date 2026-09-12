import { useEffect, useState } from 'react';
import { Activity, BookOpen, GraduationCap, Layers, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BACKEND_BASE_URL } from '@/constants';

type DashboardData = {
  metrics: Record<'users' | 'departments' | 'subjects' | 'classes' | 'enrollments', number>;
  userDistribution: { role: string; count: number }[];
  classesByDepartment: { department: string; count: number }[];
  capacityStatus: { status: string; count: number }[];
  enrollmentTrends: { month: string; count: number }[];
  activity: { label: string; createdAt: string }[];
};

const colors = ['#0f766e', '#f59e0b', '#2563eb', '#dc2626'];

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/dashboard`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { data: DashboardData }) => setData(payload.data))
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="state-message">Unable to load dashboard metrics.</p>;
  if (!data) return <p className="state-message">Loading dashboard...</p>;

  const metricCards = [
    { key: 'users', label: 'Users', icon: Users },
    { key: 'departments', label: 'Departments', icon: Layers },
    { key: 'subjects', label: 'Subjects', icon: BookOpen },
    { key: 'classes', label: 'Classes', icon: GraduationCap },
    { key: 'enrollments', label: 'Enrollments', icon: Activity },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Classroom overview</p>
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metricCards.map(({ key, label, icon: Icon }) => (
          <Card key={key}>
            <CardContent className="flex items-center justify-between p-5">
              <div><p className="text-sm text-muted-foreground">{label}</p><p className="text-3xl font-semibold">{data.metrics[key]}</p></div>
              <Icon className="h-5 w-5 text-primary" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Enrollment trends</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={260}><LineChart data={[...data.enrollmentTrends].reverse()}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis allowDecimals={false} /><Tooltip /><Line type="monotone" dataKey="count" stroke="#0f766e" strokeWidth={3} /></LineChart></ResponsiveContainer></CardContent></Card>
        <Card><CardHeader><CardTitle>Classes by department</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={260}><BarChart data={data.classesByDepartment}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="department" tick={{ fontSize: 11 }} /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
        <Card><CardHeader><CardTitle>User distribution</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={data.userDistribution} dataKey="count" nameKey="role" innerRadius={62} outerRadius={92} label>{data.userDistribution.map((entry, index) => <Cell key={entry.role} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent></Card>
        <Card><CardHeader><CardTitle>Class capacity status</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={260}><BarChart data={data.capacityStatus}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="status" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
      </div>

      <Card><CardHeader><CardTitle>Recent activity</CardTitle></CardHeader><CardContent className="space-y-3">{data.activity.length ? data.activity.map((item, index) => <div key={`${item.createdAt}-${index}`} className="flex items-center justify-between border-b pb-3 text-sm last:border-0"><span>{item.label}</span><span className="text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span></div>) : <p className="text-sm text-muted-foreground">No recent activity.</p>}</CardContent></Card>
    </div>
  );
}

export default Dashboard
