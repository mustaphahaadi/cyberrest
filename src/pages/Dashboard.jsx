"use client"

import { useState } from "react"
import { AlertCircle, ArrowUpRight, Shield, ShieldCheck, ShieldAlert, Activity } from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Security Score</div>
            <ShieldCheck className="h-4 w-4 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">78/100</div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: "78%" }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">+5 from last week</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Threats Blocked</div>
            <ShieldAlert className="h-4 w-4 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">237</div>
            <p className="text-xs text-gray-500 mt-2">+22% from last month</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Vulnerabilities</div>
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-2">-2 from last scan</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Protected Devices</div>
            <Activity className="h-4 w-4 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500 mt-2">All devices active</p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-600 text-red-600 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <div className="font-medium">Critical Security Alert</div>
        </div>
        <div className="mt-1">
          Potential data breach detected for your email. Run a scan to check affected accounts.
        </div>
        <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm">Run Scan Now</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="bg-white rounded-lg shadow lg:col-span-4">
          <div className="p-4 border-b">
            <div className="font-medium">Security Overview</div>
            <div className="text-sm text-gray-500">Your security status across all monitored areas</div>
          </div>
          <div className="p-4">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 ${activeTab === "overview" ? "border-b-2 border-blue-600" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 ${activeTab === "threats" ? "border-b-2 border-blue-600" : ""}`}
                onClick={() => setActiveTab("threats")}
              >
                Threats
              </button>
              <button
                className={`px-4 py-2 ${activeTab === "recommendations" ? "border-b-2 border-blue-600" : ""}`}
                onClick={() => setActiveTab("recommendations")}
              >
                Recommendations
              </button>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span>Password Security</span>
                    </div>
                    <span className="text-green-500 font-medium">Strong</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-yellow-500" />
                      <span>Data Protection</span>
                    </div>
                    <span className="text-yellow-500 font-medium">Moderate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span>Network Security</span>
                    </div>
                    <span className="text-green-500 font-medium">Strong</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      <span>Two-Factor Authentication</span>
                    </div>
                    <span className="text-red-500 font-medium">Not Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span>Malware Protection</span>
                    </div>
                    <span className="text-green-500 font-medium">Active</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "threats" && (
              <div className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <span>Phishing Attempt</span>
                    </div>
                    <span className="text-gray-500 text-sm">Yesterday</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      <span>Suspicious Login</span>
                    </div>
                    <span className="text-gray-500 text-sm">3 days ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      <span>Weak Password</span>
                    </div>
                    <span className="text-gray-500 text-sm">Ongoing</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "recommendations" && (
              <div className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-5 w-5 text-blue-500" />
                      <span>Enable Two-Factor Authentication</span>
                    </div>
                    <button className="px-3 py-1 text-sm border rounded">Enable</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-5 w-5 text-blue-500" />
                      <span>Update Password for Email Account</span>
                    </div>
                    <button className="px-3 py-1 text-sm border rounded">Update</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-5 w-5 text-blue-500" />
                      <span>Run Full System Scan</span>
                    </div>
                    <button className="px-3 py-1 text-sm border rounded">Scan</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow lg:col-span-3">
          <div className="p-4 border-b">
            <div className="font-medium">Recent Activity</div>
            <div className="text-sm text-gray-500">Security events from the past 7 days</div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full p-1 bg-green-100">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Password Updated</p>
                  <p className="text-xs text-gray-500">You updated your password for account: personal@email.com</p>
                  <p className="text-xs text-gray-500">Today, 10:42 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full p-1 bg-yellow-100">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Login from New Location</p>
                  <p className="text-xs text-gray-500">New login detected from Chicago, IL</p>
                  <p className="text-xs text-gray-500">Yesterday, 8:15 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full p-1 bg-red-100">
                  <ShieldAlert className="h-4 w-4 text-red-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Malware Blocked</p>
                  <p className="text-xs text-gray-500">Malicious file blocked: download.exe</p>
                  <p className="text-xs text-gray-500">3 days ago, 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full p-1 bg-green-100">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Security Scan Completed</p>
                  <p className="text-xs text-gray-500">Full system scan completed with 0 threats found</p>
                  <p className="text-xs text-gray-500">5 days ago, 9:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
