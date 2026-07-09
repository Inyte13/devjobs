import { Modality, Seniority } from '@/types/enums'

export const BASE_URL = import.meta.env.VITE_API_URL || ''

export const LIMIT = 3

export const SENIORITY_OPTIONS = [
  { label: 'Trainee', value: Seniority.TRAINEE },
  { label: 'Junior', value: Seniority.JUNIOR },
  { label: 'Mid', value: Seniority.MID },
  { label: 'Senior', value: Seniority.SENIOR },
  { label: 'Lead', value: Seniority.LEAD },
]

export const MODALITY_OPTIONS = [
  { label: 'Remoto', value: Modality.REMOTE },
  { label: 'Presencial', value: Modality.PRESENTIAL },
  { label: 'Híbrido', value: Modality.HYBRID },
]

export const FILTER_PARAMS = ['location_id', 'technology_id'] as const
