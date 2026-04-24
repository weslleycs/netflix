import axios from 'axios'

export function getStatus(error: unknown): number | undefined {
  if (axios.isAxiosError(error)) return error.response?.status
  return undefined
}
