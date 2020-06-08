export interface WriteTutorial {
    id?: string | number,
    title: string,
    description1: string,
    description2: string,
    sections: any[],
    tags: string[],
    color: { value: string, label: string },
    featuredImage: any,
    enabled: boolean
}