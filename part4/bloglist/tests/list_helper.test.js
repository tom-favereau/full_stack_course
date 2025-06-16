const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const blogs = [
        {
            title: 'Blog 1',
            author: 'Author 1',
            url: 'http://example.com/1',
            likes: 3
        },
        {
            title: 'Blog 2',
            author: 'Author 2',
            url: 'http://example.com/2',
            likes: 7
        },
        {
            title: 'Blog 3',
            author: 'Author 3',
            url: 'http://example.com/3',
            likes: 2
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(12)
    })
})


describe('favorite blog', () => {
    const blogs = [
        {
            title: 'Blog A',
            author: 'Author A',
            url: 'http://a.com',
            likes: 5
        },
        {
            title: 'Blog B',
            author: 'Author B',
            url: 'http://b.com',
            likes: 12
        },
        {
            title: 'Blog C',
            author: 'Author C',
            url: 'http://c.com',
            likes: 8
        }
    ]

    test('returns the blog with the most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: 'Blog B',
            author: 'Author B',
            likes: 12
        })
    })

    test('returns null for an empty list', () => {
        expect(listHelper.favoriteBlog([])).toBe(null)
    })
})


describe('favorite blog', () => {
    const blogs = [
        {
            title: 'Blog A',
            author: 'Author A',
            url: 'http://a.com',
            likes: 5
        },
        {
            title: 'Blog B',
            author: 'Author A',
            url: 'http://b.com',
            likes: 12
        },
        {
            title: 'Blog C',
            author: 'Author C',
            url: 'http://c.com',
            likes: 8
        }
    ]

    test('returns the author with the most blogs', () => {
        expect(listHelper.mostBlogs(blogs)).toBe('Author A')
    })

    test('returns null for an empty list', () => {
        expect(listHelper.mostBlogs([])).toBe(null)
    })
})


describe('most likes', () => {
    const blogs = [
        {
            title: 'symbolic dynamics',
            author: 'tom favereau',
            likes: 10
        },
        {
            title: 'CCC',
            author: 'AK',
            likes: 7
        },
        {
            title: 'football',
            author: 'Antoine',
            likes: 3
        },
        {
            title: 'cellular automata',
            author: 'tom favereau',
            likes: 7
        }
    ]

    const oneBlog = [
        { title: 'symbolic dynamics', author: 'tom favereau', likes: 0 }
    ]

    test('returns author with most total likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: 'tom favereau',
            likes: 17
        })
    })

    test('returns null for empty list', () => {
        const result = listHelper.mostLikes([])
        expect(result).toBe(null)
    })

    test('returns the only author when list has one blog', () => {
        const result = listHelper.mostLikes(oneBlog)
        expect(result).toEqual({
            author: 'tom favereau',
            likes: 0
        })
    })
})