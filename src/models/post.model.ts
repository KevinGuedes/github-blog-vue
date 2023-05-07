export interface Post {
  number: number
  title: string
  body: string
  comments: number
  html_url: string
  created_at: string
  user: {
    login: string
  }
}
