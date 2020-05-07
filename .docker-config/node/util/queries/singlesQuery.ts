export const singlesQuery = (type: string) => {
    return (
        `
    query {
        entries(type: "${type}") {
            title,
            slug,
          ... on ${type}_${type}_Entry {
            entryContent {
              ... on entryContent_sectionBlock_BlockType {
                sectionTitle,
                sectionContent
              }
            }
          }
        }
      }
      `
    )
};