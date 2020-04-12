const singlesEntryQuery = (slug: string) => {
    return `
    query {
      entries(type: "tutorial", slug: "${slug}") {
        title,
        id
         ... on tutorials_tutorial_Entry {
          color,
          description {
              ...on description_description_BlockType {
                firstLine,
                secondLine
              }
          },
          featuredImage {
            url
          },
          tags {
            title
          },
          tutorialContent {
            ...on tutorialContent_sectionBlock_BlockType {
              sectionTitle,
              sectionContent,
              id,
              uid,
              dateUpdated, 
              dateCreated
            },
          }
        },
      ... on tutorialSeries_tutorial_Entry {
          color,
          parent {
            typeHandle,
            id,
            title,
            children {
              id,
              title,
              lft,
              rgt,
            }
          },
          description {
              ...on description_description_BlockType {
                firstLine,
                secondLine
              }
          },
          featuredImage {
            url
          },
          tags {
            title
          },
          tutorialContent {
            ...on tutorialContent_sectionBlock_BlockType {
              sectionTitle,
              sectionContent,
              id,
              uid,
              dateUpdated, 
              dateCreated
            },
          }
        }
      }
    }
  `
};