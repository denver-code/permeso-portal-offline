'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar} from "@/components/common/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function Page(): JSX.Element {
    const router = useRouter();
    const [membership, setMembership] = useState<MembershipResponse | null>(null);
    const [activities, setActivities] = useState<RecentActivityResponse | null>(null);
    const [isLoading, setLoading] = useState(true);


   useEffect(() => {
    Promise.all([
      fetch('/sample-data/membership.json').then(res => res.json()),
      fetch('/sample-data/dashboard-activity.json').then(res => res.json())
    ])
      .then(([membershipData, activitiesData]) => {
        setMembership(membershipData);
        setActivities(activitiesData.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      });
  }, []);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white" />
            </div>
        );
    }

    if (membership == null) {
        router.push("/subscribe");
    }

    function RecentActivity(){
        if (activities == null) return <p className="text-sm text-gray-500">No recent activity, but normally you would see a parsed councils data</p>;

        return <div className="space-y-8">
        <div className="flex  flex-col justify-between">
          {
            activities.activity.map((activity) => (
                <div key={activity.council} className="flex justify-between  bg-zinc-900 mb-4 py-4 rounded-lg">
                    <div className="ml-4 space-y-1">
                       <div className="flex flex-row space-x-3">
                        <p className="text-m md:text-lg font-medium leading-none flex space-x-2">
                                {activity.council.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </p>
                            <Badge className="hidden md:block my-auto">{activity.status.replace(/\b\w/g, l => l.toUpperCase())}</Badge>
                        </div>
                      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                        <p className="text-md text-muted-foreground">
                          {activity.date}
                          </p>
                          <p className="text-md text-muted-foreground">
                          {activity.total_applications} Applications
                          </p>
                        </div>
                    </div>
                    
                    <div className="ml-auto mr-4 font-medium my-auto">
                        <Button size="sm">
                            Download Report
                        </Button>
                    </div>
                    
                    
            </div>
            ))
          }
          

          
        </div>
      
      </div>;
    }

    return (
        <>
        <div className="flex-col md:flex">
          <Navbar/>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="reports" disabled>
                  Reports
                </TabsTrigger>
                <TabsTrigger value="notifications" disabled>
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Applications
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                         <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{activities?.total_applications ? activities?.total_applications : "N/A"}</div>
                      <p className="text-xs text-muted-foreground">
                        (no further data available)
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Councils
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{activities?.total_councils
                                    ?  activities?.total_councils
                                    : 'N/A'}</div>
                      <p className="text-xs text-muted-foreground">
                      { (activities?.total_councils != activities?.activity.length)
                                    ?  `(${activities?.activity.length} councils with activity)`
                                    : 'N/A'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avarage per council</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold"> {activities?.avarage_per_council
                                    ?  Math.round(activities?.avarage_per_council)
                                    : 'N/A'} Applications</div>
                    
                    </CardContent>
                  </Card>
                  
                </div>
                <div className="grid gap-4 grid-cols-1">
                  
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Here you can manually download each report, or just have a look at the recent activity.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentActivity />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
    );
}

export default Page;