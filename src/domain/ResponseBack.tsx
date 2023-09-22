export interface ResponseBack {
    team: string,
    uptime: string,
    versions: TagVersions[]
}
  
export interface TagVersions {
    name: string,
    tag: string,
    success: boolean
}