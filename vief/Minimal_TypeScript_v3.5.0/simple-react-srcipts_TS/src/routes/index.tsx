/*
- Danh mục Admin:
- Api Get list danh muc admin:
- Url: /admin/categories?...
- Query: {
  type: POLICY | EVENT ...,
  filed: WOOD,
  isFeature: 1,
  name: string,
  page: 1,
  size: 10
}
- Method: Get
- Header: {
  lang: 'en' || 'vi'
}
- Res: {
  data: [
    {
      id: 1,
      type: POLICY,
      thumbnail: {
        id: 1,
        url: "http://..."
      },
      name: "xxx"
      field: WOOD,
      isFeature: -1,
    }
  ],
  total: 100
}

----------------------------------------------------------------

- Api Get detail danh muc admin:
- Url: /admin/categories/:id
- Method: Get
- Header: {
  lang: 'en' || 'vi'
}
- Res: {
      id: 1,
      type: POLICY,
      thumbnail: {
        id: 1,
        url: "http://..."
      },
      field: WOOD,
      isFeature: -1,
      translations: [
        {
          id: 1,
          lang: en,
          name: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        },
        {
          id: 2,
          lang: vi,
          name: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        }
      ]
    }
}

----------------------------------------------------------------

- Api add danh muc admin:
- Url: /admin/categories
- Method: Post
- Header: {
  lang: 'en' || 'vi'
}
- body:
    {
      type: POLICY,
      thumbnailId: 123,
      field: WOOD,
      isFeature: -1,
      translations: [
        {
          lang: en,
          name: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        },
        {
          lang: vi,
          name: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        }
      ]
    }
}

----------------------------------------------------------------

- Api update danh muc admin:
- Url: /admin/categories/:id
- Method: Patch
- Header: {
  lang: 'en' || 'vi'
}
- body:
    {
      type: POLICY,
      thumbnailId: 123,
      field: WOOD,
      isFeature: -1,
      translations: [
        {
          id: 1,
          lang: en,
          name: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        },
        {
          id: 2,
          lang: vi,
          name: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        }
      ]
    }
}

----------------------------------------------------------------

- Api delete danh muc admin:
- Url: /admin/categories
- Method: Delete
- Header: {
  lang: 'en' || 'vi'
}
- body:
    {
      id: [1,2]
    }
}

----------------------------------

- Danh mục Client:
- Api Get list danh muc client:
- Url: /client/categories?...
- Query: {
  type: POLICY | EVENT ...,
  filed: WOOD,
  isFeature: 1,
  page: 1,
  size: 10
}
- Method: Get
- Header: {
  lang: 'en' || 'vi'
}
- Res: {
  data: [
    {
      id: 1,
      type: POLICY,
      thumbnail: {
        id: 1,
        url: "http://..."
      },
      name: "xxx"
      field: WOOD,
      isFeature: -1,
    }
  ],
  total: 100
}
 */

// ################################################################
/*
- Bai viet Admin:
- Api Get list bai viet admin:
- Url: /admin/articles?...
- Query: {
  filed: WOOD,
  isFeature: 1,
  name: string,
  page: 1,
  size: 10
}
- Method: Get
- Header: {
  lang: 'en' || 'vi'
}
- Res: {
  data: [
    {
      id: 1,
      thumbnail: {
        id: 1,
        url: "http://..."
      },
      name: "xxx"
      field: WOOD,
      isFeature: -1,
    }
  ],
  total: 100
}

----------------------------------------------------------------

- Api Get detail bai viet admin:
- Url: /admin/articles/:id
- Method: Get
- Header: {
  lang: 'en' || 'vi'
}
- Res: {
      id: 1,
      thumbnail: {
        id: 1,
        url: "http://..."
      },
      images: [
        {
          id: 1,
          url: "http://..."
        }
      ],
      field: WOOD,
      isFeature: -1,
      author: "xxx",
      translations: [
        {
          id: 1,
          lang: en,
          title: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        },
        {
          id: 2,
          lang: vi,
          title: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        }
      ]
    }
}

----------------------------------------------------------------

- Api add bai viet admin:
- Url: /admin/articles
- Method: Post
- Header: {
  lang: 'en' || 'vi'
}
- body:
    {
      thumbnailId: 123,
      images: [1,3],
      field: WOOD,
      isFeature: -1,
      author: "xxx",
      translations: [
        {
          lang: en,
          title: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        },
        {
          lang: vi,
          title: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        }
      ]
    }
}

----------------------------------------------------------------

- Api update bai viet admin:
- Url: /admin/articles/:id
- Method: Patch
- Header: {
  lang: 'en' || 'vi'
}
- body:
    {
      thumbnailId: 123,
      images: [1,2],
      author: "xxx",
      field: WOOD,
      isFeature: -1,
      translations: [
        {
          id: 1,
          lang: en,
          title: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        },
        {
          id: 2,
          lang: vi,
          title: "xxx",
          slug: "xxx",
          shortDesc: "xxx",
          content: "xxx"
        }
      ]
    }
}

----------------------------------------------------------------

- Api delete bai viet admin:
- Url: /admin/articles
- Method: Delete
- Header: {
  lang: 'en' || 'vi'
}
- body:
    {
      id: [1,2]
    }
}

----------------------------------

- bai viet Client:
- Api Get list bai viet client:
- Url: /client/articles?...
- Query: {
  slugCategory: "xx",
  isFeature: 1,
  page: 1,
  size: 10
}
- Method: Get
- Header: {
  lang: 'en' || 'vi'
}
- Res: {
  category: {
    id: 1,
    slug: "xxx",
    name: "xxx",
    shortDesc: "xxx"
  },
  data: [
   {
      id: 1,
      thumbnailId: 123,
      images: [1,2],
      author: "xxx",
      field: WOOD,
      isFeature: -1,
      lang: en,
      title: "xxx",
      slug: "xxx",
      shortDesc: "xxx",
      content: "xxx"
    }
  ],
  total: 100
}

---------------------------------

- bai viet Client:
- Api Get detail bai viet client:
- Url: /client/articles/[article-slug]
- Method: Get
- Header: {
  lang: 'en' || 'vi'
}
- Res: {
  category: {
    id: 1,
    slug: "xxx",
    name: "xxx",
    shortDesc: "xxx"
  },
  article: {
      id: 1,
      thumbnailId: 123,
      images: [1,2],
      author: "xxx",
      field: WOOD,
      isFeature: -1,
      lang: en,
      title: "xxx",
      slug: "xxx",
      shortDesc: "xxx",
      content: "xxx"
  },
}
 */