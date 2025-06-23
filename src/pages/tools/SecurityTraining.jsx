import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { motion } from "framer-motion"
import { 
  GraduationCap, 
  Play, 
  CheckCircle, 
  Clock, 
  Award,
  BookOpen,
  Users,
  Target
} from "lucide-react"

export default function SecurityTraining() {
  const [courses] = useState([
    {
      id: 1,
      title: "Phishing Awareness Training",
      description: "Learn to identify and avoid phishing attacks",
      duration: "30 min",
      difficulty: "Beginner",
      progress: 100,
      status: "completed",
      certificate: true
    },
    {
      id: 2,
      title: "Password Security Best Practices",
      description: "Create and manage strong passwords effectively",
      duration: "25 min",
      difficulty: "Beginner",
      progress: 60,
      status: "in-progress",
      certificate: false
    },
    {
      id: 3,
      title: "Social Engineering Defense",
      description: "Protect against social engineering attacks",
      duration: "45 min",
      difficulty: "Intermediate",
      progress: 0,
      status: "not-started",
      certificate: true
    },
    {
      id: 4,
      title: "Incident Response Procedures",
      description: "Learn how to respond to security incidents",
      duration: "60 min",
      difficulty: "Advanced",
      progress: 0,
      status: "not-started",
      certificate: true
    }
  ])

  const [teamStats] = useState({
    totalEmployees: 25,
    completedTraining: 18,
    inProgress: 5,
    notStarted: 2,
    averageScore: 87
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "not-started": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />
      case "in-progress": return <Clock className="h-4 w-4" />
      case "not-started": return <BookOpen className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Security Training</h2>
        <p className="text-muted-foreground">Enhance your team's security awareness with interactive training</p>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="team">Team Progress</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </div>
                      {course.certificate && course.status === "completed" && (
                        <Award className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </span>
                          <Badge className={getDifficultyColor(course.difficulty)}>
                            {course.difficulty}
                          </Badge>
                        </div>
                        <Badge className={getStatusColor(course.status)}>
                          {getStatusIcon(course.status)}
                          {course.status.replace("-", " ")}
                        </Badge>
                      </div>

                      {course.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}

                      <Button 
                        className="w-full" 
                        variant={course.status === "completed" ? "outline" : "default"}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {course.status === "completed" ? "Review Course" : 
                         course.status === "in-progress" ? "Continue" : "Start Course"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                    <p className="text-2xl font-bold">{teamStats.totalEmployees}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{teamStats.completedTraining}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{teamStats.inProgress}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold text-purple-600">{teamStats.averageScore}%</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Training Progress</CardTitle>
              <CardDescription>Overview of team training completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Overall Completion</span>
                  <span>{Math.round((teamStats.completedTraining / teamStats.totalEmployees) * 100)}%</span>
                </div>
                <Progress 
                  value={(teamStats.completedTraining / teamStats.totalEmployees) * 100} 
                  className="h-3" 
                />
                
                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{teamStats.completedTraining}</div>
                    <div className="text-sm text-muted-foreground">Completed Training</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{teamStats.inProgress}</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{teamStats.notStarted}</div>
                    <div className="text-sm text-muted-foreground">Not Started</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Certificates</CardTitle>
              <CardDescription>View and download your training certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses
                  .filter(course => course.status === "completed" && course.certificate)
                  .map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Award className="h-8 w-8 text-yellow-500" />
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">Completed on January 15, 2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download Certificate
                      </Button>
                    </div>
                  ))}
                
                {courses.filter(course => course.status === "completed" && course.certificate).length === 0 && (
                  <div className="text-center py-8">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No certificates yet</h3>
                    <p className="text-muted-foreground">Complete training courses to earn certificates</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}