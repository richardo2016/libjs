export function homeDir() {
  return process.env.HOME
}

export function applicationHomeDirectory(applicationName: string) {
  const path = require('path')
  return path.join(homeDir(), applicationName)
}
