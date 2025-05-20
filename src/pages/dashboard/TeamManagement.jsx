"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Badge from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  UserPlus,
  Settings,
  Shield,
  Mail,
  MoreHorizontal,
  UserCog,
  UserMinus,
  Clock,
  Info,
  User,
  CheckCircle,
  XCircle,
  Eye,
  PlusCircle,
} from "lucide-react"

export default function TeamManagement() {
  const [activeTab, setActiveTab] = useState("members")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")
  const [searchQuery, setSearchQuery] = useState("")

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "user_01HGXYZ123456789",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "admin",
      status: "active",
      lastActive: "2023-06-02T14:30:00Z",
      avatar: null,
      department: "Security Operations",
      joined: "2023-01-15T10:00:00Z",
    },
    {
      id: "user_01HGXYZ987654321",
      name: "Jamie Smith",
      email: "jamie@example.com",
      role: "member",
      status: "active",
      lastActive: "2023-06-01T09:15:00Z",
      avatar: null,
      department: "IT",
      joined: "2023-02-20T11:30:00Z",
    },
    {
      id: "user_01HGXYZ456789123",
      name: "Taylor Wilson",
      email: "taylor@example.com",
      role: "member",
      status: "active",
      lastActive: "2023-05-30T16:45:00Z",
      avatar: null,
      department: "Compliance",
      joined: "2023-03-10T09:00:00Z",
    },
    {
      id: "user_01HGXYZ321654987",
      name: "Morgan Lee",
      email: "morgan@example.com",
      role: "viewer",
      status: "invited",
      lastActive: null,
      avatar: null,
      department: "Executive",
      joined: null,
    },
  ])

  const [pendingInvites, setPendingInvites] = useState([
    {
      id: "invite_01HGXYZ123456789",
      email: "morgan@example.com",
      role: "viewer",
      sentAt: "2023-06-01T10:30:00Z",
      expiresAt: "2023-06-08T10:30:00Z",
      status: "pending",
    },
    {
      id: "invite_01HGXYZ987654321",
      email: "pat@example.com",
      role: "member",
      sentAt: "2023-05-28T14:15:00Z",
      expiresAt: "2023-06-04T14:15:00Z",
      status: "pending",
    },
  ])

  const [activityLog, setActivityLog] = useState([
    {
      id: "log_01HGXYZ123456789",
      user: "Alex Johnson",
      action: "invited_user",
      target: "morgan@example.com",
      timestamp: "2023-06-01T10:30:00Z",
      metadata: { role: "viewer" },
    },
    {
      id: "log_01HGXYZ987654321",
      user: "Alex Johnson",
      action: "changed_role",
      target: "Jamie Smith",
      timestamp: "2023-05-30T11:45:00Z",
      metadata: { from: "viewer", to: "member" },
    },
    {
      id: "log_01HGXYZ456789123",
      user: "System",
      action: "user_joined",
      target: "Taylor Wilson",
      timestamp: "2023-03-10T09:00:00Z",
      metadata: { role: "member" },
    },
    {
      id: "log_01HGXYZ321654987",
      user: "Alex Johnson",
      action: "removed_user",
      target: "riley@example.com",
      timestamp: "2023-05-25T16:20:00Z",
      metadata: { role: "member" },
    },
  ])

  const [roles, setRoles] = useState([
    {
      id: "role_admin",
      name: "Admin",
      description: "Full access to all resources and settings",
      permissions: [
        { resource: "dashboard", actions: ["view", "edit"] },
        { resource: "security_tools", actions: ["view", "use", "configure"] },
        { resource: "reports", actions: ["view", "create", "export"] },
        { resource: "settings", actions: ["view", "edit"] },
        { resource: "billing", actions: ["view", "manage"] },
        { resource: "team", actions: ["view", "invite", "remove", "manage_roles"] },
      ],
      memberCount: 1,
    },
    {
      id: "role_member",
      name: "Member",
      description: "Can use security tools and view reports",
      permissions: [
        { resource: "dashboard", actions: ["view"] },
        { resource: "security_tools", actions: ["view", "use"] },
        { resource: "reports", actions: ["view", "create"] },
        { resource: "settings", actions: ["view"] },
        { resource: "billing", actions: [] },
        { resource: "team", actions: ["view"] },
      ],
      memberCount: 2,
    },
    {
      id: "role_viewer",
      name: "Viewer",
      description: "Read-only access to dashboard and reports",
      permissions: [
        { resource: "dashboard", actions: ["view"] },
        { resource: "security_tools", actions: ["view"] },
        { resource: "reports", actions: ["view"] },
        { resource: "settings", actions: [] },
        { resource: "billing", actions: [] },
        { resource: "team", actions: [] },
      ],
      memberCount: 1,
    },
  ])

  const handleInviteSubmit = () => {
    if (!inviteEmail.trim() || !inviteRole) return

    // In a real app, this would send an invitation email
    const newInvite = {
      id: `invite_${Math.random().toString(36).substring(2, 15)}`,
      email: inviteEmail,
      role: inviteRole,
      sentAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      status: "pending",
    }

    setPendingInvites([...pendingInvites, newInvite])

    // Add to team members as invited
    const newMember = {
      id: `user_${Math.random().toString(36).substring(2, 15)}`,
      name: "",
      email: inviteEmail,
      role: inviteRole,
      status: "invited",
      lastActive: null,
      avatar: null,
      department: "",
      joined: null,
    }

    setTeamMembers([...teamMembers, newMember])

    // Add to activity log
    const newActivity = {
      id: `log_${Math.random().toString(36).substring(2, 15)}`,
      user: "Current User", // In a real app, this would be the current user's name
      action: "invited_user",
      target: inviteEmail,
      timestamp: new Date().toISOString(),
      metadata: { role: inviteRole },
    }

    setActivityLog([newActivity, ...activityLog])

    // Reset form
    setInviteEmail("")
    setInviteRole("member")
    setShowInviteDialog(false)
  }

  const handleCancelInvite = (inviteId) => {
    // Remove from pending invites
    setPendingInvites(pendingInvites.filter((invite) => invite.id !== inviteId))

    // Find the invite to get the email
    const invite = pendingInvites.find((invite) => invite.id === inviteId)
    if (!invite) return

    // Remove from team members
    setTeamMembers(teamMembers.filter((member) => member.email !== invite.email || member.status !== "invited"))

    // Add to activity log
    const newActivity = {
      id: `log_${Math.random().toString(36).substring(2, 15)}`,
      user: "Current User", // In a real app, this would be the current user's name
      action: "canceled_invitation",
      target: invite.email,
      timestamp: new Date().toISOString(),
      metadata: { role: invite.role },
    }

    setActivityLog([newActivity, ...activityLog])
  }

  const handleRemoveMember = (memberId) => {
    // Find the member to get their email
    const member = teamMembers.find((m) => m.id === memberId)
    if (!member) return

    // Remove from team members
    setTeamMembers(teamMembers.filter((m) => m.id !== memberId))

    // Add to activity log
    const newActivity = {
      id: `log_${Math.random().toString(36).substring(2, 15)}`,
      user: "Current User", // In a real app, this would be the current user's name
      action: "removed_user",
      target: member.email,
      timestamp: new Date().toISOString(),
      metadata: { role: member.role },
    }

    setActivityLog([newActivity, ...activityLog])
  }

  const handleChangeRole = (memberId, newRole) => {
    // Find the member to get their current role
    const member = teamMembers.find((m) => m.id === memberId)
    if (!member) return

    // Update the member's role
    setTeamMembers(teamMembers.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)))

    // Add to activity log
    const newActivity = {
      id: `log_${Math.random().toString(36).substring(2, 15)}`,
      user: "Current User", // In a real app, this would be the current user's name
      action: "changed_role",
      target: member.name || member.email,
      timestamp: new Date().toISOString(),
      metadata: { from: member.role, to: newRole },
    }

    setActivityLog([newActivity, ...activityLog])
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const getTimeSince = (dateString) => {
    if (!dateString) return "Never"

    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)

    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) return interval + " year" + (interval === 1 ? "" : "s") + " ago"

    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) return interval + " month" + (interval === 1 ? "" : "s") + " ago"

    interval = Math.floor(seconds / 86400)
    if (interval >= 1) return interval + " day" + (interval === 1 ? "" : "s") + " ago"

    interval = Math.floor(seconds / 3600)
    if (interval >= 1) return interval + " hour" + (interval === 1 ? "" : "s") + " ago"

    interval = Math.floor(seconds / 60)
    if (interval >= 1) return interval + " minute" + (interval === 1 ? "" : "s") + " ago"

    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago"
  }

  const getInitials = (name) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "member":
        return <Badge className="bg-blue-500">Member</Badge>
      case "viewer":
        return <Badge className="bg-green-500">Viewer</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "invited":
        return (
          <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50">
            Invited
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="border-gray-200 text-gray-700 bg-gray-50">
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case "invited_user":
        return <UserPlus className="h-4 w-4 text-blue-500" />
      case "changed_role":
        return <UserCog className="h-4 w-4 text-purple-500" />
      case "user_joined":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "removed_user":
        return <UserMinus className="h-4 w-4 text-red-500" />
      case "canceled_invitation":
        return <XCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getActionDescription = (log) => {
    switch (log.action) {
      case "invited_user":
        return `invited ${log.target} as ${log.metadata.role}`
      case "changed_role":
        return `changed ${log.target}'s role from ${log.metadata.from} to ${log.metadata.to}`
      case "user_joined":
        return `${log.target} joined as ${log.metadata.role}`
      case "removed_user":
        return `removed ${log.target} (${log.metadata.role})`
      case "canceled_invitation":
        return `canceled invitation for ${log.target}`
      default:
        return log.action.replace(/_/g, " ")
    }
  }

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Team Management</h2>
        <p className="text-muted-foreground">Manage your team members, roles, and access permissions.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full md:w-64"
          />
          <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your CyberRest team. They'll receive an email with instructions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {inviteRole === "admin"
                    ? "Full access to all resources and settings"
                    : inviteRole === "member"
                      ? "Can use security tools and view reports"
                      : "Read-only access to dashboard and reports"}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteSubmit} disabled={!inviteEmail.includes("@") || !inviteRole}>
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">
            <Users className="mr-2 h-4 w-4" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Shield className="mr-2 h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Clock className="mr-2 h-4 w-4" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Team Members ({teamMembers.length})</CardTitle>
              <CardDescription>Manage your team members and their access levels.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No team members found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>{getInitials(member.name || member.email)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name || "Pending"}</div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(member.role)}</TableCell>
                        <TableCell>{member.department || "—"}</TableCell>
                        <TableCell>{getStatusBadge(member.status)}</TableCell>
                        <TableCell>{member.lastActive ? getTimeSince(member.lastActive) : "Never"}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              {member.status === "invited" ? (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      // Find the corresponding invite
                                      const invite = pendingInvites.find((inv) => inv.email === member.email)
                                      if (invite) {
                                        handleCancelInvite(invite.id)
                                      }
                                    }}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Cancel Invitation
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Resend Invitation
                                  </DropdownMenuItem>
                                </>
                              ) : (
                                <>
                                  <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleChangeRole(member.id, "admin")}
                                    disabled={member.role === "admin"}
                                  >
                                    <Shield className="mr-2 h-4 w-4" />
                                    Make Admin
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleChangeRole(member.id, "member")}
                                    disabled={member.role === "member"}
                                  >
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Make Member
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleChangeRole(member.id, "viewer")}
                                    disabled={member.role === "viewer"}
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Make Viewer
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleRemoveMember(member.id)}
                                    className="text-red-600"
                                  >
                                    <UserMinus className="mr-2 h-4 w-4" />
                                    Remove from Team
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {pendingInvites.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Invitations ({pendingInvites.length})</CardTitle>
                <CardDescription>Invitations that have been sent but not yet accepted.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingInvites.map((invite) => (
                      <TableRow key={invite.id}>
                        <TableCell>{invite.email}</TableCell>
                        <TableCell>{getRoleBadge(invite.role)}</TableCell>
                        <TableCell>{getTimeSince(invite.sentAt)}</TableCell>
                        <TableCell>{formatDate(invite.expiresAt)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleCancelInvite(invite.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="mr-2 h-4 w-4" />
                            Resend
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="roles" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Roles & Permissions</h3>
              <p className="text-sm text-muted-foreground">
                Define what team members can do within your CyberRest account.
              </p>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Custom Role
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{role.name}</CardTitle>
                    <Badge variant="outline">{role.memberCount} users</Badge>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" disabled={role.id === "role_admin"}>
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Role
                    </Button>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Custom roles are available on Business and Enterprise plans. Upgrade your plan to create custom roles with
              fine-grained permissions.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent team management activities and changes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className="rounded-full p-1 bg-muted">{getActionIcon(log.action)}</div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <p className="text-sm font-medium">
                          <span className="font-semibold">{log.user}</span> {getActionDescription(log)}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {getTimeSince(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{formatDate(log.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Audit Log
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
