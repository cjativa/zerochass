export interface WriteTutorial {
    id?: number,
    title: string,
    description1: string,
    description2: string,
    sections: { id?: number, title: string, content: string }[],
    tags: string[],
    color: 'pink' | 'teal' | 'black' | 'white',
    featuredImage: any,
    enabled: boolean,
}