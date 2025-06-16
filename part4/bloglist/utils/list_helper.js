const dummy = blogs => 1


const totalLikes = blogs => blogs.reduce(
    (acc, blog) => blog.likes + acc,
    0
)

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null


    const favorite = blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = blogs => {
    const map = new Map()

    for (const elem of blogs) {
        if (map.has(elem.author)) {
            //console.log("error", map, elem.author)
            map.set(elem.author, map.get(elem.author) + 1)
        }
        else map.set(elem.author, 1)

    }
    let res = null
    let max = 0
    console.log(map)

    for (const [author, count] of map.entries()) {
        if (count >= max) {
            max = count
            res = author
        }
    }
    return res
}

const mostLikes = (blogs) => {
    const map = new Map()

    for (const blog of blogs) {
        if (map.has(blog.author)) {
            map.set(blog.author, map.get(blog.author) + blog.likes)
        } else {
            map.set(blog.author, blog.likes)
        }
    }

    let res = null
    let max = 0

    for (const [author, count] of map.entries()) {
        if (count >= max) {
            max = count
            res = { author, likes: count }
        }
    }

    return res
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

