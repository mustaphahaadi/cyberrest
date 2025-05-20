// Service to sync user preferences across devices

class UserPreferencesService {
  constructor() {
    this.storageKey = "cyberrest-preferences"
    this.syncInterval = null
  }

  // Get all user preferences
  async getPreferences() {
    // First try to get from local storage
    const localPrefs = this.getLocalPreferences()

    // If user is logged in, try to get from server and merge
    if (this.isUserLoggedIn()) {
      try {
        const serverPrefs = await this.fetchFromServer()
        return { ...localPrefs, ...serverPrefs }
      } catch (error) {
        console.error("Failed to fetch preferences from server:", error)
        return localPrefs
      }
    }

    return localPrefs
  }

  // Get preferences from local storage
  getLocalPreferences() {
    try {
      const prefsString = localStorage.getItem(this.storageKey)
      return prefsString ? JSON.parse(prefsString) : this.getDefaultPreferences()
    } catch (error) {
      console.error("Error reading preferences from local storage:", error)
      return this.getDefaultPreferences()
    }
  }

  // Save preferences
  async savePreferences(preferences) {
    // Save to local storage
    localStorage.setItem(this.storageKey, JSON.stringify(preferences))

    // If user is logged in, save to server
    if (this.isUserLoggedIn()) {
      try {
        await this.saveToServer(preferences)
      } catch (error) {
        console.error("Failed to save preferences to server:", error)
      }
    }
  }

  // Update a single preference
  async updatePreference(key, value) {
    const preferences = await this.getPreferences()
    preferences[key] = value
    await this.savePreferences(preferences)
    return preferences
  }

  // Start syncing preferences across devices
  startSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
    }

    // Sync every 5 minutes
    this.syncInterval = setInterval(
      async () => {
        if (this.isUserLoggedIn()) {
          try {
            const serverPrefs = await this.fetchFromServer()
            const localPrefs = this.getLocalPreferences()

            // Merge preferences, prioritizing the most recent ones
            const mergedPrefs = this.mergePreferences(localPrefs, serverPrefs)

            // Save merged preferences
            localStorage.setItem(this.storageKey, JSON.stringify(mergedPrefs))
            await this.saveToServer(mergedPrefs)
          } catch (error) {
            console.error("Error syncing preferences:", error)
          }
        }
      },
      5 * 60 * 1000,
    ) // 5 minutes
  }

  // Stop syncing
  stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
    }
  }

  // Check if user is logged in
  isUserLoggedIn() {
    // This would check your auth system
    const authToken = localStorage.getItem("auth-token")
    return !!authToken
  }

  // Fetch preferences from server
  async fetchFromServer() {
    // This would be an API call to your backend
    try {
      const response = await fetch("/api/user/preferences", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch preferences")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching preferences:", error)
      throw error
    }
  }

  // Save preferences to server
  async saveToServer(preferences) {
    // This would be an API call to your backend
    try {
      const response = await fetch("/api/user/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify(preferences),
      })

      if (!response.ok) {
        throw new Error("Failed to save preferences")
      }

      return await response.json()
    } catch (error) {
      console.error("Error saving preferences:", error)
      throw error
    }
  }

  // Merge preferences based on timestamps
  mergePreferences(localPrefs, serverPrefs) {
    // If either doesn't have a timestamp, use the other
    if (!localPrefs.lastUpdated) return serverPrefs
    if (!serverPrefs.lastUpdated) return localPrefs

    // Use the most recently updated preferences
    return new Date(serverPrefs.lastUpdated) > new Date(localPrefs.lastUpdated) ? serverPrefs : localPrefs
  }

  // Get default preferences
  getDefaultPreferences() {
    return {
      theme: "system",
      fontSize: "medium",
      colorAccent: "blue",
      contrastLevel: "normal",
      motionReduced: false,
      focusHighlight: true,
      lineSpacing: 1.5,
      dyslexiaFont: false,
      lastUpdated: new Date().toISOString(),
    }
  }
}

export const userPreferencesService = new UserPreferencesService()
