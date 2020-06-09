export interface WriteTutorial {
    id?: number,
    title: string,
    description1: string,
    description2: string,
    sections: { title: string, content: string }[],
    tags: string[],
    color: { value: string, label: string },
    featuredImage: any,
    enabled: boolean,
}