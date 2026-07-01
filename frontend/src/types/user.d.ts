export interface UserResponsePrivate {
  username: string
  first_name: string
  last_name: string
  email: string
  date_joined: string
}

export interface UserResponseRecruiter {
  first_name: string
}

export interface UserResponseCandidate extends UserResponseRecruiter {
  last_name: string
}
