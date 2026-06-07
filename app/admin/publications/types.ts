export interface PublicationFormData {
  id?: string;
  publicationTitle: string;
  description: string;
  issueNumber: string;
  volume: string;
  publicationDate: string;
  managingPublisher: string;
  editorInChief: string;
  publicationFile: File | null;
  publicationCover: File | null;
}

export interface Publication extends PublicationFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
  coverImageUrl?: string;
}
