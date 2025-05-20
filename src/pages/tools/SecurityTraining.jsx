"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Badge from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  Play,
  FileText,
  BarChart,
  Users,
  Calendar,
  AlertTriangle,
  Shield,
  Lock,
  Eye,
  Mail,
  Smartphone,
  Wifi,
  HardDrive,
  Globe,
} from "lucide-react"

export default function SecurityTraining() {
  const [activeTab, setActiveTab] = useState("courses")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [userProgress, setUserProgress] = useState({
    completedCourses: 2,
    totalCourses: 8,
    completedModules: 7,
    totalModules: 24,
    securityScore: 68,
    lastActivity: "2 days ago",
    certifications: [
      { id: 1, name: "Security Awareness Fundamentals", issueDate: "2023-04-15", expires: "2024-04-15" },
    ],
  })

  const courses = [
    {
      id: 1,
      title: "Security Awareness Fundamentals",
      description: "Learn the basics of cybersecurity and how to protect yourself online",
      category: "Fundamentals",
      level: "Beginner",
      duration: "45 minutes",
      modules: 5,
      progress: 100,
      completed: true,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      title: "Password Security Best Practices",
      description: "Create and manage strong passwords to protect your accounts",
      category: "Authentication",
      level: "Beginner",
      duration: "30 minutes",
      modules: 3,
      progress: 100,
      completed: true,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      title: "Phishing Attack Prevention",
      description: "Identify and avoid phishing attempts and social engineering attacks",
      category: "Threats",
      level: "Intermediate",
      duration: "60 minutes",
      modules: 4,
      progress: 25,
      completed: false,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 4,
      title: "Data Protection and Privacy",
      description: "Understand data protection regulations and privacy best practices",
      category: "Compliance",
      level: "Intermediate",
      duration: "75 minutes",
      modules: 6,
      progress: 0,
      completed: false,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 5,
      title: "Mobile Device Security",
      description: "Secure your smartphones and tablets from cyber threats",
      category: "Devices",
      level: "Beginner",
      duration: "40 minutes",
      modules: 4,
      progress: 0,
      completed: false,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 6,
      title: "Secure Remote Working",
      description: "Stay secure while working from home or on public networks",
      category: "Workplace",
      level: "Intermediate",
      duration: "50 minutes",
      modules: 5,
      progress: 0,
      completed: false,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 7,
      title: "Social Media Security",
      description: "Protect your privacy and security on social media platforms",
      category: "Online Safety",
      level: "Beginner",
      duration: "35 minutes",
      modules: 3,
      progress: 0,
      completed: false,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 8,
      title: "Incident Response Basics",
      description: "Learn how to respond to security incidents and breaches",
      category: "Advanced",
      level: "Advanced",
      duration: "90 minutes",
      modules: 7,
      progress: 0,
      completed: false,
      image: "/placeholder.svg?height=100&width=200",
    },
  ]

  const courseModules = {
    3: [
      {
        id: 1,
        title: "Understanding Phishing Attacks",
        duration: "15 minutes",
        type: "Video",
        completed: true,
      },
      {
        id: 2,
        title: "Common Phishing Techniques",
        duration: "15 minutes",
        type: "Interactive",
        completed: false,
      },
      {
        id: 3,
        title: "Identifying Suspicious Emails",
        duration: "20 minutes",
        type: "Simulation",
        completed: false,
      },
      {
        id: 4,
        title: "Phishing Prevention Quiz",
        duration: "10 minutes",
        type: "Assessment",
        completed: false,
      },
    ],
  }

  const upcomingTrainings = [
    {
      id: 1,
      title: "Quarterly Security Update",
      date: "June 15, 2023",
      time: "10:00 AM - 11:00 AM",
      type: "Webinar",
    },
    {
      id: 2,
      title: "New Threat Landscape",
      date: "July 3, 2023",
      time: "2:00 PM - 3:30 PM",
      type: "Workshop",
    },
  ]

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    setActiveTab("course-details")
  }

  const handleStartCourse = () => {
    // In a real app, this would navigate to the course content
    console.log("Starting course:", selectedCourse.title)
  }

  const handleContinueCourse = () => {
    // In a real app, this would navigate to the last position in the course
    console.log("Continuing course:", selectedCourse.title)
  }

  const getLevelBadge = (level) => {
    switch (level) {
      case "Beginner":
        return <Badge className="bg-green-500">Beginner</Badge>
      case "Intermediate":
        return <Badge className="bg-blue-500">Intermediate</Badge>
      case "Advanced":
        return <Badge className="bg-purple-500">Advanced</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Fundamentals":
        return <BookOpen className="h-4 w-4" />
      case "Authentication":
        return <Lock className="h-4 w-4" />
      case "Threats":
        return <AlertTriangle className="h-4 w-4" />
      case "Compliance":
        return <FileText className="h-4 w-4" />
      case "Devices":
        return <Smartphone className="h-4 w-4" />
      case "Workplace":
        return <Users className="h-4 w-4" />
      case "Online Safety":
        return <Globe className="h-4 w-4" />
      case "Advanced":
        return <Shield className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Security Awareness Training</CardTitle>
          <CardDescription>Interactive courses to improve your cybersecurity knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="progress">
                <BarChart className="mr-2 h-4 w-4" />
                My Progress
              </TabsTrigger>
              <TabsTrigger value="schedule">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="border rounded-lg overflow-hidden hover:border-primary cursor-pointer transition-colors"
                    onClick={() => handleCourseSelect(course)}
                  >
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      {course.completed && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{course.title}</h3>
                        {getLevelBadge(course.level)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          {getCategoryIcon(course.category)}
                          <span className="ml-1">{course.category}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                        </div>
                      </div>
                      {course.progress > 0 && course.progress < 100 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="course-details" className="space-y-4 pt-4">
              {selectedCourse && (
                <div>
                  <Button variant="outline" size="sm" className="mb-4" onClick={() => setActiveTab("courses")}>
                    ← Back to Courses
                  </Button>

                  <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={selectedCourse.image || "/placeholder.svg"}
                      alt={selectedCourse.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
                      <p className="text-muted-foreground">{selectedCourse.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {selectedCourse.progress === 0 ? (
                        <Button onClick={handleStartCourse}>
                          <Play className="mr-2 h-4 w-4" />
                          Start Course
                        </Button>
                      ) : selectedCourse.progress === 100 ? (
                        <Button variant="outline">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Completed
                        </Button>
                      ) : (
                        <Button onClick={handleContinueCourse}>
                          <Play className="mr-2 h-4 w-4" />
                          Continue ({selectedCourse.progress}%)
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Level</div>
                      <div className="font-medium">{selectedCourse.level}</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Duration</div>
                      <div className="font-medium">{selectedCourse.duration}</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Modules</div>
                      <div className="font-medium">{selectedCourse.modules}</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Category</div>
                      <div className="font-medium">{selectedCourse.category}</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-3">Course Content</h3>
                  <div className="space-y-2">
                    {courseModules[selectedCourse.id] ? (
                      courseModules[selectedCourse.id].map((module, index) => (
                        <div key={module.id} className="border rounded-lg p-3 flex justify-between items-center">
                          <div className="flex items-start gap-3">
                            <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{module.title}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2">
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {module.duration}
                                </span>
                                <span>•</span>
                                <span>{module.type}</span>
                              </div>
                            </div>
                          </div>
                          {module.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Button size="sm" variant="ghost">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <p>Course content will be available when you start the course.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="progress" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold mb-1 text-primary">
                    {userProgress.completedCourses}/{userProgress.totalCourses}
                  </div>
                  <div className="text-sm text-muted-foreground">Courses Completed</div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold mb-1 text-primary">
                    {userProgress.completedModules}/{userProgress.totalModules}
                  </div>
                  <div className="text-sm text-muted-foreground">Modules Completed</div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold mb-1 text-primary">{userProgress.securityScore}</div>
                  <div className="text-sm text-muted-foreground">Security Score</div>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-3">My Certifications</h3>
              {userProgress.certifications.length > 0 ? (
                <div className="space-y-3">
                  {userProgress.certifications.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Award className="h-8 w-8 text-yellow-500" />
                        <div>
                          <div className="font-medium">{cert.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Issued: {cert.issueDate} • Expires: {cert.expires}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Certificate
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground border rounded-lg">
                  <Award className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Complete courses to earn certifications</p>
                </div>
              )}

              <h3 className="text-lg font-medium mb-3 mt-6">Recommended Next Steps</h3>
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Complete "Phishing Attack Prevention"</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    You've started this course but haven't completed it yet.
                  </div>
                  <Progress value={25} className="h-1 mb-2" />
                  <Button size="sm">Continue Course</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Take "Mobile Device Security" Course</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Based on your security score, this course is recommended for you.
                  </div>
                  <Button size="sm">Start Course</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium mb-3">Upcoming Training Sessions</h3>
              {upcomingTrainings.length > 0 ? (
                <div className="space-y-3">
                  {upcomingTrainings.map((training) => (
                    <div key={training.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{training.title}</h4>
                        <Badge variant="outline">{training.type}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3 flex items-center gap-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {training.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {training.time}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Register</Button>
                        <Button size="sm" variant="outline">
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground border rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No upcoming training sessions</p>
                </div>
              )}

              <h3 className="text-lg font-medium mb-3 mt-6">On-Demand Webinars</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <img
                      src="/placeholder.svg?height=100&width=200"
                      alt="Latest Phishing Techniques"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-3">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-1">Latest Phishing Techniques</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn about the most recent phishing tactics and how to defend against them.
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>45 minutes</span>
                      <span>Recorded: May 12, 2023</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <img
                      src="/placeholder.svg?height=100&width=200"
                      alt="Ransomware Prevention"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-3">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-1">Ransomware Prevention</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Strategies to protect your organization from ransomware attacks.
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>60 minutes</span>
                      <span>Recorded: April 28, 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
          <CardDescription>Additional materials to enhance your security knowledge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Security Topics</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                <Lock className="mr-2 h-4 w-4" />
                Passwords
              </Button>
              <Button variant="outline" className="justify-start">
                <Eye className="mr-2 h-4 w-4" />
                Phishing
              </Button>
              <Button variant="outline" className="justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Email Security
              </Button>
              <Button variant="outline" className="justify-start">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile Security
              </Button>
              <Button variant="outline" className="justify-start">
                <Wifi className="mr-2 h-4 w-4" />
                Wi-Fi Safety
              </Button>
              <Button variant="outline" className="justify-start">
                <HardDrive className="mr-2 h-4 w-4" />
                Data Protection
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Quick Guides</h3>
            <div className="space-y-2">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm">Creating Strong Passwords</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  A simple guide to creating and managing secure passwords
                </p>
                <Button size="sm" variant="link" className="px-0 py-1 h-auto">
                  Read Guide →
                </Button>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm">Spotting Phishing Emails</h4>
                <p className="text-xs text-muted-foreground mt-1">Learn the warning signs of phishing attempts</p>
                <Button size="sm" variant="link" className="px-0 py-1 h-auto">
                  Read Guide →
                </Button>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm">Securing Your Home Network</h4>
                <p className="text-xs text-muted-foreground mt-1">Steps to protect your home Wi-Fi network</p>
                <Button size="sm" variant="link" className="px-0 py-1 h-auto">
                  Read Guide →
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Security News</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="bg-muted rounded-md w-12 h-12 flex-shrink-0"></div>
                <div>
                  <h4 className="text-sm font-medium">Major Browser Update Fixes Critical Vulnerabilities</h4>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-muted rounded-md w-12 h-12 flex-shrink-0"></div>
                <div>
                  <h4 className="text-sm font-medium">New Phishing Campaign Targets Remote Workers</h4>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
            </div>
            <Button size="sm" variant="link" className="mt-2">
              View All News →
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Alert>
            <GraduationCap className="h-4 w-4" />
            <AlertDescription>
              Regular security training reduces the risk of successful cyber attacks by up to 90%.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  )
}
