import { executeCraftRequest } from './craftGraphService';


export const getSingleContent = async (type: string) => {
    const single = (await executeCraftRequest('post', generateSinglesQuery(type)))[0];
    return single;
}

const generateSinglesQuery = (type: string) => {
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
}