export const AllTutorialsQuery = () => {
  return `
  query {
      entries(type: "tutorial") {
      title,
      slug,
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
        }
      },
      ... on tutorialSeries_tutorial_Entry {
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
        }
      }
    }
  }
  `
};

export const EightTutorialsQuery = () => {
  return `
  query {
    entries(limit: 8, type: "tutorial") {
    title,
    slug,
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
      }
    },
    ... on tutorialSeries_tutorial_Entry {
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
      }
    }
  }
}
  `
};