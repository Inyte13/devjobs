import { Modality, Seniority } from './enums'
import { LocationResponseSummary } from './location'
import { RecruiterResponsePublic, RecruiterResponseSummary } from './recruiter'
import { TechnologyResponse } from './technology'

export interface OfferResponseSummary {
  id: string
  recruiter: RecruiterResponseSummary
  title: string
  location: LocationResponseSummary
  modality: Modality
  seniority: Seniority
  technologies: TechnologResponse[]
}

export interface OfferResponseDetail {
  id: string
  recruiter: RecruiterResponsePublic
  title: string
  description: str
  location: LocationResponseSummary
  modality: Modality
  seniority: Seniority
  salary: number | None
  technologies: TechnologyResponse[]
  created: string
  modified: string
}
