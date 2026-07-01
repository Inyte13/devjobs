import { CompanyResponseSummary } from './company'
import { UserResponseRecruiter } from './user'

export interface RecruiterResponsePrivate {
  description: str | None
  company_id: string
}

export interface RecruiterResponseSummary {
  company: CompanyResponseSummary
}

export interface RecruiterResponsePublic extends RecruiterResponseSummary {
  user: UserResponseRecruiter
  contact_email: string
}
