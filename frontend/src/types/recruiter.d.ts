import { CompanyResponseSummary } from './company'
import { UserResponseRecruiter } from './user'

export interface RecruiterResponsePrivate {
  description: str | null
  company_id: string
}

export interface RecruiterResponseSummary {
  company: CompanyResponseSummary
}

export interface RecruiterResponseApplication extends RecruiterResponseSummary {
  user: UserResponseRecruiter
}

export interface RecruiterResponsePublic extends RecruiterResponseSummary {
  user: UserResponseRecruiter
  contact_email: string
}