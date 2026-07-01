import { CandidateResponsePublic } from './candidate'
import { Status } from './enums'
import { OfferResponseSummary } from './offer'

export interface ApplicationResponseRecruiter {
  id: string
  candidate: CandidateResponsePublic
  status: Status
  created: string
  modified: string
}

export interface ApplicationResponseCandidate {
  id: string
  offer: OfferResponseSummary
  status: Status
  created: string
  modified: string
}
