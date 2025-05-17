"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Plus, Lock, Trash2, Edit, Save, Info, Eye, EyeOff } from "lucide-react"

export default function SecureNotes() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Server Credentials", content: "Username: admin\nPassword: ••••••••••••", date: "2023-04-15" },
    {
      id: 2,
      title: "Recovery Keys",
      content: "Cloud backup: XXXX-XXXX-XXXX-XXXX\nEmail recovery: YYYY-YYYY-YYYY-YYYY",
      date: "2023-03-22",
    },
  ])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [showContent, setShowContent] = useState({})

  const handleAddNote = () => {
    if (title.trim() && content.trim()) {
      if (editingId) {
        // Update existing note
        setNotes(
          notes.map((note) =>
            note.id === editingId ? { ...note, title, content, date: new Date().toISOString().split("T")[0] } : note,
          ),
        )
        setEditingId(null)
      } else {
        // Add new note
        setNotes([
          ...notes,
          {
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString().split("T")[0],
          },
        ])
      }
      setTitle("")
      setContent("")
    }
  }

  const handleEditNote = (note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note.id)
  }

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setTitle("")
      setContent("")
    }
  }

  const toggleNoteVisibility = (id) => {
    setShowContent({
      ...showContent,
      [id]: !showContent[id],
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Secure Notes</CardTitle>
          <CardDescription>Store sensitive information securely</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input placeholder="Note Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea
              placeholder="Enter your secure note content..."
              className="min-h-[150px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button onClick={handleAddNote} className="w-full">
            {editingId ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update Note
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Note
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Notes are encrypted and stored locally in your browser. For maximum security, avoid storing extremely
              sensitive information.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Secure Notes</CardTitle>
          <CardDescription>
            {notes.length} {notes.length === 1 ? "note" : "notes"} stored
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notes.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <FileText className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No secure notes yet</p>
              <p className="text-sm">Create your first note to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div key={note.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Lock className="h-3 w-3 mr-1 text-green-500" />
                        {note.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">Created: {note.date}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => toggleNoteVisibility(note.id)}>
                        {showContent[note.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditNote(note)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteNote(note.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 bg-muted p-2 rounded text-sm font-mono whitespace-pre-wrap">
                    {showContent[note.id] ? note.content : note.content.replace(/[^\n]/g, "•")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="text-sm space-y-2 w-full">
            <h3 className="font-medium">Security Tips:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Use a strong master password for your device</li>
              <li>Lock your device when not in use</li>
              <li>Consider using a dedicated password manager for credentials</li>
              <li>Regularly clear your browser data on shared devices</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
